import { useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import { Recipe } from '@app/containers/Recipe/types/recipe.types'
import { recipeQueryKey } from '@app/containers/Recipe/constants/recipe-query.key'

interface GetRecipeParams {
  id: string
}
const useGetRecipe = ({ id }: GetRecipeParams) => {
  return useQuery({
    queryKey: recipeQueryKey.getRecipe(id),
    queryFn: async () => {
      return await callApi<DataEntry<Recipe, true>, GetRecipeParams>(`${KMAPP_ENDPOINT.recipe}/id`, 'get', undefined, {
        id
      })
    },
    enabled: !!id
  })
}

export default useGetRecipe
