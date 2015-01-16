define(['plugins/dialog', 'moment', 'knockout', 'jquery', 'kendo', 'knockout-kendo'],
    function (dialog, moment, ko, $) {

    var AddEvent = function (start) {
        var self = this,
            start = moment(start)
                    .set('second', 00)
                    .set('millisecond', 00)
        ;
        this.eventToAdd = {
            title: ko.observable('Event'),            
            color: ko.observable('#7DCDC1'),            
            startGMT: ko.observable(),
            endGMT: ko.observable()
        };
        this.eventToAdd.start = ko.computed(function () {
            return moment(start)
                .hours(moment(self.eventToAdd.startGMT()).hours())
                .minutes(moment(self.eventToAdd.startGMT()).minutes());
        });
        this.eventToAdd.end = ko.computed(function () {
            return moment(start)
                .hours(moment(self.eventToAdd.endGMT()).hours())
                .minutes(moment(self.eventToAdd.endGMT()).minutes());
        });
        this.eventToAdd.date = ko.computed(function () {
            return moment(start)
                .format('DD/MM/YYYY');
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