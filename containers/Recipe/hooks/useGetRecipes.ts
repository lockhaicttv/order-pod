import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api/api-endpoints.constants'
import { DataEntry, ListingQuery } from '@app/api/types/api-common.types'
import { Recipe } from '@app/containers/Recipe/types/recipe.types'
import { recipeQueryKey } from '@app/containers/Recipe/constants/recipe-query.key'

const useGetRecipes = (query?: ListingQuery) => {
  return useQuery({
    queryKey: recipeQueryKey.getAllRecipes(query),
    queryFn: async () => {
      return await callApi<DataEntry<Recipe[], true>, ListingQuery>(
        `${KMAPP_ENDPOINT.recipe}/all`,
        'get',
        undefined,
        query
      )
    }
  })
}

export default useGetRecipes
