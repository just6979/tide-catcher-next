# What

Web app to quickly display upcoming high & low tide data from nearest NOAA tide stations.

* Built with Next.js, React, & Docker.
* An enhanced reproduction of https://github.com/just6979/tide-catcher / https://tide-catcher.appspot.com

# Where

Automated deploys at Google Cloud Run and Vercel, triggered by changes to
the [main branch](https://github.com/just6979/tide-catcher-next/tree/main)
at [Github](https://github.com/just6979/tide-catcher-next)

* Main: https://tide-catcher.justinwhite.net
* Alternate URL: https://tide-catcher-next-1072051472642.us-east1.run.app
* Secondary Deploy: https://tide-catcher-next.vercel.app

# How

* Next.js backend serves both a React frontend and a REST/JSON API.
* Fetches tide info from various APIs
  from [NOAA Tides & Currents](https://tidesandcurrents.noaa.gov/web_services_info.html)

## TODO

* Backend
    * DONE: ~~Implement REST/JSON API locally (remove dependency on https://tide-catcher.appspot.com).~~
    * DONE: ~~Switch to https://api.tidesandcurrents.noaa.gov/ for tide data.~~
        * GONE: ~~https://www.worldtides.info/apidocs used to be 1000 credits per month, now is only 100 credits at
          signup.~~
    * Cache recently used stations and tide data to minimize external data requests.
* Frontend
    * Specify the station to display data from, instead of using GPS to find the nearest.
    * Offline mode: pull 7 days of data at a time, will only need internet when that data is stale.
    * Favorite stations: Keep a list of nearby stations instead of relying on GPS data.
