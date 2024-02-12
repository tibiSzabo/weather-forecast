import React from 'react'
import styles from './WeatherList.module.scss'
import { Flex } from '@chakra-ui/react'
import { ForecastItem } from '@/types/weather'
import { WeatherCard } from '@/components/Weather/WeatherCard'
import { PlaceHolderCard } from '../PlaceHolderCard'

interface WeatherListProps {
  weatherItems: ForecastItem[]
  errorMessage?: string
  isLoading: boolean
}

export const WeatherList = ({ weatherItems, errorMessage = '', isLoading }: WeatherListProps) => {
  if (errorMessage || isLoading) return <PlaceHolderCard errorMessage={errorMessage} isLoading={isLoading} />

  return (
    <Flex className={styles.WeatherListContainer}>
      {weatherItems.map((weather, idx) => (
        <WeatherCard weather={weather} isMainCard={idx === 0} key={weather.dt_txt} />
      ))}
    </Flex>
  )
}
