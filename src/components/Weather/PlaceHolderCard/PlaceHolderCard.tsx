import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import cn from 'classnames'
import styles from '@/components/Weather/WeatherCard/WeatherCard.module.scss'
import { WarningIcon } from '@chakra-ui/icons'
import { WeatherSearch } from '@/components/Weather/WeatherSearch'

interface PlaceHolderCardProps {
  errorMessage: string
  isLoading: boolean
}

export const PlaceHolderCard = ({ errorMessage, isLoading }: PlaceHolderCardProps) => {
  return (
    <Flex className={cn(styles.WeatherCard, styles.PlaceHolderCard)}>
      {isLoading ? (
        <Flex className={styles.SpinnerContainer}>
          <Spinner size='xl' color='whitesmoke' />
        </Flex>
      ) : (
        <>
          <WeatherSearch />
          <Flex className={styles.ErrorInfo}>
            <WarningIcon />
            <Flex>Error: {errorMessage}</Flex>
          </Flex>
        </>
      )}
    </Flex>
  )
}
