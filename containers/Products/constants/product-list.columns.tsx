import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Checkbox } from '@app/components/ui/checkbox'
import { Product } from '@app/containers/Products/types/product.types'

interface ProductListColumns {
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}
export const getProductListColumns = ({ onEdit, onDelete }: ProductListColumns): ColumnDef<Product>[] => [
  // {
  //   accessorKey: 'id',
  //   header: '',
  //   cell: ({ row }) => {
  //     return <Checkbox />
  //   },
  //   size: 50
  // },
  {
    accessorKey: 'name',
    header: 'Product name'
  },
  {
    accessorKey: 'code',
    header: 'Code'
  },
  {
    accessorKey: 'type',
    header: 'Type'
  },
  {
    accessorKey: 'unit',
    header: 'Unit'
  },
  {
    accessorKey: 'weight',
    header: 'Weight'
  },
  {
    accessorKey: 'recipe.code',
    header: 'Recipe'
  },
  {
    accessorKey: 'process.code',
    header: 'Process'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
