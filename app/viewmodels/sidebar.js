define(['jquery', 'knockout', 'moment', 'bootstrap', 'kendo', 'knockout-kendo'], function ($, ko, moment) {

    var currentDateUnformatted = ko.observable(new Date),
        currentDate = ko.computed(function () {
            return moment(currentDateUnformatted()).format('DD MMMM, YYYY');
        })
    ;

    return {
        currentDateUnformatted: currentDateUnformatted,
        currentDate: currentDate
    }
});