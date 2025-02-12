'use client'

import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { SelectChangeEvent } from '@mui/material/Select'

import fetcher from '@/app/utils/fetcher'

import FundTable from '@/app/components/fund/FundTable'
import FundFilters from '@/app/components/fund/FundFilters'

import { Etf } from '@/app/types/etf'

function filterEtfs(etfData: Etf[], selectedCountry: string, selectedFundFamily: string) {
  let filteredEtfs = (etfData && etfData.length > 0) ? etfData : []
  if (selectedCountry) filteredEtfs = filteredEtfs.filter(etf => etf.country === selectedCountry)
  if (selectedFundFamily) filteredEtfs = filteredEtfs.filter(etf => etf.fundFamily === selectedFundFamily)
  return filteredEtfs
}

function getEtfUrl(selectedCountry: string, selectedFundFamily: string) {
  let url = '/api/etfs'
  const params: string[] = []

  if (selectedCountry) params.push(`country=${encodeURIComponent(selectedCountry)}`)
  if (selectedFundFamily) params.push(`fund_family=${encodeURIComponent(selectedFundFamily)}`)
  if (params.length > 0) url = `${url}?${params.join('&')}`

  return url
}

export default function EtfSection() {
  const [selectedCountry, setSelectedCountry,] = useState('')
  const [selectedFundFamily, setSelectedFundFamily,] = useState('')

  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value as string)
    setSelectedFundFamily('')
  }

  const handleFundFamilyChange = (event: SelectChangeEvent) => {
    setSelectedFundFamily(event.target.value as string)
  }

  const etfUrl = useMemo(() =>
    getEtfUrl(selectedCountry, selectedFundFamily),
    [selectedCountry, selectedFundFamily,]
  )

  const { data: etfData, error: etfError, isLoading: etfLoading, } = useSWR(etfUrl, fetcher)
  const { data: familyData, error: familyError, isLoading: familyLoading, } = useSWR('/api/etfs/family', fetcher)

  const filteredEtfData = useMemo(() =>
    filterEtfs(etfData, selectedCountry, selectedFundFamily),
    [etfData, selectedCountry, selectedFundFamily,]
  )

  const errors = []

  if (etfError && etfError) errors.push(`Error getting etfs: ${etfError}`)
  if (familyError && familyError) errors.push(`Error getting fund families: ${familyError}`)

  if (errors.length > 0) return <ul>{ errors.map((e, index) => (<li key={`${e}-${index}`}>{ e }</li>))}</ul>
  if (etfLoading || familyLoading) return <div>loading...</div>

  return (
    <div>
      <FundFilters
        familyData={familyData}
        selectedCountry={selectedCountry}
        selectedFundFamily={selectedFundFamily}
        handleCountryChange={handleCountryChange}
        handleFundFamilyChange={handleFundFamilyChange}
      />
      <FundTable funds={filteredEtfData} title={'ETFs'} />
    </div>
  )
}
