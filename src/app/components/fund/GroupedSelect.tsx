'use client'

import { v4 as uuid } from 'uuid'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { type SelectGroup, type SelectOption } from '@/app/types/select'

export default function GroupedSelect(
  { handleChange, id = uuid(), label, labelId = uuid(), options, selectedOption, }:
  {
    handleChange: (event: SelectChangeEvent) => void,
    id: string,
    label: string,
    labelId: string,
    options: SelectGroup[],
    selectedOption: string,
  }
) {
  return (
    <Box sx={{ minWidth: 120, }}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={selectedOption}
          label={label}
          onChange={handleChange}
        >
          {
            options.map((groupOption: SelectGroup, index: number) => {
              return (
                [
                  <ListSubheader key={`${id}-group-label-${index}`}>{ groupOption.groupLabel }</ListSubheader>,
                  groupOption.groupValue.map(
                    (option: SelectOption, index: number) =>
                      <MenuItem value={option.value} key={`${id}-option-${index}`}>{option.label}</MenuItem>
                  ),
                ]
              )
            })
          }
        </Select>
      </FormControl>
    </Box>
  )
}
