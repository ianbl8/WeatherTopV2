WeatherTop v2
==============================

This is WeatherTop v2, Release 2.

This version of the web application introduces users, with each station and its readings tied to a specific user. It also introduces persistence, with any new users, stations or readings added to the correct JSON file.

Each user sees a dashboard with their stations listed, links to each station page, and a section to add readings.

For each station, the latest weather conditions, temperature, wind speed and direction, and pressure are displayed in the card grid. Where there are multiple readings for a station, maximum and minimum readings are displayed.

New users can sign up and log in. New stations can be created and new readings can be entered. All new user data is saved to _user-store.json_ and all new stations and readings are saved to _station-store.json_, linked to their owner.

This version is deployed on Glitch at https://buttery-juvenile-armadillo.glitch.me/