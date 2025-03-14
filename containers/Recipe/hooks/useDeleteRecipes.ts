import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { KMAPP_ENDPOINT } from '@app/api'
import useHandleErrors from '@app/hooks/useHandleErrors'
import { AxiosError } from 'axios'
import { DeleteRecipesParams } from '@app/containers/Recipe/types/recipe.types'

interface Props {
  options?: UseMutationOptions<undefined, AxiosError, DeleteRecipesParams>
}

const useDeleteRecipes = ({ options }: Props = {}) => {
  const queryClient = useQueryClient()
  const { handleAPIError } = useHandleErrors()
  return useMutation({
    mutationFn: async (deleteRecipesParams: DeleteRecipesParams) =>
      await callApi(`${KMAPP_ENDPOINT.recipe}/delete`, 'delete', undefined, deleteRecipesParams),
    onSuccess: () => {
      // queryClient.resetQueries({
      //   predicate: (query) => query.queryKey[0] === productQueryKey.getAllProduct()
      // })
    },
    onError: (error) => {
      handleAPIError(error as AxiosError)
    }
  })
}

export default useDeleteRecipes
