define(['Q', 'plugins/http', 'knockout'], function (Q, http, ko) {

    var
        APPLICATION_ID = "8319tU98V9nQbqEDnwYBiAgF0Zw2xRZ2oZD0yAZD",
        REST_API_KEY = "LoTn1Z05KeVvPtaVUV53JKp5zPCLOLQDceIrUIx7",
        headers = {
            "X-Parse-Application-Id": APPLICATION_ID,
            "X-Parse-REST-API-Key": REST_API_KEY
        },  
        userContext = {
            sessionToken: function () {
                return localStorage.getItem('LOCALSTORAGE_SESSION_TOKEN');
            },
            userId: function () {
                return localStorage.getItem('LOCALSTORAGE_USER_ID');
            },
            isUserLoggedIn: ko.observable(false),
            checkIfSessionIsActive: checkIfSessionIsActive,

            signin: signin,
            signup: signup,
            logout: logout            
        }       
    ;

    return userContext;

    function checkIfSessionIsActive() {
        if (localStorage.getItem('LOCALSTORAGE_SESSION_TOKEN') && localStorage.getItem('LOCALSTORAGE_USER_ID')) {
            userContext.isUserLoggedIn(true);
        }
        return localStorage.getItem('LOCALSTORAGE_SESSION_TOKEN') && localStorage.getItem('LOCALSTORAGE_USER_ID');
    }   

    function signup(username, password) {
        var
            dfd = Q.defer(),
            url = 'https://api.parse.com/1/users/',
            user = {
                username: username,
                password: password
            }
        ;

        http.post(url, user, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function signin(username, password) {
        var
            dfd = Q.defer(),
            url = 'https://api.parse.com/1/login/',
            user = {
                username: username,
                password: password
            }
        ;
        
        http.get(url, user, headers)
            .done(function (response) {
                if (response) {
                    localStorage.setItem('LOCALSTORAGE_SESSION_TOKEN', response.sessionToken);
                    localStorage.setItem('LOCALSTORAGE_USER_ID', response.objectId);
                    userContext.isUserLoggedIn(true);
                    dfd.resolve();
                } else {
                    dfd.reject();
                }
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function logout() {
        localStorage.removeItem('LOCALSTORAGE_SESSION_TOKEN');
        localStorage.removeItem('LOCALSTORAGE_USER_ID');
        userContext.isUserLoggedIn(false);
    }
});