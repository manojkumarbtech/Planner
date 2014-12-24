requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'Q': '../lib/q/q',
        'moment': '../lib/moment/moment.min',
        'jquery': '../lib/jquery/jquery-1.9.1.min',
        'jquery-ui': '../lib/jquery-ui/jquery-ui-1.11.2.min',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap.min',
        'fullcalendar': '../lib/fullcalendar/fullcalendar.min',
        'kendo': '../lib/kendo-ui/kendo.ui.core.min',
        'knockout-kendo': '../lib/knockout-kendo/knockout-kendo.min',
        'bootstrap-validator': '../lib/bootstrap-validator/js/bootstrapValidator.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'kendo': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/dialog', 'bindingHandlers'],
    function (system, app, viewLocator, dialog, bindingHandlers) {

    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Planner';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    dialog.MessageBox.setDefaults({ primaryButtonClass: "float-right" });

    app.start().then(function() {        
        viewLocator.useConvention();
        app.setRoot('viewmodels/shell', 'entrance');
    });
});