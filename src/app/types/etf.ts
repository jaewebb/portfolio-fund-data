export interface Etf {
  country: string
  fundFamily: string
  fundType: string
  micCode: string
  name: string
  symbol: string
}

export interface ApiEtf {
  country: string
  fund_family: string
  fund_type: string
  mic_code: string
  name: string
  symbol: string
}

export interface EtfApiResult {
  result: {
    count: number
    list: ApiEtf[]
    status: string
  }
}
export interface EtfApiError {
  code: number
  message: ApiEtf[]
  status: string
}

export interface EtfFamilyApiResult {
  result: {
    [key: string]: string[]
  }
  status: string
}

export function apiEtfTransform(etf: ApiEtf) {
  return {
    symbol: etf.symbol,
    name: etf.name,
    fundFamily: etf.fund_family,
    fundType: etf.fund_type,
    country: etf.country,
    micCode: etf.mic_code,
  }
}
