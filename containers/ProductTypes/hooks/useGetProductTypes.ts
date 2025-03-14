import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT, ListingQuery } from '@app/api'
import { ProductType } from '@app/containers/ProductTypes/types/product-type.types'
import { productTypeQueryKey } from '@app/containers/ProductTypes/constants/product-type.query-key'

const useGetProductTypes = (query?: ListingQuery) => {
  return useQuery({
    queryKey: productTypeQueryKey.getAllProductTypes(query),
    queryFn: async () => {
      return await callApi<DataEntry<ProductType[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT['productType']}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetProductTypes
