import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { productQueryKey } from '@app/containers/Products/constants/product.query-key'
import { Product } from '@app/containers/Products/types/product.types'

const useGetProducts = (query?: ListingQuery) => {
  return useQuery({
    queryKey: productQueryKey.getAllProduct(query),
    queryFn: async () => {
      return await callApi<DataEntry<Product[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.product}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetProducts
