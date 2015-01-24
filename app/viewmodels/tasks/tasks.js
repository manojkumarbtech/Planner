define(['durandal/system', 'durandal/app', 'knockout', 'bootstrap', 'moment', 'dataContext', 'userContext', './modals/addTask', './modals/editTask'],
    function (system, app, ko, bootstrap, moment, dataContext, userContext, AddTask, EditTask) {

        var
            tasksFilter = ko.observableArray(),
            title = ko.observableArray(),
            tasksCollection = ko.observableArray(),
            titleFilter = ko.observable(''),            

            tasks = ko.computed(function () {
                var filter = titleFilter().toLowerCase();
                if (filter) {
                    return ko.utils.arrayFilter(tasksCollection(), function (task) {
                        return task.title.toLowerCase().indexOf(filter) != -1;
                    });
                }
                return tasksCollection();
            }),
            todayTasks = ko.computed(function () {
                return ko.utils.arrayFilter(tasks(), function (task) {
                    return task.dueDate == moment().format('DD/MM/YYYY');
                });
            }),
            tomorrowTasks = ko.computed(function () {
                return ko.utils.arrayFilter(tasks(), function (task) {
                    return task.dueDate == moment().add(1, 'days').format('DD/MM/YYYY');
                });
            }),
            otherTasks = ko.computed(function () {
                return ko.utils.arrayFilter(tasks(), function (task) {                    
                    return moment(task.dueDate, 'DD/MM/YYYY') > moment({ h: 0, m: 0, s: 0, ms: 0 }).add(1, 'days');
                });
            }),
            expiredTasks = ko.computed(function () {
                return ko.utils.arrayFilter(tasks(), function (task) {
                    return moment(task.dueDate, 'DD/MM/YYYY') < moment({ h: 0, m: 0, s: 0, ms: 0 }).subtract(0, 'days');
                });
        })
        ;

        return {
            tasks: tasks,
            titleFilter: titleFilter,
            title: title,

            todayTasks: todayTasks,
            tomorrowTasks: tomorrowTasks,
            otherTasks: otherTasks,
            expiredTasks: expiredTasks,

            addTask: addTask,
            removeTask: removeTask,
            editTask: editTask,

            markAsCompleted: markAsCompleted,
            markAsStarred: markAsStarred,

            activate: activate
        };

        function addTask() {
            AddTask.show().then(function (response) {
                if (response) {
                    var newTask = response;
                    dataContext.addTask(newTask)
                       .then(function (id) {
                           newTask.objectId = id;
                           dataContext.getCollectionOfTasks(tasksFilter()).then(function (result) {
                               tasksCollection(result);
                           });
                       });
                } else {
                    return;
                }
            });
        }

        function editTask(task) {
            EditTask.show(task).then(function (response) {
                if (response) {
                    dataContext.updateTask(response)
                        .then(function () {
                            dataContext.getCollectionOfTasks(tasksFilter()).then(function (result) {
                                tasksCollection(result);
                            });
                        });
                } else {
                    return;
                }
            });
        }

        function removeTask(task) {
            app.showMessage('Are you sure you want to remove this task?', task.title + ' - ' + task.dueDateFormatted, ['No', 'Yes'], true)
                .then(function (dialogResult) {
                    if (dialogResult == 'Yes') {
                        dataContext.removeTask(task).then(function () {
                            isLoading(true);
                            tasksCollection.remove(task);
                        });
                    } else {
                        return;
                    }
                });
        }

        function markAsCompleted(task) {
            task.isCompleted(!task.isCompleted());
            tasksCollection.remove(task);
            dataContext.updateTask(task);
        }

        function markAsStarred(task) {
            task.isStarred(!task.isStarred());
            dataContext.updateTask(task).then(function () {
                dataContext.getCollectionOfTasks(tasksFilter()).then(function (result) {
                    tasksCollection(result);
                });
            });
        }

        function activate(activationData) {
            tasksFilter(activationData.filter);
            title(activationData.title);
            return dataContext.getCollectionOfTasks(activationData.filter).then(function (result) {
                tasksCollection(result);
            });
        }
    });