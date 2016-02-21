(function () {
    'use strict';

    angular
        .module("forecastApp")
        .controller("ForecastController", ForecastController);

    ForecastController.$inject = ["$http", "ForecastService"];

    function ForecastController($http, forecastService) {
        
        // variables
        var vm = this;
        vm.conditions = [];
        vm.periods = [];
        vm.actions = [];
        vm.selectedConfigs = {};
        vm.conditionMessage = "";
        vm.actionMessage = "";
        vm.periodMessage = "";
        vm.periodInputValue = null;
        
        // methods
        vm.submitConfiguration = submitConfiguration;
        vm.selectPeriod = selectPeriod;
        vm.selectCondition = selectCondition;
        vm.selectAction = selectAction;
        vm.isSelected = isSelected;
        vm.updatePeriodItemValue = updatePeriodItemValue;
        
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

        function isSelected(key, id) {
            return vm.selectedConfigs[key].id === id;
        }

        // CONDITIONS
        function selectCondition(id) {
            var item = vm.conditions.filter(function (x) { return x.id == id })[0];
            vm.selectedConfigs["condition"] = item;
            changeConditionMessage(item.message)

        }

        function changeConditionMessage(message) {
            vm.conditionMessage = message;
        }

        // PERIODS
        function selectPeriod(id) {
            var item = vm.periods.filter(function (x) { return x.id == id })[0];
            vm.selectedConfigs["period"] = item;
            vm.periodInputValue = item.value;
            changePeriodMessage(item);
        }

        function changePeriodMessage(item) {
            vm.periodMessage = "IN NEXT " + item.value + " " + item.unit;
        }

        function updatePeriodItemValue() {
            vm.selectedConfigs["period"].value = vm.periodInputValue;
            changePeriodMessage(vm.selectedConfigs["period"]);
        }

        // ACTIONS
        function selectAction(id) {
            var item = vm.actions.filter(function (x) { return x.id == id })[0];
            vm.selectedConfigs["action"] = item;
            changeActionMessage(item);
        }

        function changeActionMessage(item) {
            vm.actionMessage = item.message + " " + item.title;
        }

        function submitConfiguration() {
            var data = {
                "userId": "turouser2",
                "config": "forecast",
                "weatherCondition": "Snow",
                "lat": 100,
                "lon": 100,
                "notificationTime": "asap",
                "predictionTime": "9"
            };

            forecastService
                .submitConfigs(data)
                .success(function (response) {
                    alert(response);
                })
                .error(function (err) {
                    console.log(err);
                });
        }

        function getConditions() {
            var array = [];
            array.push({ id: 1, title: "RAIN", message: "IF IT'S GOING TO RAIN", icon: "wi wi-raindrops" });
            array.push({ id: 2, title: "SUNNY", message: "IF IT'S GOING TO SUNNY", icon: "wi wi-day-sunny" });
            array.push({ id: 3, title: "SNOW", message: "IF IT'S GOING TO SNOW", icon: "wi wi-snow" });

            return array;
        }

        function getActions() {
            var array = [];
            array.push({ id: 1, title: "WEBHOOK", message: "NOTIFY ME BY", icon: "fa fa-cloud" });
            array.push({ id: 2, title: "EMAIL", message: "NOTIFY ME BY", icon: "fa fa-envelope" });

            return array;
        }

        function getPeriods() {
            var array = [];
            array.push({ id: 1, unit: "HOURS", value: 1 });

            return array;
        }

    }
})();