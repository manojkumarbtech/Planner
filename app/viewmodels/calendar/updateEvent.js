define(['plugins/dialog', 'moment', 'knockout', 'jquery', 'kendo', 'knockout-kendo'],
    function (dialog, moment, ko, $) {

    var UpdateEvent = function (event) {
        var self = this;
        
        this.eventToUpdate = {
            title: ko.observable(event.title),            
            color: ko.observable(event.color),
            startGMT: ko.observable(new Date(event.startGMT)),
            endGMT: ko.observable(new Date(event.endGMT)),
            // Retrieved from Parse
            objectId: event.objectId 
        };
        this.eventToUpdate.start = ko.computed(function () {
            return moment(event.start)
                .hours(moment(self.eventToUpdate.startGMT()).hours())
                .minutes(moment(self.eventToUpdate.startGMT()).minutes());
        });
        this.eventToUpdate.end = ko.computed(function () {
            return moment(event.end)
                .hours(moment(self.eventToUpdate.endGMT()).hours())
                .minutes(moment(self.eventToUpdate.endGMT()).minutes());
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