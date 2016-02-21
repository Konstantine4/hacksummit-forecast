(function () {
    'use strict';

    angular
        .module("forecastApp")
        .factory("ForecastService", ForecastService);

    ForecastService.$inject = ["$http"];

    function ForecastService($http) {

        var baseUrl = 'http://169.45.221.144:3000';

        var service = {
            submitConfigs: submitConfigs
        };
        return service;

        ////////////

        function submitConfigs(data) {
            var url = baseUrl + "/newConfig";
            return $http.post(url, data);
        };
    }

})();