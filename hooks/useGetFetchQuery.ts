import { useQueryClient } from '@tanstack/react-query'

export const useGetFetchQuery = (key: string) => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData([key])
}
