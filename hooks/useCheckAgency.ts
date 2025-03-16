import { useMutation, useQuery } from '@tanstack/react-query'
import callApi from '@app/api/apiCaller'
import { DataEntry, KMAPP_ENDPOINT } from '@app/api'
import useStore from '@app/store/useStore'

const useCheckAgency = () => {
  const { setIsAgency } = useStore()

  return useMutation({
    mutationKey: ['checkAgency'],
    mutationFn: async () => {
      return await callApi<DataEntry<boolean>>(`${KMAPP_ENDPOINT.user}/is-agency`, 'get', undefined)
    },
    onSuccess: (data) => {
      setIsAgency(!!data?.data)
    }
  })
}

export default useCheckAgency
