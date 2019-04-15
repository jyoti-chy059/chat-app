import { Currency } from './currency';

export interface Country {
    name:         string;
    alpha2Code:   string;
    callingCodes: string[];
    timezones:    string[];
    currencies:   Currency[];
    flag:         string;
}