'use client'

import GroupedSelect from '@/app/components/fund/GroupedSelect'
import SingleSelect from '@/app/components/fund/SingleSelect'

import { SelectChangeEvent } from '@mui/material/Select'

import type { SelectGroup, SelectOption } from '@/app/types/select'

interface FundFamily {
  [key: string]: string[]
}

export default function FundFilters(
  { familyData, selectedCountry, selectedFundFamily, handleCountryChange, handleFundFamilyChange, } :
  {
    familyData: FundFamily,
    selectedCountry: string,
    selectedFundFamily: string,
    handleCountryChange: (event: SelectChangeEvent) => void,
    handleFundFamilyChange: (event: SelectChangeEvent) => void,
  }
) {
  const fundFamilies: SelectGroup[] = Object.keys(familyData as FundFamily).map((country: string) => {
    return {
      groupLabel: country,
      groupValue: (familyData && familyData?.[country].length > 0) ?
      familyData?.[country]?.map((family: string) => {
        return { label: family, value: family, }
      }) :
      [],
    }
  })

  const countries: SelectOption[] = Object.keys(familyData as FundFamily).map((country: string) => {
    return { label: country, value: country, }
  })
  countries.unshift({ label: 'select', value: '', })

  return (
    <>
      <SingleSelect
        handleChange={handleCountryChange}
        id={'countrySelect'}
        label={'Country'}
        labelId={'country-select-label'}
        options={countries}
        selectedOption={selectedCountry}
      />
      { selectedCountry ?
        (
          <SingleSelect
            handleChange={handleFundFamilyChange}
            id={'fundFamilySelect'}
            label={'Fund Family'}
            labelId={'fund-family-select-label'}
            options={fundFamilies.find(f => f.groupLabel === selectedCountry)?.groupValue || []}
            selectedOption={selectedFundFamily}
          />
        ) : (
          <GroupedSelect
            handleChange={handleFundFamilyChange}
            id={'fundFamilySelect'}
            label={'Fund Family'}
            labelId={'fund-family-select-label'}
            options={fundFamilies}
            selectedOption={selectedFundFamily}
          />
        )
      }
    </>
  )
}
