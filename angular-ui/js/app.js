(function () {
'use strict';

    // Declare app level module which depends on views, and components
    angular.module('forecastApp', [
      'ngRoute'
    ]).
    config(['$routeProvider', function($routeProvider) {
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
    }]);
    
})();