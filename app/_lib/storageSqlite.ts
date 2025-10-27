import { dbFilename } from "@/app/_lib/constants"
import { coordsFromLatLon } from "@/app/_lib/coords"
import type { NoaaTidePredStation, SqlStation, Station } from "@/app/_lib/types"
import Database from "better-sqlite3"
import * as url from "node:url"

// run this file from the project root to process the station data
// into a SQLite db to be uploaded with everything else

export function getStation(stationId: string): Station | undefined {
  const db = new Database(dbFilename, { readonly: true })
  const stmt = db.prepare(
    `SELECT *
     FROM stations
     WHERE id = '${stationId}';`,
  )
  const row = stmt.get()
  if (!row) return undefined
  // @ts-expect-error better-sqlite3 always returns "unknown" types
  return makeStationFromRow(row)
}

export function getAllStations(): Station[] {
  const db = new Database(dbFilename, { readonly: true })
  const stmt = db.prepare(`SELECT * FROM stations;`)
  const rows = stmt.all()
  return rows.map((row) => {
    // @ts-expect-error better-sqlite3 always returns "unknown" types
    return makeStationFromRow(row)
  })
}

function makeStationFromRow(row: SqlStation): Station {
  return {
    id: row.id,
    location: coordsFromLatLon(row.lat, row.lon),
    name: row.name,
    commonName: row.commonName,
    fullName: row.fullName,
    etidesName: row.etidesName,
    state: row.state,
    region: row.region,
    tzOffset: row.tzOffset,
  }
}

function initDb() {
  const db = new Database(dbFilename)
  db.pragma("journal_mode=WAL")
  const tableName = "stations"
  db.exec(`
    DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName}
    (
      id         VARCHAR PRIMARY KEY,
      name       VARCHAR,
      lat        NUMERIC,
      lon        NUMERIC,
      commonName VARCHAR,
      fullName   VARCHAR,
      etidesName VARCHAR,
      state      VARCHAR,
      region     VARCHAR,
      tzOffset   NUMERIC
    );`)

  const tableExists = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`,
    )
    .get()

  if (tableExists) {
    console.log(`Created DB '${dbFilename}' and table '${tableName}'.`)
  } else {
    console.error(`Unable to create table '${tableName}'.`)
  }

  db.close()
}

function makeDbFromJson(data: NoaaTidePredStation[]) {
  console.log(`Processing ${data.length} Stations from NOAA.`)
  const db = new Database(dbFilename)
  // needs "OR REPLACE" because ONE station, 8730667, is duped in the json
  const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO stations
      (id, name, lat, lon, commonName, fullName, etidesName, state, region, tzOffset)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `)
  data.forEach((s) => {
    const values = [
      s.stationId,
      s.stationName,
      s.lat,
      s.lon,
      s.commonName,
      s.stationFullName,
      s.etidesStnName,
      s.state,
      s.region,
      Number(s.timeZoneCorr),
    ]
    insertStmt.run(values)
  })

  const countStmt = db.prepare("SELECT COUNT(*) AS count FROM stations;")
  // @ts-expect-error better-sqlite3 always returns "unknown" types
  const count = countStmt.get()["count"]
  console.log(`Inserted ${count} Stations.`)

  db.close()
}

export function refreshStationsData() {
  initDb()

  const tidePredUrl =
    "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json"
  fetch(tidePredUrl)
    .then((res) => {
      res
        .json()
        .then((data) => {
          // where the magic happens
          makeDbFromJson(data["stationList"])
        })
        .catch((err) => {
          console.error(`Unable to decode JSON from ${tidePredUrl}`)
          console.error(err)
        })
    })
    .catch((err) => {
      console.error(`Unable to fetch data from ${tidePredUrl}`)
      console.error(err)
    })
}

if (import.meta.url.startsWith("file:")) {
  const modulePath = url.fileURLToPath(import.meta.url)
  if (process.argv[1] === modulePath) {
    refreshStationsData()
  }
}
