define(['plugins/dialog', 'knockout'], function (dialog, ko) {

    var EditContact = function (contact) {
        var self = this;

        this.contactToAdd = {
            firstName: ko.observable(contact.firstName),
            lastName: ko.observable(contact.lastName),
            phones: ko.observableArray(contact.phones),
            emails: ko.observableArray(contact.emails),
            imageURL: ko.observable(contact.imageUrl),
            objectId: contact.objectId
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

    EditContact.prototype.closeDialog = function () {
        dialog.close(this, ko.toJS(this.contactToAdd));
    };

    EditContact.prototype.exitDialog = function () {
        dialog.close(this);
    };

    EditContact.show = function (contact) {
        return dialog.show(new EditContact(contact));
    };

    return EditContact;

});