define(['Q', 'durandal/system', 'userContext', 'plugins/http', 'knockout'], function (Q, system, userContext, http, ko) {

    var
        APPLICATION_ID = "8319tU98V9nQbqEDnwYBiAgF0Zw2xRZ2oZD0yAZD",
        REST_API_KEY = "LoTn1Z05KeVvPtaVUV53JKp5zPCLOLQDceIrUIx7",
        headers = {
            "X-Parse-Application-Id": APPLICATION_ID,
            "X-Parse-REST-API-Key": REST_API_KEY
        }
    ;

    return {
        addTask: addTask,
        removeTask: removeTask,
        getCollectionOfTasks: getCollectionOfTasks,
        updateTask: updateTask,

        addEvent: addEvent,
        getCollectionOfEvents: getCollectionOfEvents,
        updateEvent: updateEvent,
        removeEvent: removeEvent,

        addContact: addContact,
        getCollectionOfContacts: getCollectionOfContacts,
        updateContact: updateContact,
        removeContact: removeContact
    }

    function addTask(data) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/tasks/';

        if (userContext.session().userId) {
            var acl = {};
            acl[userContext.session().userId] = {
                'read': true,
                'write': true
            };
            data.ACL = acl;
        }

        http.post(url, data, headers)
            .done(function (response) {
                dfd.resolve(response.objectId);
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }
    
    function mapTasks(tasks) {
        for (var i = 0; i < tasks.length; i++) {
            tasks[i]['isStarred'] = ko.observable(tasks[i]['isStarred']);
            tasks[i]['isCompleted'] = ko.observable(tasks[i]['isCompleted']);
        }
    }

    function getCollectionOfTasks(param) {
        var dfd = Q.defer();

        var
            url = 'https://api.parse.com/1/classes/tasks/',
            query = { "where": JSON.stringify(param) } || {}
        ;

        if (userContext.session().sessionToken) {
            headers["X-Parse-Session-Token"] = userContext.session().sessionToken;
        }

        http.get(url, query, headers)
            .done(function (response) {
                if (response) {
                    mapTasks(response.results);
                    dfd.resolve(response.results || []);
                } else {
                    dfd.reject();
                }
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function updateTask(task) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/tasks/' + task.objectId;

        http.put(url, task, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function removeTask(task) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/tasks/' + task.objectId;

        http.remove(url, { "objectId": task.objectId }, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    ///////// Events ////////////
    function addEvent(data) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/events/';

        if (userContext.session) {
            var acl = {};
            acl[userContext.session.objectId] = {
                'read': true,
                'write': true
            };
            data.ACL = acl;
        }

        http.post(url, data, headers)
            .done(function (response) {
                dfd.resolve(response.objectId);
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function getCollectionOfEvents(param) {
        var dfd = Q.defer();

        var
            url = 'https://api.parse.com/1/classes/events/'
            query = { "where": JSON.stringify(param) } || {}
        ;

        if (userContext.session) {
            headers["X-Parse-Session-Token"] = userContext.session.sessionToken;
        }

        http.get(url, query, headers)
            .done(function (response) {
                if (response) {
                    dfd.resolve(response.results || []);
                } else {
                    dfd.reject();
                }
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function updateEvent(event) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/events/' + event.objectId;

        http.put(url, event, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function removeEvent(event) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/events/' + event.objectId;

        http.remove(url, { "objectId": event.objectId }, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    ///////// Contacts ////////////
    function addContact(data) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/contacts/';

        if (userContext.session) {
            var acl = {};
            acl[userContext.session.objectId] = {
                'read': true,
                'write': true
            };
            data.ACL = acl;
        }

        http.post(url, data, headers)
            .done(function (response) {
                dfd.resolve(response.objectId);
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function getCollectionOfContacts(param) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/contacts/',
            query = { "where": JSON.stringify(param) } || {};

        if (userContext.session) {
            headers["X-Parse-Session-Token"] = userContext.session.sessionToken;
        }

        http.get(url, query, headers)
            .done(function (response) {
                if (response) {                    
                    dfd.resolve(response.results || []);
                } else {
                    dfd.reject();
                }
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function updateContact(contact) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/contacts/' + contact.objectId;

        http.put(url, contact, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function removeContact(contact) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/contacts/' + contact.objectId;

        http.remove(url, { "objectId": contact.objectId }, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }
});