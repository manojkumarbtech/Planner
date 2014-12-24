define(['jquery', 'knockout', 'kendo', 'knockout-kendo'], function ($, ko) {

    ko.bindingHandlers.kendoCalendar.options = {
        footer: false
    };

    ko.bindingHandlers.kendoTimePicker.options = {
        format: "HH:mm"
    };

    ko.bindingHandlers.kendoDatePicker.options = {
        format: 'dd/MM/yyyy',
        footer: false
    };

    ko.bindingHandlers.kendoColorPicker.options = {
        palette: [
            '#FFE518', '#FAD31C', '#FAAA21', '#ED5724',
            '#F04639', '#BB2325', '#8C0C03', '#5F3577',
            '#E5185D', '#F384AE', '#AF95C5', '#7B67AE',
            '#7DCDC1', '#00A8A8', '#12959F', '#042256',
            '#80BC42', '#4AA03F', '#16884A', '#003F2E'
        ],
        columns: 4,
        tileSize: {
            width: 34,
            height: 19
        }
    };

    ko.bindingHandlers.selectFile = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
            $(element).on('change', function () {
                value(element.files[0]);
            });
        }        
    };

});