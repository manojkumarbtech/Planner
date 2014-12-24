define(['plugins/router', 'knockout', 'userContext'], function (router, ko, userContext) {
    
    var childRouter = router.createChildRouter()
                .makeRelative({
                    moduleId: 'viewmodels/tasks',
                    fromParent: true
                }).map([
                    { route: ['', 'all'], moduleId: 'all', title: 'All', icon: null, nav: true },
                    { route: 'starred', moduleId: 'starred', title: 'Starred', icon: 'star', nav: true },
                    { route: 'completed', moduleId: 'completed', title: 'Completed', icon: 'check', nav: true },
                    { route: 'category/:id', moduleId: 'category', title: 'Category', icon: null, nav: false }
                ]).buildNavigationModel(),

        categories = ko.observableArray([
                { title: 'Work', icon: 'suitcase', color: '' },
                { title: 'Home', icon: 'home', color: '' },
                { title: 'Personal', icon: 'heart', color: '' },
                { title: 'Shopping', icon: 'shopping-cart', color: '' },
                { title: 'Travel', icon: 'globe', color: '' },
                { title: 'Health', icon: 'sun-o', color: '' },
        ])
    ;

    return {
        router: childRouter,
        categories: categories,
        canActivate: canActivate
    }
    function canActivate() {
        return (userContext.session().sessionToken && userContext.session().userId) ? true : { redirect: 'signin' };
    }
});