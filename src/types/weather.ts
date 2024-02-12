export interface ForecastResponse {
  city: {
    id: number
    name: string
    coord: {
      lon: number
      lat: number
    }
    country: string
    population: number
    timezone: number
  }
  cnt: number
  list: ForecastItem[]
}

export interface ForecastItem {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}

export enum TemperatureUnit {
  Celsius = 'C',
  Fahrenheit = 'F',
}
