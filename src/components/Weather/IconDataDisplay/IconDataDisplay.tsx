import React from 'react'
import styles from './IconDataDisplay.module.scss'
import { Flex, Text } from '@chakra-ui/react'

interface IconDataDisplayProps {
  icon: JSX.Element
  value: string
  description: string
}

export const IconDataDisplay = ({ icon, value, description }: IconDataDisplayProps) => {
  return (
    <Flex className={styles.DisplayContainer}>
      {icon}
      <Flex className={styles.TextContainer}>
        <Flex className={styles.DisplayValue}>{value}</Flex>
        <Flex className={styles.DisplayDescription}>{description}</Flex>
      </Flex>
    </Flex>
  )
}
