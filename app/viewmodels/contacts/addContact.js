define(['plugins/dialog', 'knockout'], function (dialog, ko) {

    var AddContact = function () {
        var self = this;

        this.newContact = {
            firstName: ko.observable(''),
            lastName: ko.observable(''),
            phones: ko.observableArray([{ type: '', number: '' }]),
            emails: ko.observableArray([{ type: '', address: '' }])
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
            self.newContact.phones.push({
                type: '',
                number: ''
            });
        };
        this.addEmail = function () {
            self.newContact.emails.push({
                type: '',
                address: ''
            });
        };
        this.removePhone = function (phone) {
            self.newContact.phones.remove(phone);
        };
        this.removeEmail = function (email) {
            self.newContact.emails.remove(email);
        };
    };

    AddContact.prototype.closeDialog = function () {
        dialog.close(this, ko.toJS(this.newContact));
    };

    AddContact.prototype.exitDialog = function () {
        dialog.close(this);
    };

    AddContact.show = function () {
        return dialog.show(new AddContact());
    };

    return AddContact;
});
