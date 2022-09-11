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

    /* get latest, max and min readings for this station */
    let latestReadings = {};
    let maxReadings = {};
    let minReadings = {};
    let trends = {};
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
      maxReadings.tempC = analytics.getMaxTempC(station.id);
      minReadings.tempC = analytics.getMinTempC(station.id);
      maxReadings.tempF = conversions.getFahrenheit(maxReadings.tempC);
      minReadings.tempF = conversions.getFahrenheit(minReadings.tempC);
      trends.temperature = analytics.getTrendTemp(station.id);
      latestReadings.windSpeed = station.readings[latest].windSpeed;
      latestReadings.windBft = conversions.getBeaufort(latestReadings.windSpeed);
      maxReadings.windSpeed = analytics.getMaxWindSpeed(station.id);
      minReadings.windSpeed = analytics.getMinWindSpeed(station.id);
      maxReadings.windBft = conversions.getBeaufort(maxReadings.windSpeed);
      minReadings.windBft = conversions.getBeaufort(minReadings.windSpeed);
      latestReadings.windCompass = conversions.getCompass(station.readings[latest].windDirection);
      latestReadings.windChillC = conversions.getWindChill(latestReadings.tempC, station.readings[latest].windSpeed);
      latestReadings.windChillF = conversions.getFahrenheit(latestReadings.windChillC);
      trends.windSpeed = analytics.getTrendWindSpeed(station.id);
      latestReadings.pressure = station.readings[latest].pressure;
      maxReadings.pressure = analytics.getMaxPressure(station.id);
      minReadings.pressure = analytics.getMinPressure(station.id);
      trends.pressure = analytics.getTrendPressure(station.id);
    }

    const viewData = {
      title: 'Station',
      station: station,
      latestReadings: latestReadings,
      maxReadings: maxReadings,
      minReadings: minReadings,
      trends: trends,
    };
    response.render('station', viewData);
  },

  addReadings(request, response) {
    const stationId = request.params.id;
    if (request.body.code && request.body.temperature && request.body.windSpeed && request.body.windDirection && request.body.pressure) {
      const newReadings = {
        id: uuid.v1(),
        date: Date(),
        code: Number(request.body.code),
        temperature: Number(request.body.temperature),
        windSpeed: Number(request.body.windSpeed),
        windDirection: Number(request.body.windDirection),
        pressure: Number(request.body.pressure),
      };
      stationStore.addReadings(stationId, newReadings);
    }
    response.redirect("/station/" + stationId);
  },

  deleteReadings(request, response) {
    const stationId = request.params.id;
    const readingsId = request.params.readingsid;
    logger.debug(`Deleting readings entry ${readingsId} from station ${stationId}`);
    stationStore.removeReadings(stationId, readingsId);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;