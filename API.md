# Tide Catcher Backend API

Basically just wraps a few NOAA REST APIs into a single REST API more specific to my use for just tides.

## References

### Local

- [Tide Catcher API Spec](https://github.com/just6979/tide-catcher-next/blob/main/backend-api.yaml)

### Remote

- [NOAA Web Services](https://tidesandcurrents.noaa.gov/web_services_info.html)
  - Tide predictions by station ID: [CO-OPS Data API](https://api.tidesandcurrents.noaa.gov/api/prod/)
  - Station data by station ID: [CO-OPS Metadata API](https://api.tidesandcurrents.noaa.gov/mdapi/prod/)
  - Create URLs for the above APIs: [CO-OPS API Builder](https://tidesandcurrents.noaa.gov/api-helper/url-generator.html)
  - Stations by location, and the list of all stations:
    ['tidepredstations' Metadata API](https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json)
    - Used by the main [NOAA Tides Predictions](https://tidesandcurrents.noaa.gov/tide_predictions.html) site,
      but I cannot find any official documentation for it,
      so I just based my usage on the requests made by the above Tides page.

### Examples

- [Tide Catcher API](https://github.com/just6979/tide-catcher-next/blob/main/http-client/local_api.http)
- [NOAA APIs](https://github.com/just6979/tide-catcher-next/blob/main/http-client/noaa_apis.http)
