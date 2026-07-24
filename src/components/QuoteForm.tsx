import { useMemo, useRef, useState } from 'react';
import { CONTACT, CONTENT, type Lang } from '../i18n/content';
import { VEHICLE_MAKES, VEHICLE_MAKE_NAMES, buildYears } from '../data/vehicles';
import { US_LOCATIONS } from '../data/locations';

interface Props {
  lang: Lang;
  currentYear: number;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormState {
  from: string;
  to: string;
  year: string;
  make: string;
  model: string;
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function QuoteForm({ lang, currentYear }: Props) {
  const t = CONTENT[lang].form;
  const years = useMemo(() => buildYears(currentYear), [currentYear]);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [focused, setFocused] = useState<'from' | 'to' | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const models = form.make ? VEHICLE_MAKES[form.make] ?? [] : [];

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
      if (!form.model) e.model = t.required;
      if (!form.enclosed) e.enclosed = t.required;
      if (!form.runs) e.runs = t.required;
    }
    if (s === 2) {
      if (!form.date) e.date = t.required;
      if (!form.name.trim()) e.name = t.required;
      if (!form.email.trim()) e.email = t.required;
      else if (!EMAIL_RE.test(form.email)) e.email = t.invalidEmail;
      if (!form.phone.trim()) e.phone = t.required;
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

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validateStep(2)) return;
    setStatus('sending');
    try {
      const payload = {
        _subject: `New quote request — ${form.year} ${form.make} ${form.model}`,
        Route: `${form.from} → ${form.to}`,
        Vehicle: `${form.year} ${form.make} ${form.model}`,
        Enclosed: form.enclosed === 'yes' ? 'Yes' : 'No',
        Runs: form.runs === 'yes' ? 'Yes' : 'No',
        'Pickup date': form.date,
        Name: form.name,
        email: form.email,
        Phone: form.phone,
        'Preferred contact': form.prefer,
        Language: lang,
      };
      const res = await fetch(CONTACT.formspree, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('success');
      setForm(EMPTY);
      setStep(0);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="qf-panel qf-result" role="status" aria-live="polite">
        <div className="qf-check" aria-hidden="true">✓</div>
        <p>{t.success}</p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
          {t.heading}
        </button>
      </div>
    );
  }

  return (
    <form className="qf-panel" onSubmit={submit} noValidate>
      <header className="qf-head">
        <h3>{t.heading}</h3>
        <p>{t.sub}</p>
        <ol className="qf-steps" aria-label={t.steps.join(', ')}>
          {t.steps.map((label, i) => (
            <li key={label} className={i === step ? 'is-active' : i < step ? 'is-done' : ''}>
              <span className="qf-dot">{i < step ? '✓' : i + 1}</span>
              <span className="qf-step-label">{label}</span>
            </li>
          ))}
        </ol>
      </header>

      {/* STEP 1 — Route */}
      {step === 0 && (
        <div className="qf-body">
          <Field label={t.routeFrom} error={errors.from} htmlFor="qf-from">
            <input
              id="qf-from" className="qf-input" autoComplete="off" value={form.from}
              placeholder={t.routePlaceholder}
              onChange={(e) => set('from', e.target.value)}
              onFocus={() => setFocused('from')}
              onBlur={() => setTimeout(() => setFocused(null), 120)}
            />
            <Suggestions items={suggest(form.from)} show={focused === 'from'} onPick={(v) => set('from', v)} />
          </Field>
          <Field label={t.routeTo} error={errors.to} htmlFor="qf-to">
            <input
              id="qf-to" className="qf-input" autoComplete="off" value={form.to}
              placeholder={t.routePlaceholder}
              onChange={(e) => set('to', e.target.value)}
              onFocus={() => setFocused('to')}
              onBlur={() => setTimeout(() => setFocused(null), 120)}
            />
            <Suggestions items={suggest(form.to)} show={focused === 'to'} onPick={(v) => set('to', v)} />
          </Field>
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
            <Field label={t.model} error={errors.model} htmlFor="qf-model">
              <select id="qf-model" className="qf-input" value={form.model} disabled={!form.make} onChange={(e) => set('model', e.target.value)}>
                <option value="">{t.selectModel}</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
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
            <input id="qf-date" className="qf-input" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
          </Field>
          <div className="qf-grid-2">
            <Field label={t.name} error={errors.name} htmlFor="qf-name">
              <input id="qf-name" className="qf-input" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} />
            </Field>
            <Field label={t.phone} error={errors.phone} htmlFor="qf-phone">
              <input id="qf-phone" className="qf-input" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </Field>
          </div>
          <Field label={t.email} error={errors.email} htmlFor="qf-email">
            <input id="qf-email" className="qf-input" type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
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
        </div>
      )}

      {status === 'error' && <p className="qf-alert" role="alert">{t.error}</p>}

      <footer className="qf-foot">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={back}>{t.back}</button>
        ) : <span />}
        {step < 2 ? (
          <button type="button" className="btn btn-amber" onClick={next}>{t.next}</button>
        ) : (
          <button type="submit" className="btn btn-amber" disabled={status === 'sending'}>
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
    <label className="qf-field" htmlFor={htmlFor}>
      <span className="qf-label">{label}</span>
      <span className="qf-control">{children}</span>
      {error && <span className="qf-err">{error}</span>}
    </label>
  );
}

function Suggestions({ items, show, onPick }: { items: string[]; show: boolean; onPick: (v: string) => void }) {
  if (!show || items.length === 0) return null;
  return (
    <ul className="qf-suggest" role="listbox">
      {items.map((it) => (
        <li key={it}>
          <button type="button" onMouseDown={() => onPick(it)}>{it}</button>
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
