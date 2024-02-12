import React, { useEffect, useReducer, useState } from 'react'
import { fetchWeatherData } from '@/utils/weather-api'
import { useDebounce } from '@uidotdev/usehooks'
import { Flex } from '@chakra-ui/react'
import { ForecastItem } from '@/types/weather'
import styles from './Weather.module.scss'
import { WeatherList } from '@/components/Weather/WeatherList'
import { initialWeatherState, weatherReducer } from '@/store/weather-reducer'
import { WeatherContext, WeatherDispatchContext } from '@/context/weather-context'
import { WeatherActionTypes } from '@/types/store'

export const Weather = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState)
  const [weatherData, setWeatherData] = useState<ForecastItem[]>([])
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(state.searchTerm, 500)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const response = await fetchWeatherData(debouncedSearchTerm)
      if ('error' in response) {
        setError(response.error)
      } else {
        setWeatherData(response)
        setError('')
        dispatch({ type: WeatherActionTypes.SET_PREVIOUS_SEARCH_TERM, payload: debouncedSearchTerm })
      }

      setTimeout(() => {
        // provide a short delay to show the loading state to avoid flashes with fast network requests
        setIsLoading(false)
      }, 500)
    }

    fetchData()
  }, [debouncedSearchTerm])

  return (
    <WeatherContext.Provider value={state}>
      <WeatherDispatchContext.Provider value={dispatch}>
        <Flex className={styles.WeatherContainer}>
          <WeatherList weatherItems={weatherData} errorMessage={error} isLoading={isLoading} />
        </Flex>
      </WeatherDispatchContext.Provider>
    </WeatherContext.Provider>
  )
}
