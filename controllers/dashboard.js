"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts");
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");
const conversions = require("../utils/conversions");
const analytics = require("../utils/analytics");

const dashboard = {
  index: function(request, response) {
    logger.info("dashboard rendering");
    const currentUser = accounts.getCurrentUser(request);
    const stations = stationStore.getUserStations(currentUser.id);

    /* get current readings for each station */
    for (let station of stations) {
      console.log("[station] is now: " + station.name);
      let latestReadings = {};
      let latest = null;
      if (station.readings.length > 0) {
        latest = 0;
        if (station.readings.length > 1) {
          for (let i = 1; i < station.readings.length; i++) {
            if (station.readings[i].date > station.readings[latest].date) {
              latest = i;
            }
          }
        }
        latestReadings.weatherText = conversions.getWeatherText(station.readings[latest].code);
        latestReadings.weatherIcon = conversions.getWeatherIcon(station.readings[latest].code);
        latestReadings.tempC = station.readings[latest].temperature;
        latestReadings.tempF = conversions.getFahrenheit(latestReadings.tempC);
        latestReadings.windSpeed = station.readings[latest].windSpeed;
        latestReadings.windBft = conversions.getBeaufort(latestReadings.windSpeed);
        latestReadings.windCompass = conversions.getCompass(station.readings[latest].windDirection);
        latestReadings.windChillC = conversions.getWindChill(latestReadings.tempC, station.readings[latest].windSpeed);
        latestReadings.windChillF = conversions.getFahrenheit(latestReadings.windChillC);
        latestReadings.pressure = station.readings[latest].pressure;
      }
      station.latestReadings = latestReadings;
    }

    const viewData = {
      title: "Station Dashboard",
      stations: stations,
    };
    logger.info("about to render", stations);
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    if (request.body.name && request.body.latitude && request.body.longitude) {
      const currentUser = accounts.getCurrentUser(request);
      const newStation = {
        id: uuid.v1(),
        userid: currentUser.id,
        name: request.body.name,
        latitude: Number(request.body.latitude),
        longitude: Number(request.body.longitude),
        readings: [],
      };
      logger.info("Creating new station", newStation);
      stationStore.addStation(newStation);
    }
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;