define(['knockout', 'dataContext', 'userContext', './addContact', './editContact'], function (ko, dataContext, userContext, AddContact, EditContact) {

    var
        contactsCollection = ko.observableArray(),
        nameFilter = ko.observable(''),

        contacts = ko.computed(function () {
            var filter = nameFilter().toLowerCase();
            if (filter) {
                return ko.utils.arrayFilter(contactsCollection(), function (contact) {
                    return contact.firstName.toLowerCase().indexOf(filter) != -1 || contact.lastName.toLowerCase().indexOf(filter) != -1;
                });
            }
            return contactsCollection();
        }),

        isBeingEdited = ko.observable(),
        currentContactDetails = ko.observable()
    ;

    return {
        contacts: contacts,
        nameFilter: nameFilter,

        addContact: addContact,
        updateContact: updateContact,
        removeContact: removeContact,

        isBeingEdited: isBeingEdited,
        makeContactEditable: makeContactEditable,
        showContactDetails: showContactDetails,
        currentContactDetails: currentContactDetails,

        activate: activate,
        canActivate: canActivate
    }
    
    function addContact() {
        AddContact.show().then(function (response) {
            if (response) {
                var newContact = response;
                dataContext.addContact(newContact)
                   .then(function (id) {
                       newContact.objectId = id;
                       dataContext.getCollectionOfContacts().then(function (result) {
                           contactsCollection(result);
                       });
                   });
            } else {
                return;
            }
        });
    }

    function updateContact(contact) {
        EditContact.show(contact).then(function (response) {
            if (response) {
                dataContext.updateContact(response)
                   .then(function (id) {
                       dataContext.getCollectionOfContacts().then(function (result) {
                           contactsCollection(result);
                           showContactDetails(response);
                       });
                   });
            } else {
                return;
            }
        });        
    }

    function removeContact(contact) {
        dataContext.removeContact(contact);
    }

    function makeContactEditable(contact) {
        isBeingEdited(contact);
    }

    function showContactDetails(contact) {
        currentContactDetails(contact);
    }

    function activate() {
        return dataContext.getCollectionOfContacts().then(function (result) {
            contactsCollection(result);
        });
    }

    function canActivate() {
        return (userContext.checkIfSessionIsActive()) ? true : { redirect: 'signin' };
    }
});