(function() {
   'use strict';
   
   angular
    .module("forecastApp")
    .controller("ForecastController", ForecastController);
    
    ForecastController.$inject = [];
    
    function ForecastController() {
        
        var vm = this;
        
        vm.mymessage = "my message";
        
        vm.apply = apply;
        
        function apply() {}
        
    }
})();