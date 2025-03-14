import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from '@app/components/Table'
import { Recipe } from '@app/containers/Recipe/types/recipe.types'
interface RecipeListColumns {
  onEdit: (recipe: Recipe) => void
  onDelete: (recipe: Recipe) => void
}
export const getRecipeListColumns = ({ onEdit, onDelete }: RecipeListColumns): ColumnDef<Recipe>[] => [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'code',
    header: 'Recipe Code'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
]
