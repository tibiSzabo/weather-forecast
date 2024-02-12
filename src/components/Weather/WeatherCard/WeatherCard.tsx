import React, { useContext, useMemo } from 'react'
import styles from './WeatherCard.module.scss'
import { ForecastItem, TemperatureUnit } from '@/types/weather'
import { Flex, ScaleFade, Text } from '@chakra-ui/react'
import cn from 'classnames'
import dayjs from 'dayjs'
import Image from 'next/image'
import { WeatherContext } from '@/context/weather-context'
import { WeatherSearch } from '@/components/Weather/WeatherSearch'
import { TemperatureSwitch } from '@/components/Weather/TemperatureSwitch'
import { HumidityIcon, WindIcon } from '@/components/icons'
import { IconDataDisplay } from '@/components/Weather/IconDataDisplay'

interface WeatherCardProps {
  weather?: ForecastItem
  isMainCard?: boolean
}

export const WeatherCard = ({ weather, isMainCard }: WeatherCardProps) => {
  const { previousSearchTerm, temperatureUnit } = useContext(WeatherContext)

  const temperatureDisplay = useMemo(() => {
    if (!weather) return ''
    const isCelsius = temperatureUnit === TemperatureUnit.Celsius
    return isCelsius ? `${Math.round(weather.main.temp)}°C` : `${Math.round((weather.main.temp * 9) / 5 + 32)}°F`
  }, [temperatureUnit, weather])

  const windSpeed = useMemo(() => {
    if (!weather) return ''
    const speed = Math.round(weather.wind.speed)
    return `${speed} km/h`
  }, [weather])

  const humidity = useMemo(() => {
    if (!weather) return ''
    return `${weather.main.humidity}%`
  }, [weather])

  const time = useMemo(() => {
    if (!weather) return ''
    return dayjs(weather.dt_txt).format('dddd HH:mm')
  }, [weather])

  if (!weather) return null

  const cardContent = (
    <Flex className={styles.WeatherCard}>
      {isMainCard && <WeatherSearch />}
      <Image
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt='weather image'
        width={100}
        height={100}
      />
      <Flex className={styles.Temperature}>
        {temperatureDisplay} {isMainCard && <TemperatureSwitch />}
      </Flex>
      <Flex className={styles.SearchTerm}>{isMainCard && previousSearchTerm}</Flex>
      <Flex className={styles.DescriptionContainer}>
        <Text className={styles.Description}>{weather.weather[0].description}</Text>
        <Text className={styles.Time}>{time}</Text>
      </Flex>
      <Flex className={styles.WindHumidityContainer}>
        <IconDataDisplay icon={<WindIcon />} value={windSpeed} description='Wind Speed' />
        <IconDataDisplay icon={<HumidityIcon />} value={humidity} description='Humidity' />
      </Flex>
    </Flex>
  )

  return (
    <Flex className={cn(styles.WeatherCardContainer, { [styles.MainCard]: isMainCard })}>
      {isMainCard ? cardContent : <ScaleFade in>{cardContent}</ScaleFade>}
    </Flex>
  )
}
