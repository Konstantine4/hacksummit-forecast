(function() {
   'use strict';
   
   angular
    .module("forecastApp")
    .controller("ForecastController", ForecastController);
    
    ForecastController.$inject = ["$http"];
    
    function ForecastController($http) {
        
        // variables
        var vm = this;
        vm.conditions = [];
        vm.periods = [];
        vm.actions = [];
        vm.selectedConfigs = {};
        vm.conditionMessage = "";
        vm.actionMessage = "";
        vm.periodMessage = "IN NEXT";
        
        // methods
        vm.submitConfiguration = submitConfiguration;
        vm.selectPeriod = selectPeriod;
        vm.selectCondition = selectCondition;
        vm.selectAction = selectAction;
        
        // calling init
        init();
        
        function init() {
            vm.conditions = getConditions();
            vm.periods = getPeriods();
            vm.actions = getActions();
            selectCondition(1);
            selectAction(1);
            selectPeriod(1);
        }
        
        function selectCondition(id) {
            var item = vm.conditions.filter(function(x) { return x.id == id })[0];
            vm.selectedConfigs["condition"] = item;
            changeConditionMessage(item.message)
            
        }
        
        function selectAction(id) {
            var item = vm.actions.filter(function(x) { return x.id == id })[0];
            vm.selectedConfigs["action"] = item;
            changeActionMessage(item.message);
        }
        
        function selectPeriod(id) {
            vm.selectedConfigs["period"] = vm.periods.filter(function(x) { return x.id == id })[0];
        }
        
        function changeConditionMessage(message) {
            vm.conditionMessage = message;
        }
        
        function changeActionMessage(message) {
            vm.actionMessage = message;
        }
        
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
        
        function getConditions() {
            var array = [];
            array.push({ id: 1, title: "RAIN", message: "IF IT'S GOING TO", icon: "wi wi-raindrops"});
            array.push({ id: 1, title: "SUNNY", message: "IF IT'S GOING TO", icon: "wi wi-day-sunny"});
            array.push({ id: 2, title: "SNOW", message: "IF IF'S GOING TO", icon: "wi wi-snow"});
            
            return array;
        }
        
        function getActions() {
            var array = [];
            array.push({ id: 1, title: "WEBHOOK", message: "NOTIFY ME BY", icon: "fa fa-cloud"});
            array.push({ id: 2, title: "EMAIL", message: "NOTIFY ME BY", icon: "fa fa-envelope"});
            
            return array;
        }
        
        function getPeriods() {
            var array = [];
            array.push({ id: 1, unit: "HOURS", value: 1});
            
            return array;
        }
        
    }
})();