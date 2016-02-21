(function () {
    'use strict';

    angular
        .module("forecastApp")
        .controller("StoreController", StoreController);

    StoreController.$inject = ["$http", "StoreService"];

    function StoreController($http, StoreService) {

        var vm = this;
        vm.products = [];
        vm.range = range;
        vm.loading = true;

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