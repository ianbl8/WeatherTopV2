"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const stationStore = {
  store: new JsonStore("./models/station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid:userid});
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id:id });
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  addReadings(id, readings) {
    const station = this.getStation(id);
    station.readings.push(readings);
    this.store.save();
  }

}
module.exports = stationStore;