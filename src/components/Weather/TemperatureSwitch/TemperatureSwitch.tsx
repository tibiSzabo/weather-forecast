import React, { useContext } from 'react'
import { Switch, Text } from '@chakra-ui/react'
import { WeatherContext, WeatherDispatchContext } from '@/context/weather-context'
import { TemperatureUnit } from '@/types/weather'
import { WeatherActionTypes } from '@/types/store'

export const TemperatureSwitch = () => {
  const dispatch = useContext(WeatherDispatchContext)
  const { temperatureUnit } = useContext(WeatherContext)

  const handleTemperatureSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: WeatherActionTypes.SET_TEMPERATURE_UNIT,
      payload: event.target.checked ? TemperatureUnit.Fahrenheit : TemperatureUnit.Celsius,
    })
  }

  return (
    <>
      <Switch onChange={handleTemperatureSwitchChange} />
      <Text fontSize='16px'>{temperatureUnit === TemperatureUnit.Celsius ? '°F' : '°C'}</Text>
    </>
  )
}
