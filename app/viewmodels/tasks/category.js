define(function () {

    return {
        activate: activate
    };

    function activate(id) {
        this.moduleActivationData = {
            title: id.charAt(0).toUpperCase() + id.slice(1),
            filter: {
                'category': id.charAt(0).toUpperCase() + id.slice(1),
                'isCompleted': false
            }
        };
    }
});
