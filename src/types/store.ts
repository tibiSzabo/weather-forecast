import { TemperatureUnit } from '@/types/weather'

export interface WeatherState {
  searchTerm: string
  previousSearchTerm: string
  temperatureUnit: TemperatureUnit
}

export enum WeatherActionTypes {
  SET_SEARCH_TERM = 'SET_SEARCH_TERM',
  SET_PREVIOUS_SEARCH_TERM = 'SET_PREVIOUS_SEARCH_TERM',
  SET_TEMPERATURE_UNIT = 'SET_TEMPERATURE_UNIT',
}

interface SetSearchTermAction {
  type: WeatherActionTypes.SET_SEARCH_TERM
  payload: string
}

interface SetPreviousSearchTermAction {
  type: WeatherActionTypes.SET_PREVIOUS_SEARCH_TERM
  payload: string
}

interface SetTemperatureUnitAction {
  type: WeatherActionTypes.SET_TEMPERATURE_UNIT
  payload: TemperatureUnit
}

export type WeatherAction = SetSearchTermAction | SetPreviousSearchTermAction | SetTemperatureUnitAction
