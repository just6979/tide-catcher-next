export default function Footer() {
  return (
    <div id="footer">
      <h3>About</h3>
      <ul>
        <li>Created by <a href="mailto:jw@justinwhite.net">Justin White</a> (C) 2025</li>
        <li>Tide data retrieved from <a href="https://tidesandcurrents.noaa.gov" target="_blank">
          NOAA Tides & Currents</a>
        </li>
        <li>
          Built with <a
          href="https://nextjs.org" target="_blank">Next.js</a>
          , <a href="https://react.dev" target="_blank">React</a>
          , <a href="https://cloud.google.com/run" target="_blank">Google Cloud Run</a>
        </li>
        <li><a href="https://github.com/just6979/tide-catcher-next" target="_blank">Open-source</a>
          , hosted on <a href="https://github.com/" target="_blank">Github</a></li>
      </ul>
      <div id="coming-soon">
        <h3>Coming Soon</h3>

        <ul>
          <li>Backend
            <ul>
              <li className="todo-done">
                Implement REST/JSON API locally to remove dependency on
                the <a href="https://tide-catcher.appspot.com">old app</a>.
              </li>
              <li className="todo-done">
                Switch to the <a href="https://api.tidesandcurrents.noaa.gov/mdapi/prod/">NOAA API</a> for tide data.
              </li>
              <li>Cache recently used stations and tide data to minimize external data requests</li>
            </ul>
          </li>
          <li>Frontend
            <ul>
              <li>Specify the station to display data from, instead of using GPS to find the nearest.</li>
              <li>Offline mode: pull 7 days of data at a time, will only need internet when that data is stale.</li>
              <li>Favorite stations: Keep a list of nearby stations instead of relying on GPS data.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
