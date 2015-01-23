define(['Q', 'plugins/http'], function (Q, http) {

    var
        APPLICATION_ID = "8319tU98V9nQbqEDnwYBiAgF0Zw2xRZ2oZD0yAZD",
        REST_API_KEY = "LoTn1Z05KeVvPtaVUV53JKp5zPCLOLQDceIrUIx7",
        headers = {
            "X-Parse-Application-Id": APPLICATION_ID,
            "X-Parse-REST-API-Key": REST_API_KEY
        },  
        userContext = {
            signin: signin,
            signup: signup,
            logout: logout,

            sessionTokenKey: 'LOCALSTORAGE_SESSION_KEY',
            userIdKey: 'LOCALSTORAGE_USER_KEY',
            session: session
        }
    ;

    return userContext;

    function session() {
        return {
            sessionToken: localStorage.getItem(userContext.sessionTokenKey),
            userId: localStorage.getItem(userContext.userIdKey)
        };
    }

    function signup(username, password) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/users/';

        var user = {
            username: username,
            password: password
        };

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
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/login/';

        var user = {
            username: username,
            password: password
        };
        
        http.get(url, user, headers)
            .done(function (response) {
                if (response) {
                    localStorage.setItem(userContext.sessionTokenKey, response.sessionToken);
                    localStorage.setItem(userContext.userIdKey, response.objectId);
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
        localStorage.removeItem(userContext.sessionTokenKey);
        localStorage.removeItem(userContext.userIdKey);
    }

});