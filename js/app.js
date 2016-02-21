(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('forecastApp', [
        'ngRoute',
        'ui-notification',
        'uiGmapgoogle-maps'
    ]).config(['$routeProvider', 'NotificationProvider', function ($routeProvider, NotificationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: './templates/forecast.html',
                controller: 'ForecastController as vm'
            })
            .when('/store', {
                templateUrl: './templates/store.html',
                controller: 'StoreController as vm'
            })
            .otherwise({
                redirectTo: '/home'
            });

        NotificationProvider.setOptions({
            delay: 9000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
    }]);

})();