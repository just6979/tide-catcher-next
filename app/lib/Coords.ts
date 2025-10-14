export default class Coords {
  protected _lat: number
  protected _lon: number

  constructor(lat: number = 0, lon: number = 0) {
    this._lat = lat
    this._lon = lon
  }

  static fromLocationString(location: string) {
    return this.fromLatLongStringArray(location.split(','))
  }

  static fromLatLongStringArray(location: string[]) {
    return this.fromLatLongStrings(location[0], location[1])
  }

  static fromLatLongStrings(lat: string, lon: string) {
    return new Coords(Number(lat), Number(lon))
  }

  get lat(): number {
    return this._lat
  }

  get lon(): number {
    return this._lon
  }

  toString() {
    return `${this._lat},${this._lon}`
  }
}
