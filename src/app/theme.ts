'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
})

export default theme
