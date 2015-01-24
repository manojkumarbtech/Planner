define(['plugins/router', 'durandal/app', 'userContext', 'bootstrap'], function (router, app, userContext) {

    return {
        router: router,
        userContext: userContext,
        activate: function () {
            router.map([                         
                { route: '', title:'Home', moduleId: 'viewmodels/home', nav: true },
                { route: 'tasks*details', title: 'Tasks', moduleId: 'viewmodels/tasks/index', nav: true },
                { route: 'calendar', title: 'Calendar', moduleId: 'viewmodels/calendar/calendar', nav: true },
                { route: 'contacts', title: 'Contacts', moduleId: 'viewmodels/contacts/contacts', nav: true },

                { route: 'signin', title: 'Sign in', moduleId: 'viewmodels/signin' },
                { route: 'signup', title: 'Sign up', moduleId: 'viewmodels/signup' },
                { route: '404', title: '404', moduleId: 'viewmodels/404' }
            ]).buildNavigationModel()
                .mapUnknownRoutes('viewmodels/404');
            
            return router.activate();
        },
        logout: function () {
            app.showMessage('Do you really want to logout?', '', ['No', 'Yes'], true)
               .then(function (dialogResult) {
                   if (dialogResult == 'Yes') {                       
                       router.navigate('signin');
                       userContext.logout();
                   } else {
                       return;
                   }
               });
            }
        }
});