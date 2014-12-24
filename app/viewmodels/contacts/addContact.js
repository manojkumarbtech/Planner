define(['plugins/dialog', 'knockout'], function (dialog, ko) {

    var AddContact = function () {
        var self = this;

        this.contactToAdd = {
            firstName: ko.observable('Name'),
            lastName: ko.observable('Surname'),
            phones: ko.observableArray([{ type: 'Personal', number: '123-456-789' }]),
            emails: ko.observableArray([{ type: 'Work', address: 'email@email.com' }]),
            imageURL: ko.observable()
        };

        this.file = ko.observable();
        this.loadContactImage = function () {
            var parseFile = new Parse.File("contactImage.jpg", self.file());
            parseFile.save().then(function (response) {
                self.contactToAdd.imageURL(response.url().toString());
            });  
        };        
        this.phone = {
            type: ko.observable(),
            number: ko.observable()
        };
        this.email = {
            type: ko.observable(),
            address: ko.observable()
        };
        this.addPhone = function () {
            self.contactToAdd.phones.push({
                type: '',
                number: ''
            });
        };
        this.addEmail = function () {
            self.contactToAdd.emails.push({
                type: '',
                address: ''
            });
        };
        this.removePhone = function (phone) {
            self.contactToAdd.phones.remove(phone);
        };
        this.removeEmail = function (email) {
            self.contactToAdd.emails.remove(email);
        };
    };

    AddContact.prototype.closeDialog = function () {
        dialog.close(this, ko.toJS(this.contactToAdd)); 
    };

    AddContact.prototype.exitDialog = function () {
        dialog.close(this);
    };

    AddContact.show = function () {
        return dialog.show(new AddContact());
    };

    return AddContact;

});
