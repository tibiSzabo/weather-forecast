import { ForecastResponse, ForecastItem } from '@/types/weather'
import { ErrorResponse } from '@/types/api'

export const fetchWeatherData = async (city: string): Promise<ForecastItem[] | ErrorResponse> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(url)

    if (!response.ok) {
      const error = await response.json()
      return { error: error.message }
    }

    return filterDailyForecast((await response.json()) as ForecastResponse)
  } catch (error) {
    return { error: 'Something went wrong. Please try again later.' }
  }
}

// there are multiple forecasts for one day, we filter them to have one each day at 12:00, and first day with relevant
export const filterDailyForecast = (forecastResponse: ForecastResponse): ForecastItem[] => {
  const dailyForecast: ForecastItem[] = []
  const datesSet = new Set<string>()

  const currentTime = new Date()

  let firstTodayFound = false

  forecastResponse.list.forEach((item) => {
    const date = new Date(item.dt * 1000)

    if (!firstTodayFound && date.toDateString() === currentTime.toDateString() && date > currentTime) {
      dailyForecast.push(item)
      datesSet.add(date.toISOString().slice(0, 10))
      firstTodayFound = true
    } else if (date.getUTCHours() === 12 && date.getUTCMinutes() === 0 && date.getUTCSeconds() === 0) {
      const dateString = date.toISOString().slice(0, 10)

      if (!datesSet.has(dateString)) {
        dailyForecast.push(item)
        datesSet.add(dateString)
      }
    }
  })

  return dailyForecast
}
