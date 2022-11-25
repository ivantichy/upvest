// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import opportunities from '../../data/opportunities.json'
import investments from '../../data/investments.json'

type Data = {
  opportunities: Array<{
    id: number,
    title: string,
    subtitle: string,
    card_photo: string,
    fundraising_period_start: string,
    fundraising_period_end: string,
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const isSuccess = Math.random() > 0.33;

  if (!isSuccess) return res.status(500).end()

  res.status(200).json({opportunities, investments})
}
