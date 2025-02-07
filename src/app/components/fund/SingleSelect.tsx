'use client'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { type SelectOption } from '@/app/types/select'

export default function SingleSelect(
  { handleChange, id, label, labelId, options, selectedOption, }:
  {
    handleChange: (event: SelectChangeEvent) => void,
    id: string,
    label: string,
    labelId: string,
    options: SelectOption[],
    selectedOption: string,
  }
) {
  return (
    <Box sx={{ minWidth: 120, }}>
      <FormControl fullWidth>
        <InputLabel id={labelId || 'grouped-select-label'}>{label}</InputLabel>
        <Select
          labelId={labelId || 'grouped-select-label'}
          id={id || 'grouped-select'}
          value={selectedOption}
          label={label}
          onChange={handleChange}
        >
          {
            options.map((option: SelectOption, index: number) =>
              <MenuItem value={option.value} key={`${id}-option-${index}`}>{option.label}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
  )
}
