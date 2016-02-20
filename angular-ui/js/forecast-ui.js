(function() {
   'use strict';
   
   angular
    .module("forecastApp")
    .controller("ForecastController", ForecastController);
    
    ForecastController.$inject = ["$http"];
    
    function ForecastController($http) {
        
        var vm = this;
        
        vm.mymessage = "my message";
        
        vm.submitConfiguration = submitConfiguration;
        
        function submitConfiguration() {
            var url = "http://169.45.221.144:3000/newConfig/"
            var data = {
                "userId": "turouser2",
                "config": "forecast",
                "weatherCondition": "Snow",
                "lat":100,
                "lon": 100,
                "notificationTime": "asap",
                "predictionTime": "9"
            }
                        
            $http.post(url, data)
                .success(function(data){
                    // $scope.myData = data;
                    alert(data);
                })
                .error(function(err){
                    console.log(err);
                });
            }
        
    }
})();