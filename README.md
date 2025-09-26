# What

Web app to quickly display upcoming high & low tide data from nearest NOAA tide stations.

* Built with Next.js, React, & Docker.

> An enhanced reproduction of https://github.com/just6979/tide-catcher.

# Where

Automated deploys at Google Cloud Run and Vercel, triggered by changes to `main` branch here. 

* Main: https://tide-catcher.justinwhite.net
* Alternate URL: https://tide-catcher-next-1072051472642.us-east1.run.app
* Secondary Deploy: https://tide-catcher-next.vercel.app

# How

* Next.js backend serves both a React frontend and a REST/JSON API.
* Fetches tide info from https://www.worldtides.info/apidocs (temporarily, see below).
  * Via the API from https://tide-catcher.appspot.com (temporarily, see below).

## TODO

* Backend
  * Implement REST/JSON API locally (remove dependency on https://tide-catcher.appspot.com).
  * Switch to https://api.tidesandcurrents.noaa.gov/mdapi/prod/ for tide data.
    * Nothing wrong with https://www.worldtides.info/apidocs, just doesn't align exactly with the functionality I want:
      * No longer supports pulling data directly from a station, only "nearest".
      * Free usage tier has shrunk massively: used to be 1000 credits per month, now is only 100 credits at signup.
        * (My account seems to be grandfathered into the 1000 credits per month, but who knows when that will stop...)
  * Cache recently used stations and tide data to minimize external data requests.
* Frontend
  * Specify the station to display data from, instead of using GPS to find the nearest.
  * Offline mode: pull 7 days of data at a time, will only need internet when that data is stale.
  * Favorite stations: Keep a list of nearby stations instead of relying on GPS data.
