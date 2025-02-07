import { NextResponse } from 'next/server'
import { type EtfFamilyApiResult } from '@/app/types/etf'

export async function GET() {
  try {
    const data = await fetch(`${process.env.API_BASE_URL}/etfs/family?apikey=${process.env.API_KEY}`)
    const etfFamilies: EtfFamilyApiResult = await data.json()

    return NextResponse.json(etfFamilies?.result, { status: 200, })
  } catch (error) {
    return NextResponse.json({ error, }, { status: 500, })
  }
}
