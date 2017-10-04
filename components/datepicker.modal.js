import { App } from 'ionic-angular';
import { DatePickerDisplayer } from './datepicker.displayer';
import { Config } from 'ionic-angular/config/config';
import { DatePickerComponent } from './datepicker.component';
import { Injectable } from '@angular/core';
var DatePickerController = (function () {
    function DatePickerController(_app, config) {
        this._app = _app;
        this.config = config;
    }
    DatePickerController.prototype.create = function (data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        data.component = DatePickerComponent;
        opts.showBackdrop = opts.showBackdrop !== undefined ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = opts.enableBackdropDismiss !== undefined ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;
        return new DatePickerDisplayer(this._app, data.component, data, opts, this.config);
    };
    return DatePickerController;
}());
export { DatePickerController };
DatePickerController.decorators = [
    { type: Injectable },
];
DatePickerController.ctorParameters = function () { return [
    { type: App, },
    { type: Config, },
]; };
//# sourceMappingURL=datepicker.modal.js.map