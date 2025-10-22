# What

Web app to quickly display upcoming high & low tide data from nearest NOAA tide stations.

* Built with Next.js, React, & Docker.
* An enhanced reproduction of https://github.com/just6979/tide-catcher / https://tide-catcher.appspot.com

# Where

Automated deploys at Google Cloud Run and Vercel, triggered by changes to
the [main branch](https://github.com/just6979/tide-catcher-next/tree/main)
at [GitHub](https://github.com/just6979/tide-catcher-next)

* Main: https://tide-catcher.justinwhite.net
* Alternate URL: https://tide-catcher-next-1072051472642.us-east1.run.app
* Secondary Deploy: https://tide-catcher-next.vercel.app

# How

* Next.js backend serves both a React frontend and a REST/JSON API.
* Fetches tide info from various APIs
  from [NOAA Tides & Currents](https://tidesandcurrents.noaa.gov/web_services_info.html)

# API

The front-end fetches it's data from a
[thin wrapper](https://github.com/just6979/tide-catcher-next/blob/main/backend-api.yaml) over the
[NOAA Web Services APIs](https://tidesandcurrents.noaa.gov/web_services_info.html).

I'm using a wrapper because this front-end originally pulled data from
[my old Flask back-end](https://tide-catcher.appspot.com) so that I couple spin this one up quickly.
That back-end was intended to cache results per station along with computing nearest stations,
until [WorldTides](https://www.worldtides.info) changed their API to only do the nearest search
behind the scenes. They also virtually killed their free-tier:
originally 1000 calls per month per free account, now 100 total per free account.

The NOAA data is public and free (and fast!), though I still plan on doing caching
just to save on both outgoing bandwidth and the latency of making extra fetches.

[More info](https://github.com/just6979/tide-catcher-next/blob/main/API.md)
and [API Spec](https://github.com/just6979/tide-catcher-next/blob/main/backend-api.yaml)

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
