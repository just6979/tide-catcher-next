export default function Footer() {
  return (
    <div id="footer">
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
