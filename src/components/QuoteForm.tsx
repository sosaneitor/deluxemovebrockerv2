import { useEffect, useMemo, useRef, useState } from 'react';
import { CONTACT, CONTENT, whatsappHref, type Lang } from '../i18n/content';
import { VEHICLE_MAKES, VEHICLE_MAKE_NAMES, buildYears } from '../data/vehicles';
import { US_LOCATIONS } from '../data/locations';

interface Props {
  lang: Lang;
  currentYear: number;
  privacyHref: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormState {
  from: string;
  to: string;
  year: string;
  make: string;
  model: string; // free text "make and model" when make is "Other"
  enclosed: 'yes' | 'no' | '';
  runs: 'yes' | 'no' | '';
  date: string;
  name: string;
  email: string;
  phone: string;
  prefer: 'whatsapp' | 'phone' | 'email' | '';
}

const EMPTY: FormState = {
  from: '', to: '', year: '', make: '', model: '', enclosed: '', runs: '',
  date: '', name: '', email: '', phone: '', prefer: '',
};

const OTHER_MAKE = 'Other';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// At least 10 digits (U.S. number), allowing +, spaces, dashes and parentheses.
const isPhone = (v: string) => /^[\d\s()+.-]+$/.test(v) && v.replace(/\D/g, '').length >= 10;

// Local YYYY-MM-DD, so the pickup date can't be in the past.
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function QuoteForm({ lang, currentYear, privacyHref }: Props) {
  const t = CONTENT[lang].form;
  const years = useMemo(() => buildYears(currentYear), [currentYear]);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [focused, setFocused] = useState<'from' | 'to' | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  const isOther = form.make === OTHER_MAKE;
  const models = form.make && !isOther ? VEHICLE_MAKES[form.make] ?? [] : [];
  const vehicle = isOther ? `${form.year} ${form.model}` : `${form.year} ${form.make} ${form.model}`;

  // On step change: announce it to screen readers and bring the top of the form back into
  // view (on phones the "Next" button sits far below where the next step starts).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (liveRef.current) liveRef.current.textContent = `${step + 1}/3 · ${t.steps[step]}`;
    const top = formRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      // Reset model when make changes.
      if (key === 'make') next.model = '';
      return next;
    });
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const suggest = (query: string) =>
    query.trim().length < 1
      ? []
      : US_LOCATIONS.filter((l) => l.toLowerCase().includes(query.toLowerCase())).slice(0, 6);

  function validateStep(s: number): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!form.from.trim()) e.from = t.required;
      if (!form.to.trim()) e.to = t.required;
    }
    if (s === 1) {
      if (!form.year) e.year = t.required;
      if (!form.make) e.make = t.required;
      if (!form.model.trim()) e.model = t.required;
      if (!form.enclosed) e.enclosed = t.required;
      if (!form.runs) e.runs = t.required;
    }
    if (s === 2) {
      if (!form.date) e.date = t.required;
      if (!form.name.trim()) e.name = t.required;
      if (!form.email.trim()) e.email = t.required;
      else if (!EMAIL_RE.test(form.email.trim())) e.email = t.invalidEmail;
      if (!form.phone.trim()) e.phone = t.required;
      else if (!isPhone(form.phone.trim())) e.phone = t.invalidPhone;
      if (!form.prefer) e.prefer = t.required;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function succeed() {
    setStatus('success');
    setForm(EMPTY);
    setStep(0);
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validateStep(2)) return;
    // Bots fill the hidden field; pretend success so they get no signal to retry.
    if (honeypotRef.current?.value) {
      succeed();
      return;
    }
    setStatus('sending');
    try {
      // Web3Forms: the access key routes the email to the inbox it was created for;
      // `email` becomes the reply-to, so the owner can answer the customer directly.
      const payload = {
        access_key: CONTACT.web3formsKey,
        subject: `New quote request — ${form.from} → ${form.to} · ${vehicle}`,
        from_name: 'Deluxe Move Broker website',
        Route: `${form.from} → ${form.to}`,
        Vehicle: vehicle,
        Enclosed: form.enclosed === 'yes' ? 'Yes' : 'No',
        Runs: form.runs === 'yes' ? 'Yes' : 'No',
        'Pickup date': form.date,
        Name: form.name.trim(),
        email: form.email.trim(),
        Phone: form.phone.trim(),
        'Preferred contact': form.prefer,
        Language: lang,
        Page: window.location.href,
      };
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || result.success !== true) throw new Error(`Form endpoint responded ${res.status}`);
      succeed();
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) gtag('event', 'generate_lead', { page_language: lang });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="qf-panel qf-result" role="status" aria-live="polite">
        <div className="qf-check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </div>
        <p>{t.success}</p>
        <div className="qf-result-actions">
          <a href={whatsappHref(lang)} target="_blank" rel="noopener" className="btn btn-amber">{t.successCta}</a>
          <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
            {t.again}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="qf-panel" onSubmit={submit} noValidate>
      <div className="qf-hp" aria-hidden="true">
        <label>
          Leave this field empty
          <input ref={honeypotRef} type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <header className="qf-head">
        <h3>{t.heading}</h3>
        <p>{t.sub}</p>
        <ol className="qf-steps">
          {t.steps.map((label, i) => (
            <li
              key={label}
              className={i === step ? 'is-active' : i < step ? 'is-done' : ''}
              aria-current={i === step ? 'step' : undefined}
            >
              <span className="qf-dot" aria-hidden="true">{i < step ? '✓' : i + 1}</span>
              <span className="qf-step-label">{label}</span>
            </li>
          ))}
        </ol>
      </header>

      {/* STEP 1 — Route */}
      {step === 0 && (
        <div className="qf-body">
          {(['from', 'to'] as const).map((key) => (
            <Field key={key} label={key === 'from' ? t.routeFrom : t.routeTo} error={errors[key]} htmlFor={`qf-${key}`}>
              <input
                id={`qf-${key}`} className="qf-input" autoComplete="off" value={form[key]}
                placeholder={t.routePlaceholder}
                aria-invalid={errors[key] ? true : undefined}
                onChange={(e) => set(key, e.target.value)}
                onFocus={() => setFocused(key)}
                onBlur={() => setTimeout(() => setFocused(null), 120)}
                onKeyDown={(e) => e.key === 'Escape' && setFocused(null)}
              />
              <Suggestions items={suggest(form[key])} show={focused === key} onPick={(v) => { set(key, v); setFocused(null); }} />
            </Field>
          ))}
        </div>
      )}

      {/* STEP 2 — Vehicle */}
      {step === 1 && (
        <div className="qf-body">
          <div className="qf-grid-3">
            <Field label={t.year} error={errors.year} htmlFor="qf-year">
              <select id="qf-year" className="qf-input" value={form.year} onChange={(e) => set('year', e.target.value)}>
                <option value="">{t.selectYear}</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </Field>
            <Field label={t.make} error={errors.make} htmlFor="qf-make">
              <select id="qf-make" className="qf-input" value={form.make} onChange={(e) => set('make', e.target.value)}>
                <option value="">{t.selectMake}</option>
                {VEHICLE_MAKE_NAMES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
            {isOther ? (
              <Field label={t.otherVehicle} error={errors.model} htmlFor="qf-model">
                <input id="qf-model" className="qf-input" value={form.model} placeholder={t.otherVehiclePlaceholder}
                  maxLength={80} onChange={(e) => set('model', e.target.value)} />
              </Field>
            ) : (
              <Field label={t.model} error={errors.model} htmlFor="qf-model">
                <select id="qf-model" className="qf-input" value={form.model} disabled={!form.make} onChange={(e) => set('model', e.target.value)}>
                  <option value="">{t.selectModel}</option>
                  {models.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
            )}
          </div>
          <Toggle label={t.enclosed} hint={t.enclosedHint} error={errors.enclosed} value={form.enclosed}
            yes={t.yes} no={t.no} onChange={(v) => set('enclosed', v)} name="enclosed" />
          <Toggle label={t.runs} hint={t.runsHint} error={errors.runs} value={form.runs}
            yes={t.yes} no={t.no} onChange={(v) => set('runs', v)} name="runs" />
        </div>
      )}

      {/* STEP 3 — Contact */}
      {step === 2 && (
        <div className="qf-body">
          <Field label={t.date} error={errors.date} htmlFor="qf-date">
            <input id="qf-date" className="qf-input" type="date" min={today()} value={form.date} onChange={(e) => set('date', e.target.value)} />
          </Field>
          <div className="qf-grid-2">
            <Field label={t.name} error={errors.name} htmlFor="qf-name">
              <input id="qf-name" className="qf-input" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} />
            </Field>
            <Field label={t.phone} error={errors.phone} htmlFor="qf-phone">
              <input id="qf-phone" className="qf-input" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </Field>
          </div>
          <Field label={t.email} error={errors.email} htmlFor="qf-email">
            <input id="qf-email" className="qf-input" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </Field>
          <fieldset className="qf-fieldset">
            <legend>{t.prefer}</legend>
            <div className="qf-choices">
              {([['whatsapp', t.preferWhatsapp], ['phone', t.preferPhone], ['email', t.preferEmail]] as const).map(([val, label]) => (
                <label key={val} className={`qf-choice ${form.prefer === val ? 'is-on' : ''}`}>
                  <input type="radio" name="prefer" value={val} checked={form.prefer === val} onChange={() => set('prefer', val)} />
                  {label}
                </label>
              ))}
            </div>
            {errors.prefer && <span className="qf-err">{errors.prefer}</span>}
          </fieldset>
          <p className="qf-consent">
            {t.consent} <a href={privacyHref}>{CONTENT[lang].footer.privacy}</a>.
          </p>
        </div>
      )}

      {status === 'error' && <p className="qf-alert" role="alert">{t.error}</p>}

      <footer className="qf-foot">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={back}>{t.back}</button>
        ) : <span />}
        {step < 2 ? (
          // Distinct keys: if React reused this node, the click on "Next" would land
          // on a type="submit" button and submit (and validate) step 3 immediately.
          <button key="next" type="button" className="btn btn-amber" onClick={next}>{t.next}</button>
        ) : (
          <button key="submit" type="submit" className="btn btn-amber" disabled={status === 'sending'}>
            {status === 'sending' ? t.sending : t.submit}
          </button>
        )}
      </footer>
      <p ref={liveRef} className="sr-only" aria-live="polite" />
    </form>
  );
}

function Field({ label, error, htmlFor, children }: { label: string; error?: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="qf-field">
      <label className="qf-label" htmlFor={htmlFor}>{label}</label>
      <div className="qf-control">{children}</div>
      {error && <span className="qf-err" role="alert">{error}</span>}
    </div>
  );
}

function Suggestions({ items, show, onPick }: { items: string[]; show: boolean; onPick: (v: string) => void }) {
  if (!show || items.length === 0) return null;
  return (
    <ul className="qf-suggest">
      {items.map((it) => (
        <li key={it}>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); onPick(it); }}>{it}</button>
        </li>
      ))}
    </ul>
  );
}

function Toggle({ label, hint, error, value, yes, no, onChange, name }: {
  label: string; hint: string; error?: string; value: string; yes: string; no: string;
  onChange: (v: 'yes' | 'no') => void; name: string;
}) {
  return (
    <fieldset className="qf-fieldset">
      <legend>{label}</legend>
      <span className="qf-hint">{hint}</span>
      <div className="qf-choices">
        {([['yes', yes], ['no', no]] as const).map(([val, txt]) => (
          <label key={val} className={`qf-choice ${value === val ? 'is-on' : ''}`}>
            <input type="radio" name={name} value={val} checked={value === val} onChange={() => onChange(val)} />
            {txt}
          </label>
        ))}
      </div>
      {error && <span className="qf-err">{error}</span>}
    </fieldset>
  );
}
