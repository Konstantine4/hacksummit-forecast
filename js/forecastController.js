(function () {
    'use strict';

    angular
        .module("forecastApp")
        .controller("ForecastController", ForecastController);

    ForecastController.$inject = ["$scope", "$http", "ForecastService", "Notification"];

    function ForecastController($scope, $http, forecastService, Notification) {
        
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
        vm.disableButton = false;
        // gmaps
        vm.map = null;
        vm.events = null;
        vm.showMap = false;
                
        // methods
        vm.submitConfiguration = submitConfiguration;
        vm.selectPeriod = selectPeriod;
        vm.selectCondition = selectCondition;
        vm.selectAction = selectAction;
        vm.selectLocation = selectLocation;
        vm.isSelected = isSelected;
        vm.updatePeriodItemValue = updatePeriodItemValue;
        vm.updateLocationItemValue = updateLocationItemValue;
        vm.hasInputs = hasInputs;
        vm.showInputs = showInputs;
        
        
        // calling init
        init();

        function init() {
            vm.conditions = getConditions();
            vm.periods = getPeriods();
            vm.actions = getActions();
            vm.locations = getLocations();
            selectCondition(1);
            initPeriod();
            // selectPeriod(1);
            initLocation();
            // selectLocation(1);
            initAction();
            // selectAction(1);
            
            // gmaps
            vm.map = { center: { latitude: 60.9910, longitude: 24.4681 }, zoom: 8, markers: [] };
            vm.events = {
                click: onClick
            }
        }



        function showInputs(key, item) {
            if (isSelected(key, item.id) && hasInputs(item)) {
                return true;
            }
            return false;
        }

        function hasInputs(item) {
            if ('inputs' in item && item.inputs.length > 0) {
                return true;
            }
            return false;
        }

        function isSelected(key, id) {
            if (vm.selectedConfigs[key] == null) {
                return false;
            }
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
        
         function getConditions() {
            var array = [];
            array.push({ id: 1, type: "weather", value: "rain", title: "RAIN", message: "IF IT'S GOING TO RAIN", icon: "wi wi-raindrops" });
            array.push({ id: 2, type: "weather", value: "clear-day", title: "SUNNY", message: "IS THE SUN GOING TO SHINE", icon: "wi wi-day-sunny" });
            array.push({ id: 3, type: "weather", value: "snow", title: "SNOW", message: "IF IT'S GOING TO SNOW", icon: "wi wi-snow" });

            // clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
            return array;
        }


        // PERIODS
        function selectPeriod(id) {
            var item = vm.periods.filter(function (x) { return x.id == id })[0];
            vm.selectedConfigs["period"] = item;
            vm.periodInputValue = item.value;
            changePeriodMessage(item);
        }

        function changePeriodMessage(item) {
            vm.periodMessage = item.message + item.value + " " + item.unit;
        }

        function updatePeriodItemValue() {
            vm.selectedConfigs["period"].value = vm.periodInputValue;
            changePeriodMessage(vm.selectedConfigs["period"]);
        }
        
        function initPeriod() {
            vm.selectedConfigs["period"] = { id: 0, type: "default", title: "", value: "", unit: "", message: "SELECT PERIOD" };
            changePeriodMessage(vm.selectedConfigs["period"]);
        }
        
          function getPeriods() {
            var array = [];
            array.push({ id: 1, type: "hours", unit: "HOURS", value: 1, message: "IN NEXT " });

            return array;
        }

        // ACTIONS
        function selectAction(id) {
            var item = vm.actions.filter(function (x) { return x.id == id })[0];
            vm.selectedConfigs["action"] = item;
            changeActionMessage(item);
        }

        function initAction() {
            vm.selectedConfigs["action"] = { id: 0, type: "default", title: "", message: "SELECT ACTION" };
            changeActionMessage(vm.selectedConfigs["action"]);
        }

        function changeActionMessage(item) {
            vm.actionMessage = item.message + " " + item.title;
        }
        
          
        function getActions() {
            var array = [];
            array.push({ id: 1, type: "webhook", title: "WEBHOOK", message: "NOTIFY ME BY", icon: "fa fa-cloud", inputs: [{ type: "callbackUrl", value: "", placeholder: "type callback url" }] });
            array.push({ id: 2, type: "email", title: "EMAIL", message: "NOTIFY ME BY", icon: "fa fa-envelope", inputs: [{ type: "emailAddress", value: "", placeholder: "type your email" }] });

            return array;
        }

        
        // LOCATIONS
        function selectLocation(id) {
            var item = vm.locations.filter(function (x) { return x.id == id })[0];
            vm.selectedConfigs["location"] = item;
            // vm.locationInputValue = item.value;
            if (vm.showMap != true) {
                vm.showMap = true;
            }
            changeLocationMessage(item);
        }

        function changeLocationMessage(item) {
            vm.locationMessage = item.message + " " + item.value;
        }

        function updateLocationItemValue() {
            vm.selectedConfigs["location"].value = vm.locationInputValue;
            changeLocationMessage(vm.selectedConfigs["location"]);
        }

        function initLocation() {
            vm.selectedConfigs["location"] = { id: 0, type: "default", title: "", value: "", message: "SELECT LOCATION" };
            changeLocationMessage(vm.selectedConfigs["location"]);
        }

        function setCoordinates(lat, lon) {
            vm.selectedConfigs["location"].value = lat.toFixed(4) + "," + lon.toFixed(4);
            changeLocationMessage(vm.selectedConfigs["location"]);
        }
        
          function getLocations() {
            var array = [];
            array.push({ id: 1, type: "coordinates", message: "IN", title: "COORDINATES", value: "[lat,long]", icon: "fa fa-map-marker" });

            return array;
        }

        // Submit configs
        function submitConfiguration() {
            // var data = createConfigurationMessage(vm.selectedConfigs);
            vm.disableButton = true;
            var data = createErnanirstConfigs(vm.selectedConfigs);

            forecastService
                .submitConfigs(data)
                .success(function (response) {
                    // Success
                    Notification.success({ message: "Thank you! We will notify you when something happens.", title: "Success" });
                })
                .error(function (err) {
                    // Error
                    Notification.error({ message: "Error occured. Don't worry. We will take care of it.", title: "Error" });
                    vm.disableButton = false;
                });
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
                config.rules.push({ condition: "weather", value: selections.condition.value });
            }

            if (selections.period.type === "hours") {
                config.rules.push({ condition: "inNextHours", hours: selections.period.value });
            }

            return config;
        }

        function createErnanirstConfigs(selections) {

            var coordinates = vm.map.markers[0].coords;

            var config = {
                userId: "1c9de5bb-f3fe-4930-8602-cc766c32c1b6",
                config: "forecast",
                endpoints: [
                    selections.action.inputs[0].value
                ],
                weatherCondition: [
                    selections.condition.value
                ],
                lat: coordinates.latitude,
                lon: coordinates.longitude,
                notificationTime: "asap",
                predictionTime: selections.period.value * 60 * 60
            }
            return config;
        }

     
      

      
        
        // Google maps configs
        function onClick(map, eventName, originalEventArgs) {
            var e = originalEventArgs[0];
            var lat = e.latLng.lat(), lon = e.latLng.lng();
            var marker = {
                id: Date.now(),
                coords: {
                    latitude: lat,
                    longitude: lon
                }
            };
            // clear markers
            vm.map.markers = [];
            // push new onw
            vm.map.markers.push(marker);
            // change input value
            setCoordinates(lat, lon);
            // apply changes
            $scope.$apply();
        }



    }
})();