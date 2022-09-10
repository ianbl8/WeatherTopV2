"use strict";

const conversions = {
  getWeather(code) {
    let weather = undefined;
    if (code == 100) {
      weather = "Clear";
    } else if (code == 200) {
      weather = "Partial clouds";
    } else if (code == 300) {
      weather = "Cloudy";
    } else if (code == 400) {
      weather = "Light showers";
    } else if (code == 500) {
      weather = "Heavy showers";
    } else if (code == 600) {
      weather = "Rain";
    } else if (code == 700) {
      weather = "Snow";
    } else if (code == 800) {
      weather = "Thunder";
    }
    return weather;
  },

  getFahrenheit(celsius) {
    return celsius * 1.8 + 32;
  },

  getBeaufort(speed) {
    if (speed <= 0) {
      return 0;
    } else if (speed <= 5) {
      return 1;
    } else if (speed <= 11) {
      return 2;
    } else if (speed <= 19) {
      return 3;
    } else if (speed <= 28) {
      return 4;
    } else if (speed <= 38) {
      return 5;
    } else if (speed <= 49) {
      return 6;
    } else if (speed <= 61) {
      return 7;
    } else if (speed <= 74) {
      return 8;
    } else if (speed <= 88) {
      return 9;
    } else if (speed <= 102) {
      return 10;
    } else if (speed <= 117) {
      return 11;
    } else if (speed > 117) {
      return 12;
    }
  },

}

module.exports = conversions;