# fore.cast()

**React to weather, we handle the hard part.**

Demo application for Hack.summit() virtual hackathon. 
This project is only made for demo purposes.

## How it works

Notification service to connect your applications to weather forecast data.
You tell us how you want to be notified, we handle the hard part. 
Using our service, you can choose to receive an email or notify your applications.

This project contains a configuration interface to setup weather forecast based notifications and a demo e-commerce that reacts to it, changing it's prices.

* Select a weather event (rain, snow, sun)
* Choose a location
* Choose to be notified by email or notify an application

* You can check the notification by setting a webhook to http://requestb.in/1cxlztd1, and opening on your browser http://requestb.in/1cxlztd1?inspect

* The demo store receives notifications in the endpoint http://169.45.221.144:3000/updatePrice/
* When the store is notified, the products prices decrease based on pre-defined values.
* If the store is not notified or the last notification was more than 05 minutes ago, prices go back to normal.

* The demo store also provides a log, that shows when it received a notification and changed the prices

## use cases / examples

As a sales manager
I want use weather forecast as a parameter for pricing products,
so that I can make more revenue.

As a farmer
I want to know if it's going to rain in next 24 hours,
so that I can  save money not watering the soil.

As a event producer
I want to know if it's going to snow today,
so that I can offer cheaper tickets for attendees.

## how to scale

Our weather forecast data is powered by forecast.io's API and it's only one input. Using the proper APIs it's possible to access endless kind of data and power
many different applications. It's also possible to provide users integration modules so they can connect their data to the notification system.

## list of frameworks and apis

http://forecast.io/

"angular"
"Bootflat"
"angular-route"
"weather-icons"
"SpinKit"
"angular-ui-notification"
 "angular-google-maps"
 "nodejs"
