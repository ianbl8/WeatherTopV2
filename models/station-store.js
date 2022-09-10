"use strict";

const logger = require("../utils/logger");
const _ = require("lodash");

const stationStore = {
  stationCollection: require("./station-store.json").stationCollection,

  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
    return _.find(this.stationCollection, { id:id });
  },

}
module.exports = stationStore;