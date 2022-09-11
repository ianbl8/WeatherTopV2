"use strict";

const userStore = require("../models/user-store");
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

  details(request, response) {
    const userEmail = request.cookies.station;
    const user = userStore.getUserByEmail(userEmail);
    const viewData = {
      title: "Check and update your details",
      user: user,
    };
    response.render("details", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userStore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/login");
  },

  authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
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

  updateName(request, response) {
    const userId = request.params.id;
    const user = userStore.getUserById(userId);
    console.log("Request to update name received");
    if (user.password == request.body.password) {
      console.log("Match");
      const newUser = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: user.email,
        password: user.password
      };
      console.log(newUser);
      logger.debug(`Updating user ${userId}`);
      userStore.updateUser(user, newUser);
      response.redirect("/updatesuccess");
    } else {
      console.log("No match");
      response.redirect("/updatefail");
    }
  },

  updateEmail(request, response) {
    const userId = request.params.id;
    const user = userStore.getUserById(userId);
    console.log("Request to update email received");
    if (user.password == request.body.password) {
      console.log("Match");
      const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: request.body.newEmail,
        password: user.password
      };
      console.log(newUser);
      logger.debug(`Updating user ${userId}`);
      userStore.updateUser(user, newUser);
      response.cookie("station", request.body.newEmail);
      response.redirect("/updatesuccess");
    } else {
      console.log("No match");
      response.redirect("/updatefail");
    }
  },

  updatePassword(request, response) {
    const userId = request.params.id;
    const user = userStore.getUserById(userId);
    console.log("Request to update password received");
    if (user.password == request.body.password && request.body.newpassword1 == request.body.newpassword2) {
      console.log("Match");
      const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: request.body.newpassword1
      };
      console.log(newUser);
      logger.debug(`Updating user ${userId}`);
      userStore.updateUser(user, newUser);
      response.redirect("/updatesuccess");
    } else {
      console.log("No match");
      response.redirect("/updatefail");
    }
  },

  updateSuccess(request, response) {
    const viewData = {
      title: "Update successful",
    };
    response.render("updatesuccess", viewData);
  },

  updateFail(request, response) {
    const viewData = {
      title: "Update failed",
    };
    response.render("updatefail", viewData);
  },


  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userStore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;