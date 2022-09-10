"use strict";

const logger = require("../utils/logger");
const conversions = require("../utils/conversions");
const stationStore = require("../models/station-store.js");

const dashboard = {
  index: function(request, response) {
    logger.info("dashboard rendering");

    const stations = stationStore.getAllStations();

    for (const station in stations) {
      stations[station].latestReading = {};
      let latest = stations[station].readings.length - 1;
      stations[station].latestReading.weather = conversions.getWeather(stations[station].readings[latest].code);
      stations[station].latestReading.tempC = stations[station].readings[latest].temperature;
      stations[station].latestReading.tempF = conversions.getFahrenheit(stations[station].latestReading.tempC);
      stations[station].latestReading.windBft = conversions.getBeaufort(stations[station].readings[latest].windSpeed);
      stations[station].latestReading.pressure = stations[station].readings[latest].pressure;
      console.log(stations[station].latestReading);
      console.log("---------");
    }

    const viewData = {
      title: "Station Dashboard",
      stations: stations
    };

    logger.info("about to render", stations);
    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;