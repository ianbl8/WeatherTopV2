"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {

  index(request, response) {
    const viewData = {
      title: "Log in or Sign up",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Log in to WeatherTop v2",
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Sign up to WeatherTop v2",
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/login");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      if (user.password == request.body.password) {
        response.cookie("station", user.email);
        logger.info(`logging in ${user.email}`);
        response.redirect("/dashboard");
      }
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;