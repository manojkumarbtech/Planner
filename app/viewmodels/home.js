define(['plugins/router', 'knockout', 'viewmodels/sidebar', 'userContext', 'dataContext', 'moment'],
    function (router, ko, sidebarViewModel, userContext, dataContext, moment) {

        var
            currentDate = sidebarViewModel.currentDateUnformatted,
            currentDateFormatted = ko.observable(moment(currentDate()).format('DD/MM/YYYY')),
            tasksForToday = ko.observableArray(),
            eventsForToday = ko.observableArray()
        ;
        currentDate.subscribe(function (date) {            
            dataContext.getCollectionOfTasks({ dueDate: moment(date).format('DD/MM/YYYY') })
                .then(function (data) {
                    tasksForToday(data);
                });
            dataContext.getCollectionOfEvents({ date: moment(date).format('DD/MM/YYYY') })
                .then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].startHour = moment(data[i].start).format('HH:mm');
                        data[i].endHour = moment(data[i].end).format('HH:mm');
                    }
                   eventsForToday(data);
               });
        });

        return {
            currentDate: currentDate,
            currentDateFormatted: currentDateFormatted,
            tasksForToday: tasksForToday,
            eventsForToday: eventsForToday,

            navigateToTasks: navigateToTasks,
            navigateToEvents: navigateToEvents,

            canActivate: canActivate,
            activate: activate
        }

        function navigateToTasks() {
            router.navigate('tasks');
        }

        function navigateToEvents() {
            router.navigate('calendar');
        }

        function activate() {            
            dataContext.getCollectionOfTasks({ dueDate: moment().format('DD/MM/YYYY') })
            .then(function (data) {
                tasksForToday(data);
            });

            dataContext.getCollectionOfEvents({ date: moment().format('DD/MM/YYYY') })
            .then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].startHour = moment(data[i].start).format('HH:mm');
                    data[i].endHour = moment(data[i].end).format('HH:mm');
                }
                eventsForToday(data);              
           });
        }
        
        function canActivate() {            
            return (userContext.session().sessionToken && userContext.session().userId) ? true : { redirect: 'signin' };
        }
});


