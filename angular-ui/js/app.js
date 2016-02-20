(function () {
'use strict';

    // Declare app level module which depends on views, and components
    angular.module('forecastApp', [
      'ngRoute'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: './templates/forecast.html',
            controller: 'ForecastController as vm'
        });
    }]);
    
})();