import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { ProductionQuota } from '@app/containers/ProductionQuotas/types/production-quota-type.types'
interface ProductionQuotaListColumns {
  onEdit: (productionQuota: ProductionQuota) => void
  onDelete: (productionQuota: ProductionQuota) => void
}
export const getProductionQuotaListColumns = ({
  onEdit,
  onDelete
}: ProductionQuotaListColumns): ColumnDef<ProductionQuota>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Code'
  },
  {
    accessorKey: 'stage.code',
    header: 'Stage'
  },
  {
    accessorKey: 'productOutput.name',
    header: 'Product Output'
  },
  {
    accessorKey: 'tool.name',
    header: 'Tool'
  },
  // {
  //   accessorKey: 'difficultLevel',
  //   header: 'Difficult Level'
  // },
  // {
  //   accessorKey: 'workingTime',
  //   header: 'Working Time'
  // },
  {
    accessorKey: 'numberOfemployees',
    header: 'Employee(s)'
  },
  {
    accessorKey: 'produceQuota',
    header: 'Product Quota(s)'
  },
  {
    accessorKey: 'unit',
    header: 'Unit'
  },
  {
    accessorKey: 'totalWeight',
    header: 'Total Weight'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
