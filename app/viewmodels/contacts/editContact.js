define(['plugins/dialog', 'knockout'], function (dialog, ko) {

    var EditContact = function (contact) {
        var self = this;

        this.updatedContact = {
            firstName: ko.observable(contact.firstName),
            lastName: ko.observable(contact.lastName),
            phones: ko.observableArray(contact.phones),
            emails: ko.observableArray(contact.emails),
            objectId: contact.objectId
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
            self.updatedContact.phones.push({
                type: '',
                number: ''
            });
        };
        this.addEmail = function () {
            self.updatedContact.emails.push({
                type: '',
                address: ''
            });
        };
        this.removePhone = function (phone) {
            self.updatedContact.phones.remove(phone);
        };
        this.removeEmail = function (email) {
            self.updatedContact.emails.remove(email);
        };
    };

    EditContact.prototype.closeDialog = function () {
        dialog.close(this, ko.toJS(this.updatedContact));
    };

    EditContact.prototype.exitDialog = function () {
        dialog.close(this);
    };

    EditContact.show = function (contact) {
        return dialog.show(new EditContact(contact));
    };

    return EditContact;
});