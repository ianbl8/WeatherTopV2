"use strict";

const conversions = {
  getWeatherText(code) {
    let weatherText = undefined;
    if (code == 100) {
      weatherText = "Clear";
    } else if (code == 200) {
      weatherText = "Partial clouds";
    } else if (code == 300) {
      weatherText = "Cloudy";
    } else if (code == 400) {
      weatherText = "Light showers";
    } else if (code == 500) {
      weatherText = "Heavy showers";
    } else if (code == 600) {
      weatherText = "Rain";
    } else if (code == 700) {
      weatherText = "Snow";
    } else if (code == 800) {
      weatherText = "Thunder";
    }
    return weatherText;
  },

  getFahrenheit(celsius) {
    let result = celsius * 1.8 + 32;
    return Math.round(result * 10) / 10;
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

  getCompass(bearing) {
    let direction = "North";
    if (bearing < 11.25) {
      direction = "North";
    } else if (bearing < 33.75) {
      direction = "North North East";
    } else if (bearing < 56.25) {
      direction = "North East";
    } else if (bearing < 78.75) {
      direction = "East North East";
    } else if (bearing < 101.25) {
      direction = "East";
    } else if (bearing < 123.75) {
      direction = "East South East";
    } else if (bearing < 146.25) {
      direction = "South East";
    } else if (bearing < 168.75) {
      direction = "South South East";
    } else if (bearing < 191.2) {
      direction = "South";
    } else if (bearing < 213.75) {
      direction = "South South West";
    } else if (bearing < 236.25) {
      direction = "South West";
    } else if (bearing < 258.75) {
      direction = "West South West";
    } else if (bearing < 281.25) {
      direction = "West";
    } else if (bearing < 303.75) {
      direction = "West North West";
    } else if (bearing < 326.25) {
      direction = "North West";
    } else if (bearing < 348.75) {
      direction = "North North West";
    } else {
      direction = "North";
    }
    return direction;
  },

  getWindChill(tempC, speed) {
    let result = (13.12 + (tempC * 0.6215) - (11.37 * (speed ** 0.16)) + (tempC * 0.3965 * (speed ** 0.16)));
    return Math.round(result * 10) / 10;
  },

}

module.exports = conversions;