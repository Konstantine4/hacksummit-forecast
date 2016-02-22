(function () {
    'use strict';

    angular
        .module("forecastApp")
        .controller("StoreController", StoreController);

    StoreController.$inject = ["$http", "StoreService", "Notification", "LoggerService"];

    function StoreController($http, StoreService, Notification, LoggerService) {

        var vm = this;
        vm.products = [];
        vm.range = range;
        vm.loading = true;
        vm.logs = "";


        init();
        function init() {
            StoreService
                .getAllProducts()
                .success(function (response) {
                    response.forEach(function (element) {
                        vm.products.push(element);
                        vm.loading = false;
                    }, this);
                })
                .error(function (err) {
                    console.log(err);
                    vm.loading = false;
                    Notification.error({ message: "Sorry. Products are not available. Try again later.", title: "Error" });
                });

            LoggerService.getLog()
                .success(function (response) {
                    console.log(response);
                    vm.logs = response;
                })
                .error(function (err) {
                    console.log(err);
                    vm.loading = false;
                    Notification.error({ message: "Can't fetch log file.", title: "Error" });
                });
        }

        function range(count) {
            var ratings = [];
            for (var i = 0; i < count; i++) {
                ratings.push(i)
            }
            return ratings;
        }
    }
    
    //     <div ng-app='myApp' ng-controller="Main">
    //   <span ng-repeat="n in range('5')">Start{{$index}} &nbsp;&nbsp;</span>
    // </div>

   

})();