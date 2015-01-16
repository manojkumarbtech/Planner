define(['durandal/app', 'jquery', 'fullcalendar', 'moment', 'knockout', 'dataContext', 'userContext', './addEvent', './updateEvent'],
    function (app, $, fullcalendar, moment, ko, dataContext, userContext, AddEvent, UpdateEvent) {

        return {
            canActivate: function() {
                return (userContext.session().sessionToken && userContext.session().userId) ? true : { redirect: 'signin' };
            },

            attached: function () {
                $('#calendar').fullCalendar({
                    header: {
                        left: 'today',
                        center: 'prev title next',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    buttonText: {
                        today: 'Today',
                        month: 'Month',
                        week: 'Week',
                        day: 'Day'
                    },
                    dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    height: 'auto',
                    
                    selectable: true,
                    selectHelper: true,
                    editable: true,
                    firstDay: 1,
                    
                    allDayDefault: false,
                    displayEventEnd: {
                        month: true,
                        basicWeek: true
                    },
                    allDaySlot: false,
                    timeFormat: 'H:mm',
                    axisFormat: 'H:mm',
                    firstHour: 6,
                    eventLimit: 4,

                    select: function (start) {
                        AddEvent.show(start).then(function (eventData) {
                            if (eventData) {
                                $('#calendar').fullCalendar('unselect');

                                dataContext.addEvent(eventData)
                                    .then(function (id) {
                                        eventData.objectId = id;
                                        $('#calendar').fullCalendar('renderEvent', eventData);                                        
                                    });
                            } else {
                                return;
                            }
                        });
                    },

                    eventClick: function (event) {
                        app.showMessage(moment(event.start).format('DD/MM/YYYY'), event.title, ['Delete', 'Edit'], true)
                            .then(function (dialogResult) {

                                if (dialogResult == 'Delete') {
                                    $('#calendar').fullCalendar('removeEvents', event._id);
                                    dataContext.removeEvent(event);

                                } else if (dialogResult == 'Edit') {
                                    UpdateEvent.show(event).then(function (eventData) {
                                        if (eventData) {
                                            for (var key in eventData) {
                                                event[key] = eventData[key];
                                            }
                                            $('#calendar').fullCalendar('updateEvent', event);
                                            dataContext.updateEvent(eventData);
                                        } else {
                                            return;
                                        }
                                    });
                                }
                            });
                    },

                    eventDrop: function (event) {
                        var eventData = {};
                        eventData.start = event.start.format();
                        eventData.end = event.end.format();
                        eventData.date = moment(event.start).format('DD/MM/YYYY');

                        eventData.objectId = event.objectId;

                        dataContext.updateEvent(eventData);
                    },

                    eventResize: function (event) {
                        var eventData = {};
                        eventData.start = event.start.format();
                        eventData.end = event.end.format();
                        eventData.objectId = event.objectId;

                        dataContext.updateEvent(eventData);
                    },

                    events: function (start, end, timezone, callback) {
                        dataContext.getCollectionOfEvents()
                            .then(function (results) {
                                callback(results);
                            });
                    }
                });
            }
        }
    });