import { dbFilename } from "@/app/_lib/constants"
import type { Station } from "@/app/_lib/types"
import Database from "better-sqlite3"
import * as fs from "node:fs"
import url from "node:url"

// run this file from the project root to process the station data
// into a SQLite db to be uploaded with everything else

export function getStations(id?: string): Station[] {
  const db = new Database(dbFilename, { readonly: true })

  const singleStmt: string =
    `SELECT *
     FROM stations
     WHERE id = '${id}'; `
  const allStmt: string =
    `SELECT *
     FROM stations; `

  const stmt = db.prepare(id ? singleStmt : allStmt)
  // @ts-expect-error because better-sqlite3 always returns "unknown" types
  return stmt.all()
}

export function createStationsDb() {
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

  const stationsFile = fs.readFileSync("./app/_data/stations.json")
  const stationData = JSON.parse(stationsFile.toString())
  const stationList: Station[] = stationData["stationList"] || []
  console.log(`Processing ${stationList.length} Stations from local 'stations.json'.`)
  // needs "OR REPLACE" because ONE station, 8730667, is duped in the json
  const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO stations
      (id, name, lat, lon, commonName, fullName, etidesName, state, region, tzOffset)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `)
  stationList.forEach((s) => {
    const values = [
      s.id,
      s.name,
      s.location?.lat,
      s.location?.lon,
      s.commonName,
      s.fullName,
      s.etidesName,
      s.state,
      s.region,
      s.tzOffset,
    ]
    insertStmt.run(values)
  })

  const countStmt = db.prepare("SELECT COUNT(*) AS count FROM stations;")
  // @ts-expect-error better-sqlite3 always returns "unknown" types
  const count = countStmt.get()["count"]
  console.log(`Added ${count} stations to table '${tableName}'`)

  db.close()
}

if (import.meta.url.startsWith("file:")) {
  const modulePath = url.fileURLToPath(import.meta.url)
  if (process.argv[1] === modulePath) {
    createStationsDb()
  }
}
