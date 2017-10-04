import { Component, ViewEncapsulation } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';
import { DatePickerView } from './datepicker.interface';
import { DateService } from '../services/datepicker.service';
var DatePickerComponent = (function () {
    function DatePickerComponent(viewCtrl, navParams, DatepickerService) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.DatepickerService = DatepickerService;
        this.selectedDate = new Date();
        this.view = DatePickerView.Calendar;
        this.views = DatePickerView;
        this.today = new Date();
        this.config = this.navParams.data;
        if (!this.config.calendar)
            this.view = this.views.Day;
        this.selectedDate = this.navParams.data.date;
        this.initialize();
    }
    DatePickerComponent.prototype.initialize = function () {
        if (this.config.min)
            this.config.min.setHours(0, 0, 0, 0);
        if (this.config.max)
            this.config.max.setHours(0, 0, 0, 0);
        this.tempDate = this.selectedDate;
        this.createDateList(this.selectedDate);
        this.weekdays = this.DatepickerService.getDaysOfWeek();
        this.months = this.DatepickerService.getMonths();
        this.years = this.DatepickerService.getYears();
    };
    DatePickerComponent.prototype.createDateList = function (selectedDate) {
        this.dateList = this.DatepickerService.createDateList(selectedDate);
        this.cols = new Array(7);
        this.rows = new Array(Math.ceil(this.dateList.length / this.cols.length));
    };
    DatePickerComponent.prototype.getDate = function (row, col) {
        return this.dateList[(row * 7 + col)];
    };
    DatePickerComponent.prototype.getDateAsDay = function (row, col) {
        var date = this.getDate(row, col);
        if (date)
            return date.getDate();
    };
    DatePickerComponent.prototype.isDisabled = function (date) {
        var _this = this;
        if (!date)
            return true;
        if (this.config.min) {
            this.config.min.setHours(0, 0, 0, 0);
            if (date < this.config.min)
                return true;
        }
        if (this.config.max) {
            this.config.max.setHours(0, 0, 0, 0);
            if (date > this.config.max)
                return true;
        }
        if (this.config.disabledDates) {
            return this.config.disabledDates.some(function (disabledDate) {
                return _this.areEqualDates(new Date(disabledDate), date);
            });
        }
        return false;
    };
    DatePickerComponent.prototype.testYear = function (year) {
        if (year === undefined)
            return false;
        var testDate = new Date(year, this.tempDate.getMonth(), this.tempDate.getDate());
        return !this.isDisabled(testDate);
    };
    DatePickerComponent.prototype.testMonth = function (month) {
        if (month === undefined)
            return false;
        var testDate = new Date(this.tempDate.getFullYear(), month, this.tempDate.getDate());
        return !this.isDisabled(testDate);
    };
    DatePickerComponent.prototype.testDay = function (day) {
        if (day === undefined)
            return false;
        var testDate = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), day);
        return !this.isDisabled(testDate);
    };
    DatePickerComponent.prototype.isMark = function (date) {
        var _this = this;
        if (!date)
            return false;
        if (this.config.markDates) {
            return this.config.markDates.some(function (markDate) {
                return _this.areEqualDates(new Date(markDate), date);
            });
        }
        return false;
    };
    DatePickerComponent.prototype.isActualDate = function (date) {
        if (!date)
            return false;
        return this.areEqualDates(date, this.today);
    };
    DatePickerComponent.prototype.isSelectedDate = function (date) {
        if (!date)
            return false;
        return this.areEqualDates(date, this.selectedDate);
    };
    DatePickerComponent.prototype.isTempDate = function (date) {
        if (!date)
            return false;
        return this.areEqualDates(date, this.tempDate);
    };
    DatePickerComponent.prototype.selectDate = function (date) {
        if (this.isDisabled(date))
            return;
        this.tempDate = date;
        this.tempDate.setHours(0, 0, 0, 0);
        this.config.ionSelected.emit(this.tempDate);
    };
    DatePickerComponent.prototype.getSelectedWeekday = function () {
        return this.weekdays[this.tempDate.getDay() + (this.DatepickerService.doesStartFromMonday() ? -1 : 0)];
    };
    DatePickerComponent.prototype.getSelectedMonth = function () {
        return this.months[this.tempDate.getMonth()];
    };
    DatePickerComponent.prototype.getDayList = function () {
        var date = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), 1);
        var days = [];
        while (date.getMonth() === this.tempDate.getMonth()) {
            days.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }
        return days;
    };
    DatePickerComponent.prototype.getTempMonth = function () {
        return this.months[this.tempDate.getMonth()];
    };
    DatePickerComponent.prototype.getTempYear = function () {
        return (this.tempDate || this.selectedDate).getFullYear();
    };
    DatePickerComponent.prototype.getTempDate = function () {
        return (this.tempDate || this.selectedDate).getDate();
    };
    DatePickerComponent.prototype.getSelectedDate = function () {
        return (this.selectedDate || new Date()).getDate();
    };
    DatePickerComponent.prototype.getSelectedYear = function () {
        return (this.selectedDate || new Date()).getFullYear();
    };
    DatePickerComponent.prototype.setSelectedMonth = function (month) {
        this.tempDate = new Date(this.tempDate.getFullYear(), month, this.tempDate.getDate());
        this.createDateList(this.tempDate);
        if (this.config.calendar)
            this.view = this.views.Calendar;
    };
    DatePickerComponent.prototype.setSelectedDay = function (day) {
        this.tempDate = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), day);
        if (this.config.calendar)
            this.view = this.views.Calendar;
    };
    DatePickerComponent.prototype.setSelectedYear = function (year) {
        this.tempDate = new Date(year, this.tempDate.getMonth(), this.tempDate.getDate());
        this.createDateList(this.tempDate);
        if (this.config.calendar)
            this.view = this.views.Calendar;
    };
    DatePickerComponent.prototype.setView = function (view, index, total, scrolledElement) {
        this.view = view;
        setTimeout(function () {
            scrolledElement.scrollTop = (scrolledElement.scrollHeight / total) * (index - 1);
        }, 10);
    };
    DatePickerComponent.prototype.onCancel = function () {
        if (this.config.date)
            this.selectedDate = this.config.date || new Date();
        this.config.ionCanceled.emit();
        this.viewCtrl.dismiss();
    };
    ;
    DatePickerComponent.prototype.onDone = function () {
        this.config.date = this.tempDate;
        this.config.ionChanged.emit(this.config.date);
        this.viewCtrl.dismiss();
    };
    ;
    DatePickerComponent.prototype.limitTo = function (arr, limit) {
        if (this.DatepickerService.locale === 'custom')
            return arr;
        if (this.DatepickerService.locale === 'de')
            limit = 2;
        if (Array.isArray(arr))
            return arr.splice(0, limit);
        if (this.DatepickerService.locale === 'zh-CN' || this.DatepickerService.locale === 'zh-TW')
            arr = arr.replace("星期", "");
        return arr.slice(0, limit);
    };
    DatePickerComponent.prototype.nextMonth = function () {
        var testDate = new Date(this.tempDate.getTime());
        testDate.setDate(1);
        if (testDate.getMonth() === 11) {
            testDate.setFullYear(testDate.getFullYear() + 1);
            testDate.setMonth(0);
        }
        else {
            testDate.setMonth(testDate.getMonth() + 1);
        }
        if (!this.config.max || this.config.max >= testDate) {
            this.tempDate = testDate;
            this.createDateList(this.tempDate);
        }
    };
    DatePickerComponent.prototype.prevMonth = function () {
        var testDate = new Date(this.tempDate.getTime());
        testDate.setDate(0);
        if (!this.config.min ||
            (this.config.min <= testDate)) {
            this.tempDate = testDate;
            this.createDateList(this.tempDate);
        }
    };
    DatePickerComponent.prototype.areEqualDates = function (dateA, dateB) {
        return dateA.getDate() === dateB.getDate() &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getFullYear() === dateB.getFullYear();
    };
    return DatePickerComponent;
}());
export { DatePickerComponent };
DatePickerComponent.decorators = [
    { type: Component, args: [{
                template: "\n    <div class=\"datepicker-wrapper\">\n    <div class=\"datepicker-header\"\n        [ngClass]=\"config.headerClasses\">\n        <div class=\"weekday-header\">\n            <div class=\"weekday-title\">{{getSelectedWeekday()}}</div>\n        </div>\n        <div class=\"date-header\">\n            <div class=\"row\">\n                <div (tap)=\"setView(views.Month, getTempMonth(), months.length, yearScroll)\" class=\"col datepicker-month\">\n                    {{limitTo(getTempMonth(),3)}}\n                </div>\n            </div>\n            <div class=\"row\">\n                <div (tap)=\"setView(views.Day, getTempDate(),getDayList().length, dayScroll)\" class=\"col datepicker-day-of-month \">\n                    {{getTempDate()}}\n                </div>\n            </div>\n            <div class=\"row\">\n                <div  (tap)=\"setView(views.Year, getTempYear() - 1901, years.length, yearScroll)\" class=\"col datepicker-year \">\n                    {{ getTempYear()}}\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"datepicker-calendar\" \n    *ngIf=\"view === views.Calendar\"\n        [ngClass]=\"config.bodyClasses\">\n        <div class=\"row col datepicker-controls\">\n            <button (tap)=\"prevMonth()\"\n                ion-button=\"\"\n                [style.background-color]=\"config.color\"\n                class=\"disable-hover button button-ios button-default button-default-ios\">\n                <span class=\"button-inner\">\n                    <ion-icon name=\"arrow-back\" role=\"img\" class=\"icon icon-ios ion-ios-arrow-back\" aria-label=\"arrow-back\" ng-reflect-name=\"arrow-back\"></ion-icon></span><div class=\"button-effect\"></div></button>            {{getTempMonth()}} {{getTempYear()}}\n            <button (tap)=\"nextMonth()\"\n                ion-button=\"\"\n                [style.background-color]=\"config.color\"\n                class=\"disable-hover button button-ios button-default button-default-ios\">\n                <span class=\"button-inner\">\n                    <ion-icon name=\"arrow-forward\" role=\"img\" class=\"icon icon-ios ion-ios-arrow-forward\" aria-label=\"arrow-forward\" ng-reflect-name=\"arrow-forward\"></ion-icon></span><div class=\"button-effect\"></div></button>\n        </div>\n        <div class=\"weekdays-row row\">\n            <span class=\"col calendar-cell\"\n                *ngFor=\"let dayOfWeek of weekdays\">\n                    {{limitTo(dayOfWeek,3)}}\n                </span>\n        </div>\n        <div class=\"calendar-wrapper\">\n            <div class=\"row calendar-row\" *ngFor=\"let week of rows;let i = index;\">\n                <span class=\"col calendar-cell\"\n                    *ngFor=\"let day of cols;let j=index;\"\n                    [ngClass]=\"{\n                  'datepicker-date-col': getDate(i, j) !== undefined,\n                  'datepicker-selected': isSelectedDate(getDate(i, j)),\n                  'datepicker-current' : isActualDate(getDate(i, j)),\n                  'datepicker-disabled': isDisabled(getDate(i, j)),\n                  'datepicker-temp': isTempDate(getDate(i, j)),\n                  'datepicker-mark' : isMark(getDate(i, j))\n                  }\"\n                    (tap)=\"selectDate(getDate(i, j))\">\n\t\t\t\t\t{{getDateAsDay(i, j)}}\n\t\t\t\t</span>\n            </div>\n        </div>\n    </div>\n    <div [hidden]=\"view !== views.Year\" #yearScroll class=\"datepicker-rows\">\n        <ng-container  *ngFor=\"let year of years\">    \n            <div  *ngIf=\"testYear(year) && view === views.Year\" (tap)=\"setSelectedYear(year)\" [class.active]=\"getTempYear() === year\" [class.selected]=\"getSelectedYear() === year\" class=\"row\">\n                {{year}}\n            </div>\n        </ng-container>\n    </div>\n        <div [hidden]=\"view !== views.Month\" #monthScroll class=\"datepicker-rows\">\n        <ng-container *ngFor=\"let month of months;let i = index\">\n            <div  *ngIf=\"testMonth(i)  && view === views.Month\" (tap)=\"setSelectedMonth(i)\" [class.active]=\"getTempMonth() === month\" [class.selected]=\"getSelectedMonth() === month\"   class=\"row\">\n                {{month}}\n            </div>\n        </ng-container>\n    </div>\n    <div [hidden]=\"view !== views.Day\" #dayScroll class=\"datepicker-rows\">\n       <ng-container *ngFor=\"let day of getDayList()\">\n            <div class=\"row\" *ngIf=\"testDay(day)  && view === views.Day\" [class.active]=\"getTempDate() === day\" [class.selected]=\"getSelectedDate() === day\" (tap)=\"setSelectedDay(day)\" >\n                {{day}}\n            </div>\n        </ng-container>\n    </div>\n    <div class=\"datepicker-footer\">\n        <button (tap)=\"onCancel($event)\"\n            ion-button=\"\"\n            class=\"button button-clear button-small col-offset-33 disable-hover button button-ios button-default button-default-ios\">\n            <span class=\"button-inner\">{{config.cancelText || 'Cancel'}}</span><div class=\"button-effect\"></div></button>\n        <button (tap)=\"onDone($event)\"\n            ion-button=\"\"\n            class=\"button button-clear button-small disable-hover button button-ios button-default button-default-ios\">\n            <span class=\"button-inner\">{{config.okText || 'OK'}}</span><div class=\"button-effect\"></div></button>\n    </div>\n</div>\n    ",
                styles: ["\n    ionic2-datepicker .col {\n        padding: 5px;\n        position: relative;\n        width: 100%;\n        margin: 0;\n        min-height: 1px;\n        -webkit-flex-basis: 0;\n        -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n        -webkit-box-flex: 1;\n        -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n        flex-grow: 1;\n        max-width: 100%;\n    }\n    ionic2-datepicker .row {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n      }\nionic2-datepicker .datepicker-wrapper {\n  height: 100%;\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\nionic2-datepicker .datepicker-wrapper .datepicker-header {\n  color: white;\n  background-color: #009688;\n  display: flex;\n  flex-flow: column;\n  height: 35%;\n}\nionic2-datepicker .datepicker-wrapper .datepicker-header .date-header {\n  display: flex;\n  flex-flow: column;\n  text-align: center;\n}\nionic2-datepicker .datepicker-wrapper .datepicker-header .date-header .datepicker-day-of-month {\n  font-size: 60px;\n  font-weight: 700;\n}\nionic2-datepicker .datepicker-wrapper .datepicker-header .date-header .datepicker-year, ionic2-datepicker .datepicker-wrapper .datepicker-header .date-header .datepicker-month {\n  font-size: 14px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nionic2-datepicker .datepicker-wrapper .datepicker-header .weekday-header {\n  padding: 8px 10px;\n  background-color: #008d7f;\n}\nionic2-datepicker .datepicker-wrapper .datepicker-header .weekday-header .weekday-title {\n  font-weight: bold;\n  text-align: center;\n}\nionic2-datepicker .weekdays-row {\n  text-align: center;\n}\nionic2-datepicker .datepicker-calendar {\n  height: calc(100% - (35% + 60px));\n}\n\nionic2-datepicker .datepicker-rows {\n    height: calc(100% - (35% + 60px));\n    overflow-y:scroll;\n    display:flex;\n   flex-direction:column;\n    align-items:center;\n}\nionic2-datepicker .datepicker-rows .row {\n    min-height: 30px;\n    display: flex;\n    align-items: center;\n    align-content: center;\n    flex-direction: column;\n    justify-content: center;\n    width: 100%;\n}\n\nionic2-datepicker .datepicker-rows .row.selected {\n    background-color: #b6d9d6;\n    border-radius: 20px;\n}\n\nionic2-datepicker .datepicker-rows .row.active {\n    background-color: #b6c2d9;\n    border-radius: 20px;\n}\n\nionic2-datepicker .datepicker-calendar .datepicker-controls {\n  align-items: center;\n  justify-content: space-between;\n}\nionic2-datepicker .datepicker-calendar .calendar-wrapper {\n  height: calc(100% - 60px - 40px);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n}\n\nionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-mark {\n  background-color:#5b6c6b;\n  border-radius: 20px;\n}\nionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-selected {\n  background-color: #d3d3d3;\n  border-radius: 20px;\n}\n\nionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-temp {\n    border-radius: 20px;\n}\n\nionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-current {\n  color: #387ef5;\n  border-radius: 20px;\n}\nionic2-datepicker .datepicker-calendar .calendar-wrapper .datepicker-disabled {\n  color: #aaaaaa;\n}\n\nionic2-datepicker .datepicker-calendar .calendar-wrapper .calendar-cell {\n  flex-flow: row wrap;\n  text-align: center;\n}\nionic2-datepicker .datepicker-footer {\n  display: flex;\n  justify-content: space-between;\n  height: 60px;\n}\nionic2-datepicker .datepicker-footer button {\n  width: 100%;\n}\n\n    "],
                selector: 'ionic2-datepicker',
                encapsulation: ViewEncapsulation.None,
            },] },
];
DatePickerComponent.ctorParameters = function () { return [
    { type: ViewController, },
    { type: NavParams, },
    { type: DateService, },
]; };
//# sourceMappingURL=datepicker.component.js.map