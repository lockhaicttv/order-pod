import { useMutation, useQueryClient } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { CreateRecipePayload } from '@app/containers/Recipe/types/recipe.types'

const useCreateRecipe = () => {
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (createRecipePayload: CreateRecipePayload) =>
      await callApi(`${KMAPP_ENDPOINT.recipe}/add`, 'post', createRecipePayload),
    onSuccess: () => {},
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useCreateRecipe
