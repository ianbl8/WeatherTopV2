"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const conversions = require("../utils/conversions");
const analytics = require("../utils/analytics");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);
    const station = stationStore.getStation(stationId);

    station.latestReading = {};
    station.max = {};
    station.min = {};
    let latest = station.readings.length - 1;
    if (latest >= 0) {
      station.latestReading.weatherText = conversions.getWeatherText(station.readings[latest].code);
      station.latestReading.weatherIcon = conversions.getWeatherIcon(station.readings[latest].code);

      station.latestReading.tempC = station.readings[latest].temperature;
      station.latestReading.tempF = conversions.getFahrenheit(station.latestReading.tempC);
      station.max.tempC = analytics.getMaxTempC(station.id);
      station.min.tempC = analytics.getMinTempC(station.id);
      station.max.tempF = conversions.getFahrenheit(station.max.tempC);
      station.min.tempF = conversions.getFahrenheit(station.min.tempC);

      station.latestReading.windSpeed = station.readings[latest].windSpeed;
      station.latestReading.windBft = conversions.getBeaufort(station.latestReading.windSpeed);
      station.max.windSpeed = analytics.getMaxWindSpeed(station.id);
      station.min.windSpeed = analytics.getMinWindSpeed(station.id);
      station.max.windBft = conversions.getBeaufort(station.max.windSpeed);
      station.min.windBft = conversions.getBeaufort(station.min.windSpeed);

      station.latestReading.windCompass = conversions.getCompass(station.readings[latest].windDirection);
      station.latestReading.windChillC = conversions.getWindChill(station.latestReading.tempC, station.readings[latest].windSpeed);
      station.latestReading.windChillF = conversions.getFahrenheit(station.latestReading.windChillC);

      station.latestReading.pressure = station.readings[latest].pressure;
      station.max.pressure = analytics.getMaxPressure(station.id);
      station.min.pressure = analytics.getMinPressure(station.id);

    }

    const viewData = {
      title: 'Station',
      station: station,
    };
    response.render('station', viewData);
  },

  addReadings(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReadings = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    stationStore.addReadings(stationId, newReadings);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;