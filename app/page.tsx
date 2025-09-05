import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div id="title">
            <a href="/#">
                <img id="logo" src="../static/images/wave_left_48.png" alt="Site Logo"/>
                <h1>Tide Catcher</h1>
            </a>
        </div>
    <div id="sections">
        <div id="loading">
            <p>Loading...</p>
        </div>

        <div id="tides" class="hidden">
            <script id="tides-template" type="x-tmpl-mustache">
                <table id="tides-table">
                    <caption class="top">
                        {{station}}
                    </caption>
                    {{#tides}}
                    <tr class="{{#lower}}{{type}}{{/lower}} {{prior}}" title="{{type}} at {{iso-date}}">
                        <td class="type">{{type}}</td>
                        <td class="date">{{date}}</td>
                        <td class="day">{{day}}</td>
                        <td class="time">{{time}}</td>
                    </tr>
                    {{/tides}}
                        </table>

                        <div id="info">
                        <table id="request">
                        <caption class="top">Request</caption>
                        <tr>
                        <td>Time</td>
                        <td>{{req_timestamp}}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>
                        <a href="http://maps.google.com/maps/place/{{req_lat}},{{req_lon}}/@{{req_lat}},{{req_lon}},12z"
                           target="_blank">{{req_lat}}, {{req_lon}}
                        </a>
                    </td>
                </tr>
            </table>
            <table id="response">
                <caption class="top">Response</caption>
                <tr>
                    <td><a href="#stations">Station</a></td>
                    <td>{{station}}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>
                        <a href="http://maps.google.com/maps/place/{{resp_lat}},{{resp_lon}}/@{{resp_lat}},{{resp_lon}}
            ,12z" target="_blank">
                            {{resp_lat}} , {{resp_lon}}
                        </a>
                    </td>
                </tr>
            </table>
        </div>

        <div id="notes">
            <p>
                <em>
                    {{wti_copyright}}
                </em>
            </p>
        </div>

    </script>
    </div>

    <div id="coming-soon">
        <h2>Coming Soon...</h2>
        <ul>
            <li>Offline mode: always see the last tides retrieved.</li>
            <li>Save your favorite stations.</li>
        </ul>
    </div>

    <div id="stations" class="hidden">
        <script id="stations-template" type="x-tmpl-mustache">
            <h2>Stations</h2>
            <p>
                {{station_count}} stations cached: <a href="/#refresh-stations">Refresh</a>
            </p>
            <ul>
                {{#stations}}
                <li>
                    {{org}},
                    {{name}}
                    @(<a href="http://maps.google.com/maps/place/{{lat}},{{lon}}" target="_blank">
                    {{lat}},{{lon}}
                </a>)
                    {{#noaa}}
                    NOAA ID: <a href=https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id={{org_id}}
                                target="_blank">
                    {{org_id}}
                </a>
                    {{/noaa}}
                    {{^noaa}}
                    {{org_id}}
                    {{/noaa}}
                        </li>
                    {{/stations}}
                        </ul>

                        </script>
                        </div>

                        <div id="error" class="hidden">
                        <script id="error-template" type="x-tmpl-mustache">
                        <p>
                        Error: {{status}}
                </p>
                <p>
                    Try refreshing the <a href="#stations">Stations List</a>.
                </p>

        </script>
    </div>

</div>
)
    ;
}
