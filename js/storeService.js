(function () {
    'use strict';

    angular
        .module("forecastApp")
        .factory("StoreService", StoreService);

    StoreService.$inject = ["$http"];

    function StoreService($http) {

        var baseUrl = 'http://169.45.221.144:3000';

        var service = {
            getAllProducts: getAllProducts
        };
        return service;

        function getAllProducts() {
            var url = baseUrl + "/getAllProducts";
            return $http.get(url);
        };
    }
})();