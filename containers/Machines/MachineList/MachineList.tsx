import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getMachineListColumns } from '@app/containers/Machines/constants/machine-list.columns'
import {
  MACHINE_DETAIL_CREATE_ROUTE,
  MACHINE_DETAIL_EDIT_ROUTE
} from '@app/containers/Machines/constants/machine-routes.constants'
import { Machine } from '@app/containers/Machines/types/machine.types'
import useDeleteMachines from '@app/containers/Machines/hooks/useDeleteMachines'
import useGetMachines from '@app/containers/Machines/hooks/useGetMachines'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { machineQueryKey } from '@app/containers/Machines/constants/machine.query-key'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const MachineList = () => {
  const { handlePaginationChange, pageSize, page } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteMachines } = useDeleteMachines()
  const queryClient = useQueryClient()

  const handleDelete = (machine: Machine) => {
    mutateDeleteMachines(
      {
        id: [machine.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete machine ${machine.code} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === machineQueryKey.getAllMachines()[0]
          })
        }
      }
    )
  }
  const handleEdit = (machine: Machine) => {
    router.push(`${MACHINE_DETAIL_EDIT_ROUTE(machine.id)}`)
  }

  const { data: machines, isLoading: isGettingMachines } = useGetMachines({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingMachines} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Machines' totalItems={machines?.meta.count || 0} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${MACHINE_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Machine
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getMachineListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={machines?.data || []}
          totalRecords={machines?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default MachineList
