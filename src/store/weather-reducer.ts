import { WeatherAction, WeatherActionTypes, WeatherState } from '@/types/store'
import { TemperatureUnit } from '@/types/weather'

export const initialWeatherState: WeatherState = {
  searchTerm: 'Budapest',
  previousSearchTerm: 'Budapest',
  temperatureUnit: TemperatureUnit.Celsius,
}

export function weatherReducer(state: WeatherState, action: WeatherAction) {
  switch (action.type) {
    case WeatherActionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }
    case WeatherActionTypes.SET_PREVIOUS_SEARCH_TERM:
      return { ...state, previousSearchTerm: action.payload }
    case WeatherActionTypes.SET_TEMPERATURE_UNIT:
      return { ...state, temperatureUnit: action.payload }
    default:
      return state
  }
}
