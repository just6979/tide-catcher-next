# What

Web app to display high & low tide data from nearby NOAA tide stations.

* Built with Next.js, React, & Docker.
* Currently deployed on Google Cloud Run and Vercel.

> An enhanced reproduction of https://github.com/just6979/tide-catcher.

# How

* Next.js backend serves up a React frontend and a REST/JSON API.
* Fetches tide info from https://www.worldtides.info/apidocs (temporarily, see below).
  * Via the API from https://tide-catcher.appspot.com (temporarily, see below).

# Where

* https://tide-catcher.justinwhite.net
* Alternate URL: https://tide-catcher-next-1072051472642.us-east1.run.app
* Secondary Deploy: https://tide-catcher-next.vercel.app

## TODO

* Backend
  * Implement REST/JSON API locally (remove dependency on https://tide-catcher.appspot.com)
  * Switch to https://api.tidesandcurrents.noaa.gov/mdapi/prod/ for tide data
    * Nothing wrong with https://www.worldtides.info/apidocs, just doesn't align exactly with the functionality I want:
      * No longer supports pulling data directly from a station, only "nearest"
      * Free usage tier has shrunk massively: used to be 1000 per month, now is only 100 at signup.
        * (I seem to be grandfathered into the 1000 per month, but who knows when that will stop...)
  * Cache recently used stations and tide data to minimize external data requests
* Frontend
  * Offline mode: pull 7 days of data at a time, will only need internet when that data is stale.
  * Favorite stations: Keep a list of nearby stations instead of relying on GPS data.
