import { EventEmitter } from "@angular/core";
import { languages } from '../services/nls';
export interface DatePickerData {
    color?: string;
    okText?: string;
    cancelText?: string;
    min?: Date;
    max?: Date;
    ionChanged: EventEmitter<Date>;
    ionSelected: EventEmitter<Date>;
    ionCanceled: EventEmitter<void>;
    headerClasses?: string[];
    bodyClasses?: string[];
    date?: Date;
    locale?: languages;
    disabledDates: Date[];
    calendar: boolean;
    markDates: Date[];
}
export declare enum DatePickerView {
    Calendar = 0,
    Year = 1,
    Month = 2,
    Day = 3,
}
