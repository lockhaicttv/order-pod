import { useMutation } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { UpdateRecipePayload } from '@app/containers/Recipe/types/recipe.types'

const useUpdateRecipe = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (updateRecipePayload: UpdateRecipePayload) =>
      await callApi(`${KMAPP_ENDPOINT.recipe}/update`, 'put', updateRecipePayload),
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useUpdateRecipe
