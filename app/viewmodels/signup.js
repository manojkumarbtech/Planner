define(['plugins/router', 'knockout', 'userContext'], function (router, ko, userContext) {

    var viewModel = {
        username: ko.observable(),
        password: ko.observable(),

        submit: submit,
        signinRedirect: signinRedirect,  
        canActivate: canActivate
    }

    return viewModel;

    function canActivate() {
        return (userContext.session().sessionToken && userContext.session().userId) ? { redirect: '' } : true;
    }

    function submit() {
        userContext.signup(viewModel.username(), viewModel.password())
            .then(function () {
                userContext.signin(viewModel.username(), viewModel.password())
                    .then(function () {
                        router.navigate('');
                });
            });
    }

    function signinRedirect() {
        return router.navigate('signin');
    }
})
