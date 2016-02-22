(function () {
    'use strict';

    angular
        .module("forecastApp")
        .factory("LoggerService", LoggerService);

    LoggerService.$inject = ["$http"];

    function LoggerService($http) {

        var baseUrl = 'http://169.45.221.144:3000';

        var service = {
            getLog: getLog
        };
        return service;

        function getLog() {
            var url = baseUrl + "/getLog";
            return $http.get(url);
        };
    }
})();