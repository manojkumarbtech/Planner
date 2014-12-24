define(['plugins/dialog', 'knockout'], function (dialog, ko) {

    var EditTask = function (task) {
        var self = this;

        this.editedTask = {
            title: ko.observable(task.title),
            description: ko.observable(task.description),
            dueDateUnformatted: ko.observable(new Date(task.dueDateUnformatted)),
            category: ko.observable(task.category),
            objectId: task.objectId
        };
        this.editedTask.dueDate = ko.computed(function () {
            return moment(self.editedTask.dueDateUnformatted()).format('DD/MM/YYYY');
        });
        this.availableCategories = ['Work', 'Home', 'Personal', 'Shopping', 'Travel', 'Health'];
    };

    EditTask.prototype.closeDialog = function () {
        dialog.close(this, this.editedTask);
    };

    EditTask.prototype.exitDialog = function () {
        dialog.close(this);
    };

    EditTask.show = function (task) {
        return dialog.show(new EditTask(task));
    };
    
    return EditTask;
});