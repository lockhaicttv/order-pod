import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import { DEFAULT_PAGINATION } from '@app/components/Table/constants/pagination-value.constants'
import { PaginationProps } from '@app/components/Table/DataTable'

export interface TablePaginationHooksReturn<T> {
  pageSize: number
  page: number
  handlePaginationChange: (pagination: PaginationProps) => void
  sort: string
}

const useTablePagination = <T>(): TablePaginationHooksReturn<T> => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const urlSearchParams = new URLSearchParams(searchParams?.toString())
  const page = Number(urlSearchParams.get('page')) || DEFAULT_PAGINATION.page
  const pageSize = Number(urlSearchParams.get('pageSize') || DEFAULT_PAGINATION.pageSize)
  const sort = urlSearchParams.get('sort') || ''
  const handleRouterPush = () => {
    router.push(`${pathname}?${urlSearchParams.toString()}`)
  }

  const handlePaginationChange = async (pagination: PaginationProps) => {
    urlSearchParams.set('page', pagination.page.toString())
    urlSearchParams.set('pageSize', pagination.pageSize.toString())

    handleRouterPush()
  }

  return {
    handlePaginationChange,
    pageSize,
    page,
    sort
  }
}

export default useTablePagination
