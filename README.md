WeatherTop v2
==============================

This is WeatherTop v2, Release 3.

This version of the web application has all required data and features relating to users, stations and readings, and uses persistence to store data in JSON files.

Users can sign up, log in and out, and can also amend their name, email and password. They can create stations which are linked to their user details.

Each user has a dashboard, showing the latest weather conditions, temperature, wind speed and direction, and pressure for each station. New stations can be created on this dashboard, and stations can also be deleted.

For each station, the latest weather conditions, temperature, wind speed and direction, and pressure are displayed in the card grid. Where there are multiple readings for a station, maximum and minimum readings are displayed, along with trends for temperature, wind speed and pressure. New readings can be entered on the station page, and they are recorded at the date and time they are entered. Readings can also be deleted.

All new and updated user data is saved to _user-store.json_ and all new stations and readings are saved to _station-store.json_, linked to their owner.

This version is deployed on Glitch at https://prickly-gleaming-echo.glitch.me/