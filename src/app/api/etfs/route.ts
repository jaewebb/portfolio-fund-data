import { NextResponse, type NextRequest } from 'next/server'
import { ApiEtf, apiEtfTransform, type EtfApiResult } from '@/app/types/etf'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const country = searchParams.get('country')
    const fundFamily = searchParams.get('fund_family')

    let url = `${process.env.API_BASE_URL}/etfs/list?apikey=${process.env.API_KEY}`
    if (country) url = `${url}&country=${encodeURIComponent(country)}`
    if (fundFamily) url = `${url}&fund_family=${encodeURIComponent(fundFamily)}`

    const data = await fetch(url)
    const etfs: EtfApiResult = await data.json()

    return NextResponse.json(etfs?.result?.list.map((e: ApiEtf) => apiEtfTransform(e)), { status: 200, })
  } catch (error) {
    return NextResponse.json({ error, }, { status: 500, })
  }
}
