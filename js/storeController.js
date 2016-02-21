(function () {
    'use strict';

    angular
        .module("forecastApp")
        .controller("StoreController", StoreController);

    StoreController.$inject = ["$http"];

    function StoreController($http) {

        var vm = this;
        vm.products = [];
        vm.range = range;

        init();
        function init() {
            vm.products.push({
                title: "Nerd's umbrella",
                price: 19.90,
                description: "When it is going to rain, this is the only choice.",
                reviews: 9,
                stars: 3,
                picture: "./images/umbrella.jpg"
            });
            
            vm.products.push({
                title: "Tycoon tickets",
                price: 34.45,
                description: "Best event in town. Come to see the new rollercoaster.",
                reviews: 23,
                stars: 5,
                picture: "./images/tickets.jpg"
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