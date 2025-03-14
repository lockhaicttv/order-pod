import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@app/components/ui/table'
import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { CSSProperties, useState } from 'react'
import Paginator from '@app/components/Table/Paginator'
import { Sizer } from '@app/components/Table/Sizer'
import { DEFAULT_PAGINATION, DEFAULT_SIZER_OPTION } from '@app/components/Table/constants/pagination-value.constants'
import { toInteger } from 'lodash'
import useTablePagination from '@app/hooks/useTablePagination'

const DEFAULT_REACT_TABLE_COLUMN_WIDTH = 150

export interface PaginationProps {
  page: number
  pageSize: number
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isShowFooter?: boolean
  totalRecords: number
  onPaginationChange?: (props: PaginationProps) => void
  sizeOptions?: number[]
  showPaging?: boolean
}
const DataTable = <TData, TValue>({
  data,
  columns,
  isShowFooter = false,
  totalRecords,
  onPaginationChange,
  sizeOptions = DEFAULT_SIZER_OPTION,
  showPaging = true
}: DataTableProps<TData, TValue>) => {
  const { page: urlPage, pageSize: urlPageSize } = useTablePagination()
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState(urlPage || DEFAULT_PAGINATION.page)
  const [pageSize, setPageSize] = useState(urlPageSize || DEFAULT_PAGINATION.pageSize)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    }
  })

  return (
    <div className='flex flex-col gap-4 pb-4'>
      <div className='rounded-md border bg-background'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const styles: CSSProperties =
                      header.getSize() !== DEFAULT_REACT_TABLE_COLUMN_WIDTH ? { width: `${header.getSize()}px` } : {}

                    return (
                      <TableHead key={header.id} style={styles}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {isShowFooter && (
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => {
                return (
                  <TableRow key={footerGroup.id}>
                    {footerGroup.headers.map((footer) => {
                      return (
                        <TableCell key={footer.id} colSpan={footer.colSpan}>
                          {flexRender(footer.column.columnDef.footer, footer.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableFooter>
          )}
        </Table>
      </div>

      {showPaging && (
        <div className='flex justify-between mobile:flex-col tablet:flex-row gap-4'>
          <div className='w-1/3' />
          <Paginator
            currentPage={page}
            onPageChange={(pageNumber) => {
              setPage(pageNumber)
              onPaginationChange &&
                onPaginationChange({
                  page: pageNumber,
                  pageSize
                })
            }}
            showPreviousNext
            totalPages={Math.ceil(totalRecords / pageSize)}
          />
          <div className='w-1/3 flex justify-end'>
            <div className='w-40 bg-background text-foreground'>
              <Sizer
                sizeOptions={sizeOptions}
                onValueChange={(pageSize) => {
                  setPageSize(toInteger(pageSize))
                  setPage(1)
                  onPaginationChange &&
                    onPaginationChange({
                      pageSize: toInteger(pageSize),
                      page
                    })
                }}
                value={pageSize.toString()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable
