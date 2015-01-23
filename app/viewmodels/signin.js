define(['plugins/router', 'knockout', 'userContext'], function (router, ko, userContext) {

    var viewModel = {
        username: ko.observable(),
        password: ko.observable(),

        submit: submit,        
        signupRedirect: signupRedirect,
        canActivate: canActivate
    };

    return viewModel;

    function canActivate() {
        return (userContext.session().sessionToken && userContext.session().userId) ? { redirect: '' } : true;
    }

    function submit() {
        userContext.signin(viewModel.username(), viewModel.password())
            .then(function () {
                router.navigate('');
            });
    }

    function signupRedirect() {
        return router.navigate('signup');
    }
})
