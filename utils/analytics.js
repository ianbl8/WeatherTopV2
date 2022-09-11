"use strict";

const stationStore = require("../models/station-store");

const analytics = {

  getMaxTempC(stationId) {
    const station = stationStore.getStation(stationId);
    let maxTempC = null;
    if (station.readings.length > 1) {
      maxTempC = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTempC) {
          maxTempC = station.readings[i].temperature;
        }
      }
    }
    return maxTempC;
  },

  getMinTempC(stationId) {
    const station = stationStore.getStation(stationId);
    let minTempC = null;
    if (station.readings.length > 1) {
      minTempC = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTempC) {
          minTempC = station.readings[i].temperature;
        }
      }
    }
    return minTempC;
  },


  getMaxWindSpeed(stationId) {
    const station = stationStore.getStation(stationId);
    let maxWindSpeed = null;
    if (station.readings.length > 1) {
      maxWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWindSpeed) {
          maxWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return maxWindSpeed;
  },

  getMinWindSpeed(stationId) {
    const station = stationStore.getStation(stationId);
    let minWindSpeed = null;
    if (station.readings.length > 1) {
      minWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWindSpeed) {
          minWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return minWindSpeed;
  },

  getMaxPressure(stationId) {
    const station = stationStore.getStation(stationId);
    let maxPressure = null;
    if (station.readings.length > 1) {
      maxPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
    }
    return maxPressure;
  },

  getMinPressure(stationId) {
    const station = stationStore.getStation(stationId);
    let minPressure = null;
    if (station.readings.length > 1) {
      minPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure) {
          minPressure = station.readings[i].pressure;
        }
      }
    }
    return minPressure;
  },

  getTrendTemp(stationId) {
    const station = stationStore.getStation(stationId);
    let trendTemp = "big black ellipsis horizontal icon";
    if (station.readings.length > 2) {
      trendTemp = "big orange ellipsis horizontal icon";
      if (station.readings[station.readings.length - 1].temperature > station.readings[station.readings.length - 2].temperature && station.readings[station.readings.length - 2].temperature > station.readings[station.readings.length - 3].temperature) {
        trendTemp = "big orange up arrow icon";
      } else if (station.readings[station.readings.length - 1].temperature < station.readings[station.readings.length - 2].temperature && station.readings[station.readings.length - 2].temperature < station.readings[station.readings.length - 3].temperature) {
        trendTemp = "big orange down arrow icon";
      }
    }
    return trendTemp;
  },

  getTrendWindSpeed(stationId) {
    const station = stationStore.getStation(stationId);
    let trendWindSpeed = "big black ellipsis horizontal icon";
    if (station.readings.length > 2) {
      trendWindSpeed = "big teal ellipsis horizontal icon";
      if (station.readings[station.readings.length - 1].windSpeed > station.readings[station.readings.length - 2].windSpeed && station.readings[station.readings.length - 2].windSpeed > station.readings[station.readings.length - 3].windSpeed) {
        trendWindSpeed = "big teal up arrow icon";
      } else if (station.readings[station.readings.length - 1].windSpeed < station.readings[station.readings.length - 2].windSpeed && station.readings[station.readings.length - 2].windSpeed < station.readings[station.readings.length - 3].windSpeed) {
        trendWindSpeed = "big teal down arrow icon";
      }
    }
    return trendWindSpeed;
  },

  getTrendPressure(stationId) {
    const station = stationStore.getStation(stationId);
    let trendPressure = "big black ellipsis horizontal icon";
    if (station.readings.length > 2) {
      trendPressure = "big purple ellipsis horizontal icon";
      if (station.readings[station.readings.length - 1].pressure > station.readings[station.readings.length - 2].pressure && station.readings[station.readings.length - 2].pressure > station.readings[station.readings.length - 3].pressure) {
        trendPressure = "big purple up arrow icon";
      } else if (station.readings[station.readings.length - 1].pressure < station.readings[station.readings.length - 2].pressure && station.readings[station.readings.length - 2].pressure < station.readings[station.readings.length - 3].pressure) {
        trendPressure = "big purple down arrow icon";
      }
    }
    return trendPressure;
  },


}

module.exports = analytics;
