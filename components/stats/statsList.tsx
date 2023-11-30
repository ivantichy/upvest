import {VStack} from '@chakra-ui/react'
import {Stat, StatLabel, StatNumber, StatGroup} from '@chakra-ui/react'
import {Spinner} from '@chakra-ui/react'
import {Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react'
import {getStatsData} from './statsState'
import Error from '../../pages/error'
import styles from '../../styles/Home.module.css'

export const StatsList = () => {
  const stats = getStatsData()

  return stats.loading ? (
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  ) : stats.error ? (
    <Error />
  ) : (
    <VStack>
      {
        // TODO lint
        // TODO tests

        // ok for a few items, for more use e.g. React virtualized list or similar https://github.com/bvaughn/react-virtualized
        stats.data.map(item => (
          <Card className={styles.card}>
            <StatGroup>
              <Stat>
                <StatLabel>
                  <h2>{item.title}</h2>
                </StatLabel>
              </Stat>
              <Stat>
                <StatLabel>Investors:</StatLabel>
                <StatNumber>{item.investorsCount}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Total invested:</StatLabel>
                <StatNumber>{item.investedAmount.toFixed(2)} Kč</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Average investment</StatLabel>
                <StatNumber>{item.averageInvestment.toFixed(2)} Kč</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Days left</StatLabel>
                <StatNumber>{item.daysLeft}</StatNumber>
              </Stat>
            </StatGroup>
          </Card>
        ))
      }
    </VStack>
  )
}
