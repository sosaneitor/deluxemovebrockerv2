// Make → models map for the quote form. Trimmed to popular U.S.-market makes;
// easy to extend. Years are generated at runtime (current year down to 1970).

export const VEHICLE_MAKES: Record<string, string[]> = {
  Acura: ['ILX', 'MDX', 'RDX', 'TLX', 'Integra'],
  'Alfa Romeo': ['Giulia', 'Stelvio', '4C'],
  'Aston Martin': ['DB11', 'DBS', 'Vantage', 'DBX'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'e-tron', 'R8', 'RS7'],
  Bentley: ['Continental GT', 'Bentayga', 'Flying Spur'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', 'M3', 'M4', 'i4'],
  Buick: ['Enclave', 'Encore', 'Envision'],
  Cadillac: ['CT4', 'CT5', 'Escalade', 'XT5', 'Lyriq'],
  Chevrolet: ['Camaro', 'Corvette', 'Silverado', 'Tahoe', 'Suburban', 'Malibu', 'Equinox'],
  Chrysler: ['300', 'Pacifica'],
  Dodge: ['Challenger', 'Charger', 'Durango'],
  Ferrari: ['488', 'F8', 'Roma', 'SF90', '812'],
  Ford: ['Mustang', 'F-150', 'Explorer', 'Bronco', 'Escape', 'GT'],
  Genesis: ['G70', 'G80', 'GV70', 'GV80'],
  GMC: ['Sierra', 'Yukon', 'Acadia'],
  Honda: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Ioniq 5'],
  Jaguar: ['F-PACE', 'F-TYPE', 'XF'],
  Jeep: ['Wrangler', 'Grand Cherokee', 'Gladiator', 'Cherokee'],
  Kia: ['Forte', 'K5', 'Sportage', 'Telluride', 'EV6'],
  Lamborghini: ['Huracán', 'Aventador', 'Urus'],
  'Land Rover': ['Range Rover', 'Defender', 'Discovery'],
  Lexus: ['ES', 'IS', 'RX', 'GX', 'LC'],
  Lincoln: ['Aviator', 'Corsair', 'Navigator'],
  Maserati: ['Ghibli', 'Levante', 'MC20'],
  Mazda: ['Mazda3', 'CX-5', 'CX-9', 'MX-5 Miata'],
  McLaren: ['720S', 'Artura', 'GT'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC', 'AMG GT'],
  Nissan: ['Altima', 'Sentra', 'Rogue', 'GT-R', 'Z'],
  Porsche: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', '718 Cayman'],
  'Rolls-Royce': ['Ghost', 'Phantom', 'Cullinan'],
  Subaru: ['Impreza', 'Outback', 'Forester', 'WRX'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Tacoma', 'Tundra', '4Runner', 'Supra'],
  Volkswagen: ['Jetta', 'Golf', 'Tiguan', 'Atlas', 'ID.4'],
  Volvo: ['S60', 'XC40', 'XC60', 'XC90'],
  Other: ['Other / Not listed'],
};

export const VEHICLE_MAKE_NAMES = Object.keys(VEHICLE_MAKES);

// Current year is stamped by the page (Astro build) to avoid Date in shared code.
export function buildYears(currentYear: number): string[] {
  const years: string[] = [];
  for (let y = currentYear + 1; y >= 1970; y--) years.push(String(y));
  return years;
}
