define(['plugins/router', 'knockout', 'userContext'], function (router, ko, userContext) {

    var viewModel = {
        email: ko.observable(),
        password: ko.observable(),
        submit: submit,
        signinRedirect: signinRedirect,
        signupRedirect: signupRedirect,

        canActivate: canActivate
    };

    return viewModel;

    function canActivate() {
        return (userContext.session().sessionToken && userContext.session().userId) ? { redirect: '' } : true;
    }

    function submit() {
        userContext.signin(viewModel.email(), viewModel.password())
            .then(function () {
                router.navigate('');
            });
    }

    function signinRedirect() {
        return router.navigate('signin');
    }

    function signupRedirect() {
        return router.navigate('signup');
    }
})
