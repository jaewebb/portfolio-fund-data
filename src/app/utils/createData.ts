import { Etf } from '@/app/types/etf'

export function createEtfData(
  symbol: string,
  name: string,
  fundFamily: string,
  fundType: string,
  country: string,
  micCode: string
): Etf {
  return {
    symbol,
    name,
    fundFamily,
    fundType,
    country,
    micCode,
  }
}
