// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import opportunities from '../../data/opportunities.json'
import investments from '../../data/investments.json'

export type DataPayload = {
  opportunities: Array<{
    id: number
    title: string
    subtitle: string
    card_photo: string
    fundraising_period_start: string
    fundraising_period_end: string
    interest_rates: Record<string, number | undefined>
  }>
  investments: Array<{
    id: number
    amount: number
    account_id: number
    opportunity_id: number
    created_at: string
    interest_rate: number
    interest_period_start: string
  }>
}

type ErrorPayload = {
  error: {
    message: string
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<DataPayload | ErrorPayload>) {
  const isSuccess = Math.random() > 0.33

  try {
    if (!isSuccess) throw new Error('An unexpected network error has occured.')
    res.status(200).json({opportunities, investments})
  } catch (error) {
    if (error instanceof Error) return res.status(500).json({error})

    return res.status(500).json({
      error: {
        message: 'An unknown error'
      }
    })
  }
}
