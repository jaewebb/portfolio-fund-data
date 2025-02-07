'use client'

import {
  ChangeEvent,
  MouseEvent,
  useMemo,
  useState
} from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'

import { createEtfData } from '@/app/utils/createData'
import descendingComparator from '@/app/utils/descendingComparator'

import EnhancedTableToolbar from '@/app/components/table/EnhancedTableToolbar'
import { Etf } from '@/app/types/etf'
import { type Order } from '@/app/types/order'

function getComparator<Key extends keyof Etf>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

interface HeadCell {
  id: keyof Etf
  label: string
  numeric?: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'symbol',
    label: 'Symbol',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'fundFamily',
    label: 'Fund Family',
  },
  {
    id: 'fundType',
    label: 'Fund Type',
  },
  {
    id: 'country',
    label: 'Country',
  },
  {
    id: 'micCode',
    label: 'Mic Code',
  },
]

interface EnhancedTableProps {
  order: Order
  orderBy: string
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Etf) => void
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, } =
    props
  const createSortHandler =
    (property: keyof Etf) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function FundTable({ funds, title, }: { funds: Etf[], title: string }) {
  const [order, setOrder,] = useState<Order>('asc')
  const [orderBy, setOrderBy,] = useState<keyof Etf>('symbol')
  const [page, setPage,] = useState(0)
  const [rowsPerPage, setRowsPerPage,] = useState(5)

  const fundMemoMapper = (fund: Etf) => {
    return createEtfData(fund.symbol, fund.name, fund.fundFamily, fund.fundType, fund.country, fund.micCode)
  }

  const rows = useMemo(() => (funds && funds.length > 0) ? funds.map(fund => fundMemoMapper(fund)) : [], [funds,])

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Etf
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (event: MouseEvent<unknown>, symbol: string) => {
    console.log(symbol) // this will eventually navigate to a details page
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = useMemo(
    () =>
      [...rows,]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows,]
  )

  return (
    <Box sx={{ width: '100%', }}>
      <Paper sx={{ width: '100%', mb: 2, }}>
        <EnhancedTableToolbar id={'etfTable'} title={title} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, }}
            aria-labelledby="etfTable"
            size='medium'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.symbol)}
                    tabIndex={-1}
                    key={row.symbol}
                    sx={{ cursor: 'pointer', }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      {row.symbol}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.fundFamily}</TableCell>
                    <TableCell align="right">{row.fundType}</TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">{row.micCode}</TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25,]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
