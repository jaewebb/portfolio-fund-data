import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await fetch(`${process.env.API_BASE_URL}/etfs/family?apikey=${process.env.API_KEY}`)
    const etfFamilies = await data.json()

    if (etfFamilies.status === 'error')
      return NextResponse.json({ error: etfFamilies.message, }, { status: etfFamilies.code, })
    return NextResponse.json(etfFamilies?.result, { status: 200, })
  } catch (error) {
    return NextResponse.json({ error, }, { status: 500, })
  }
}
