import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Recipe } from '@app/containers/Recipe/constants/recipe-detail.types'
import { Button } from '@app/components/ui/button'
import { CaretRightIcon } from '@radix-ui/react-icons'
interface ExperimentListColumnsProps {
  onEdit: (experiment: Recipe) => void
  onDelete: (experiment: Recipe) => void
  onSelect: (experiment: Recipe) => void
}
export const getExperimentListColumns = ({
  onEdit,
  onDelete,
  onSelect
}: ExperimentListColumnsProps): ColumnDef<Recipe>[] => [
  {
    header: '',
    accessorKey: 'id',
    cell: () => (
      <Button variant='ghost' className='rounded-full'>
        <CaretRightIcon />
      </Button>
    ),
    size: 50
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Recipe Name'
  },
  {
    accessorKey: 'createdDate',
    header: 'Created Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
