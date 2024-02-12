import React, { useContext } from 'react'
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/input'
import styles from './WeatherSearch.module.scss'
import { SearchIcon } from '@chakra-ui/icons'
import { WeatherContext, WeatherDispatchContext } from '@/context/weather-context'
import { WeatherActionTypes } from '@/types/store'

export const WeatherSearch = () => {
  const { searchTerm } = useContext(WeatherContext)
  const dispatch = useContext(WeatherDispatchContext)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: WeatherActionTypes.SET_SEARCH_TERM, payload: event.target.value })
  }

  return (
    <InputGroup className={styles.InputGroup}>
      <Input autoFocus value={searchTerm} onChange={handleInputChange} />
      <InputRightAddon className={styles.InputAddon}>
        <SearchIcon />
      </InputRightAddon>
    </InputGroup>
  )
}
