import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const { id, } = await props.params
  console.log('id: ', id)
  try {
    const etf = {
      symbol: 'TEST',
      name: 'Test Fund',
      country: 'Canada',
      mic_code: 'TESTING',
      fund_family: 'Testing Corp',
      fund_type: 'Test ETF',
    }
    return NextResponse.json({ etf, }, { status: 200, })
  } catch (error) {
    return NextResponse.json({ error, }, { status: 500, })
  }
}
