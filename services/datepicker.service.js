import { nls } from './nls';
import { Injectable } from "@angular/core";
var DateService = (function () {
    function DateService() {
    }
    Object.defineProperty(DateService.prototype, "locale", {
        get: function () {
            return DateService._local || 'en-UK';
        },
        set: function (val) {
            if (!nls.checkExists(val)) {
                throw 'Locale not recognized as a valid value. Only en-US/he-IL/ru-RU/pt-BR/de/fi/fr-FR/zh-CN/zh-TW/ja-JP avaliable';
            }
            DateService._local = val;
        },
        enumerable: true,
        configurable: true
    });
    DateService.prototype.setCustomNls = function (val) {
        nls._nls.custom = val;
    };
    DateService.prototype.getDaysOfWeek = function () {
        return nls.getWeekdays(this.locale);
    };
    DateService.prototype.getMonths = function () {
        return nls.getMonths(this.locale);
    };
    DateService.prototype.doesStartFromMonday = function () {
        return nls.getNls(this.locale).monday === true;
    };
    DateService.prototype.getYears = function () {
        var years = [];
        for (var i = 1900; i < 2101; i++)
            years.push(i);
        return years;
    };
    DateService.prototype.createDateList = function (currentDate) {
        var firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        if (this.doesStartFromMonday()) {
            if (firstDayOfWeek === 0)
                firstDayOfWeek = 6;
            else
                firstDayOfWeek--;
        }
        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        var dateList = [];
        for (var j = 0; j < firstDayOfWeek; j++) {
            dateList.push(undefined);
        }
        for (var i = firstDay; i <= lastDay; i++) {
            dateList.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }
        return dateList;
    };
    return DateService;
}());
export { DateService };
DateService._local = undefined;
DateService.decorators = [
    { type: Injectable },
];
DateService.ctorParameters = function () { return []; };
//# sourceMappingURL=datepicker.service.js.map