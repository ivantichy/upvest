import {useEffect, useState} from 'react'
// use some better way to share models from backend to frontend
import {DataPayload} from '../../pages/api/data'

const MILISECONDS_TO_DAYS = 1000 * 60 * 60 * 24

class StatsData {
  opportunityId: number
  investorsCount: number
  investedAmount: number
  averageInvestment: number
  daysLeft: number
  title: string

  // MobX?
  constructor(opportunityId: number, investorsCount: number, investedAmount: number, averageInvestment: number, daysLeft: number, title: string) {
    this.opportunityId = opportunityId
    this.investorsCount = investorsCount
    this.investedAmount = investedAmount
    this.averageInvestment = averageInvestment
    this.daysLeft = daysLeft
    this.title = title
  }
}

class StatsState {
  error: boolean = false
  loading: boolean = true
  data: Array<StatsData> = []
}

export const getStatsData = (): StatsState => {
  const [data, setData] = useState(new StatsState())

  // TODO improvement: useSWR
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('api/data/')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const state = new StatsState()
      state.loading = false
      const data = (await response.json()) as DataPayload
      const now = new Date().getTime()

      // do this in backend!
      data.opportunities.forEach(opportunity => {
        const investments = data.investments.filter(investment => investment.opportunity_id == opportunity.id)
        const investedAmount = investments.reduce((sum, current) => sum + current.amount, 0)
        const investorsCount = investments.length
        const averageInvestment = investorsCount > 0 ? investedAmount / investorsCount : 0
        let daysLeft = Math.floor((Date.parse(opportunity.fundraising_period_end) - now) / MILISECONDS_TO_DAYS) // gives negative values with current data
        if (daysLeft < 0) {
          daysLeft = 0 // like this?
        }

        state.data.push(new StatsData(opportunity.id, investorsCount, investedAmount, averageInvestment, daysLeft, opportunity.title))
      })

      setData(state)
    }

    fetchData().catch(e => {
      console.error('An error occurred while fetching the data: ', e)
      const result = new StatsState()
      result.error = true
      result.loading = false
      setData(result)
    })
  }, [setData])

  return data
}
