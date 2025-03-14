import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { productQueryKey } from '@app/containers/Products/constants/product.query-key'
import { Product } from '@app/containers/Products/types/product.types'

interface GetProductParams {
  id: string
}
const useGetProduct = ({ id }: GetProductParams) => {
  return useQuery({
    queryKey: productQueryKey.getProductById(id),
    queryFn: async () => {
      return await callApi<DataEntry<Product, true>, GetProductParams>(
        `${KMAPP_ENDPOINT.product}/id`,
        'get',
        undefined,
        {
          id
        }
      )
    },
    enabled: !!id
  })
}

export default useGetProduct
