(function() {
   'use strict';
   
   angular
    .module("forecastApp")
    .controller("StoreController", StoreController);
    
    StoreController.$inject = ["$http"];
    
    function StoreController($http) {
        
        var vm = this;
        
        
        vm.submitConfiguration = submitConfiguration;
        
        function submitConfiguration() {
        
        }
    }
    
})();