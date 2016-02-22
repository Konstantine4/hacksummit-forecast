(function () {
    'use strict';

    angular
        .module("forecastApp")
        .factory("LoggerService", LoggerService);

    LoggerService.$inject = ["$http"];

    function LoggerService($http) {

        var baseUrl = 'http://169.45.221.144';

        var service = {
            getLog: getLog
        };
        return service;

        function getLog() {
            var url = baseUrl + "/private/server/log.txt";
            return $http.get(url);
        };
    }
})();