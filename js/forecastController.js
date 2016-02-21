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
        vm.locations = [];
        vm.selectedConfigs = {};
        vm.conditionMessage = "";
        vm.actionMessage = "";
        vm.periodMessage = "";
        vm.locationMessage = "";
        vm.periodInputValue = null;
        vm.locationInputValue = null;
        
        // methods
        vm.submitConfiguration = submitConfiguration;
        vm.selectPeriod = selectPeriod;
        vm.selectCondition = selectCondition;
        vm.selectAction = selectAction;
        vm.selectLocation = selectLocation;
        vm.isSelected = isSelected;
        vm.updatePeriodItemValue = updatePeriodItemValue;
        vm.updateLocationItemValue = updateLocationItemValue;
        
        // calling init
        init();

        function init() {
            vm.conditions = getConditions();
            vm.periods = getPeriods();
            vm.actions = getActions();
            vm.locations = getLocations();
            selectCondition(1);
            selectAction(1);
            selectPeriod(1);
            selectLocation(1);
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
        
        // LOCATIONS
        function selectLocation(id) {
            var item = vm.locations.filter(function (x) { return x.id == id })[0];
            vm.selectedConfigs["location"] = item;
            vm.locationInputValue = item.value;
            changeLocationMessage(item);
        }

        function changeLocationMessage(item) {
            vm.locationMessage = item.message + " " + item.value;
        }

        function updateLocationItemValue() {
            vm.selectedConfigs["location"].value = vm.locationInputValue;
            changeLocationMessage(vm.selectedConfigs["location"]);
        }

        function submitConfiguration() {
            var data = createConfigurationMessage(vm.selectedConfigs);

            forecastService
                .submitConfigs(data)
                .success(function (response) {
                    alert(response);
                })
                .error(function (err) {
                    console.log(err);
                });
            console.log(data);
        }

        function createConfigurationMessage(selections) {
            var config = {};
            config["location"] = {};
            config.location = {
                type: selections.location.type,
                value: selections.location.value
            }

            config["action"] = {};
            config.action = {
                type: selections.action.type
                // TODO: Add value
            }

            config["rules"] = [];

            if (selections.condition.type === "weather") {
                config.rules.push({ condition: "weather", title: selections.condition.title });
            }

            if (selections.period.type === "hours") {
                config.rules.push({ condition: "inNextHours", hours: selections.period.value });
            }
            
            return config;
        }

        function getConditions() {
            var array = [];
            array.push({ id: 1, type: "weather", title: "RAIN", message: "IF IT'S GOING TO RAIN", icon: "wi wi-raindrops" });
            array.push({ id: 2, type: "weather", title: "SUNNY", message: "IF IT'S GOING TO SUNNY", icon: "wi wi-day-sunny" });
            array.push({ id: 3, type: "weather", title: "SNOW", message: "IF IT'S GOING TO SNOW", icon: "wi wi-snow" });

            return array;
        }

        function getActions() {
            var array = [];
            array.push({ id: 1, type: "webhook", title: "WEBHOOK", message: "NOTIFY ME BY", icon: "fa fa-cloud" });
            array.push({ id: 2, type: "email", title: "EMAIL", message: "NOTIFY ME BY", icon: "fa fa-envelope" });

            return array;
        }

        function getPeriods() {
            var array = [];
            array.push({ id: 1, type: "hours", unit: "HOURS", value: 1 });

            return array;
        }

        function getLocations() {
            var array = [];
            array.push({ id: 1, type: "city", message: "IN", title: "NAME OF CITY", value: "NAME", icon: "fa fa-building-o" });

            return array;
        }

    }
})();