import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { type EnhancedTableToolbarProps } from '@/app/types/enhancedTable'

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { id, title, } = props
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2, },
          pr: { xs: 1, sm: 1, },
        },
      ]}
    >
      <Typography
        sx={{ flex: '1 1 100%', }}
        variant='h6'
        id={id}
        component='div'
      >
        {title}
      </Typography>
    </Toolbar>
  )
}
