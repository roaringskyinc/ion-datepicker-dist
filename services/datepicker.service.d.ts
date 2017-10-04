import { languages } from './nls';
export declare class DateService {
    private static _local;
    locale: languages;
    setCustomNls(val: {
        weekdays: string[];
        months: string[];
    }): void;
    getDaysOfWeek(): string[];
    getMonths(): string[];
    doesStartFromMonday(): boolean;
    getYears(): number[];
    createDateList(currentDate: Date): Date[];
}
