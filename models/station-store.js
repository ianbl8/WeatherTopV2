"use strict";

const _ = require("lodash");

const stationStore = {
  stationCollection: require("./station-store.json").stationCollection,

  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
    return _.find(this.stationCollection, { id:id });
  },

  addStation(station) {
    this.stationCollection.push(station);
  },

  addReadings(id, readings) {
    const station = this.getStation(id);
    station.readings.push(readings);
  }

}
module.exports = stationStore;