import { DatePickerController } from './datepicker.modal';
import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { DateService } from '../services/datepicker.service';
var DatePickerDirective = (function () {
    function DatePickerDirective(datepickerCtrl, dateService) {
        var _this = this;
        this.datepickerCtrl = datepickerCtrl;
        this.dateService = dateService;
        this.selected = new EventEmitter();
        this.changed = new EventEmitter();
        this.canceled = new EventEmitter();
        this.value = new Date();
        this.valueChange = this.changed;
        this.disabledDates = [];
        this.markDates = [];
        this.calendar = true;
        this.changed.subscribe(function (d) {
            _this.value = d;
        });
    }
    Object.defineProperty(DatePickerDirective.prototype, "locale", {
        set: function (val) {
            if (val)
                this.dateService.locale = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerDirective.prototype, "localeStrings", {
        set: function (val) {
            if (val) {
                this.dateService.locale = 'custom';
                this.locale = 'custom';
                this.dateService.setCustomNls(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    DatePickerDirective.prototype._click = function (ev) {
        this.open();
    };
    DatePickerDirective.prototype.open = function () {
        var data = {
            min: this.min,
            max: this.max,
            bodyClasses: this.bodyClasses,
            headerClasses: this.headerClasses,
            ionChanged: this.changed,
            ionCanceled: this.canceled,
            ionSelected: this.selected,
            date: this.value,
            okText: this.okText,
            cancelText: this.cancelText,
            disabledDates: this.disabledDates,
            markDates: this.markDates,
            calendar: this.calendar,
        };
        this.modal = this.datepickerCtrl.create(data, this.modalOptions);
        this.modal.present();
    };
    return DatePickerDirective;
}());
export { DatePickerDirective };
DatePickerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ion-datepicker,[ion-datepicker]',
            },] },
];
DatePickerDirective.ctorParameters = function () { return [
    { type: DatePickerController, },
    { type: DateService, },
]; };
DatePickerDirective.propDecorators = {
    'selected': [{ type: Output, args: ['ionSelected',] },],
    'changed': [{ type: Output, args: ['ionChanged',] },],
    'canceled': [{ type: Output, args: ['ionCanceled',] },],
    'max': [{ type: Input },],
    'min': [{ type: Input },],
    'locale': [{ type: Input },],
    'localeStrings': [{ type: Input },],
    'okText': [{ type: Input },],
    'cancelText': [{ type: Input },],
    'bodyClasses': [{ type: Input },],
    'headerClasses': [{ type: Input },],
    'modalOptions': [{ type: Input },],
    'value': [{ type: Input },],
    'valueChange': [{ type: Output },],
    'disabledDates': [{ type: Input },],
    'markDates': [{ type: Input },],
    'calendar': [{ type: Input },],
    '_click': [{ type: HostListener, args: ['tap', ['$event'],] },],
};
//# sourceMappingURL=datepicker.directive.js.map