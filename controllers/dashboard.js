"use strict";

const logger = require("../utils/logger");
const conversions = require("../utils/conversions");
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");

const dashboard = {
  index: function(request, response) {
    logger.info("dashboard rendering");

    const stations = stationStore.getAllStations();

    const viewData = {
      title: "Station Dashboard",
      stations: stations
    };

    logger.info("about to render", stations);
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;