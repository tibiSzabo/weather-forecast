import { Header } from '@/components/Header'
import styles from './Layout.module.scss'
import { Flex } from '@chakra-ui/react'

export const Layout = ({ children }) => {
  return (
    <Flex className={styles.Layout}>
      <Header />
      <main className={styles.MainContainer}>{children}</main>
    </Flex>
  )
}
