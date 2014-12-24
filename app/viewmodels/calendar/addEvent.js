define(['plugins/dialog', 'moment', 'knockout', 'jquery', 'kendo', 'knockout-kendo'],
    function (dialog, moment, ko, $) {

    var AddEvent = function (start) {
        var self = this;

        this.eventToAdd = {
            title: ko.observable('Event'),
            startTimeUnformatted: ko.observable(),
            endTimeUnformatted: ko.observable(),
            color: ko.observable('#7DCDC1')
        };
        this.eventToAdd.start = ko.computed(function () {
            return moment(start)
                .hours(moment(self.eventToAdd.startTimeUnformatted()).hours())
                .minutes(moment(self.eventToAdd.startTimeUnformatted()).minutes())
                .format();
        });
        this.eventToAdd.end = ko.computed(function () {
            return moment(start)
                .hours(moment(self.eventToAdd.endTimeUnformatted()).hours())
                .minutes(moment(self.eventToAdd.endTimeUnformatted()).minutes())
                .format();
        });
        this.eventToAdd.date = ko.computed(function () {
            return moment(start).format('DD/MM/YYYY');
        });
        this.eventToAdd.startTime = ko.computed(function () {
            return moment(self.eventToAdd.startTimeUnformatted()).format('HH:mm');
        });
        this.eventToAdd.endTime = ko.computed(function () {
            return moment(self.eventToAdd.endTimeUnformatted()).format('HH:mm');
        });
    };
   
    AddEvent.prototype.closeDialog = function () {
        dialog.close(this, ko.toJS(this.eventToAdd)); 
    };

    AddEvent.prototype.exitDialog = function () {
        dialog.close(this);
    };

    AddEvent.show = function (start) {
        return dialog.show(new AddEvent(start));
    };

    return AddEvent;
});