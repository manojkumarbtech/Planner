define(['plugins/dialog', 'knockout', 'moment', 'jquery', 'kendo', 'knockout-kendo'],
    function (dialog, ko, moment, $) {

    var AddTask = function () {        
        var self = this;
        
        this.taskToAdd = {
            title: ko.observable('Task'),
            dueDateUnformatted: ko.observable(new Date),
            description: ko.observable('Description'),
            category: ko.observable(''),
            isStarred: false,
            isCompleted: false
        };
        this.taskToAdd.dueDate = ko.computed(function () {
            return moment(self.taskToAdd.dueDateUnformatted()).format('DD/MM/YYYY');
        });
        this.availableCategories = ['Work', 'Home', 'Personal', 'Shopping', 'Travel', 'Health'];
    };

    AddTask.prototype.closeDialog = function () {
        dialog.close(this, ko.toJS(this.taskToAdd));
    };

    AddTask.prototype.exitDialog = function () {
        dialog.close(this);
    };

    AddTask.show = function () {
        return dialog.show(new AddTask());
    };

    return AddTask;
});