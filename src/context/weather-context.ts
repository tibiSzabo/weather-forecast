import React, { createContext } from 'react'
import { initialWeatherState } from '@/store/weather-reducer'
import { WeatherAction } from '@/types/store'

export const WeatherContext = createContext(initialWeatherState)
export const WeatherDispatchContext = createContext((() => {}) as React.Dispatch<WeatherAction>)
