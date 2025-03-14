import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { ProductIssue } from '@app/containers/ProductIssues/types/product-issue.types'
interface ProductIssueListColumns {
  onEdit: (productIssue: ProductIssue) => void
  onDelete: (productIssue: ProductIssue) => void
}
export const getProductIssueListColumns = ({
  onEdit,
  onDelete
}: ProductIssueListColumns): ColumnDef<ProductIssue>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Code'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'issueStage.name',
    header: 'Stage'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
