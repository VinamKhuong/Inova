import { Currency } from "./Currency";
import { Language } from "./Language";

export class Country {
  name: string;
  alpha3Code: string;
  capital: string;
  nativeName: string;
  population: number;
  timezones: string[];
  languages: Language[];
  currencies: Currency[];
}
