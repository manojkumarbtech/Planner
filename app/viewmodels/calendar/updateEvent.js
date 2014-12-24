define(['plugins/dialog', 'moment', 'knockout', 'jquery', 'kendo', 'knockout-kendo'],
    function (dialog, moment, ko, $) {

    var UpdateEvent = function (event) {
        var self = this;

        this.eventToUpdate = {
            title: ko.observable(event.title),
            startTimeUnformatted: ko.observable(new Date(event.startTimeUnformatted)),
            endTimeUnformatted: ko.observable(new Date(event.endTimeUnformatted)),
            color: ko.observable(event.color),

            objectId: event.objectId // from Parse.com
        };
        this.eventToUpdate.start = ko.computed(function () {
            return moment(event.start)
                .hours(moment(self.eventToUpdate.startTimeUnformatted()).hours())
                .minutes(moment(self.eventToUpdate.startTimeUnformatted()).minutes())
                .format();
        });
        this.eventToUpdate.end = ko.computed(function () {
            return moment(event.start)
                .hours(moment(self.eventToUpdate.endTimeUnformatted()).hours())
                .minutes(moment(self.eventToUpdate.endTimeUnformatted()).minutes())
                .format();
        });
    };

    UpdateEvent.prototype.closeDialog = function () {
        dialog.close(this, ko.toJS(this.eventToUpdate)); 
    };

    UpdateEvent.prototype.exitDialog = function () {
        dialog.close(this);
    };

    UpdateEvent.show = function (event) {
        return dialog.show(new UpdateEvent(event));
    };

    return UpdateEvent;
});