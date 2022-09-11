"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts");
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");

const dashboard = {
  index: function(request, response) {
    logger.info("dashboard rendering");
    const currentUser = accounts.getCurrentUser(request);
    const stations = stationStore.getUserStations(currentUser.id);
    const viewData = {
      title: "Station Dashboard",
      stations: stations,
    };
    logger.info("about to render", stations);
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
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
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;