import { DataTable } from '@app/components/Table'
import TableHeader from '@app/components/Table/TableHeader'
import { Button } from '@app/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import Page from '@app/components/Page/Page'
import useGetRecipes from '@app/containers/Recipe/hooks/useGetRecipes'
import { Recipe } from '@app/containers/Recipe/types/recipe.types'
import useTablePagination from '@app/hooks/useTablePagination'
import { useRouter } from 'next/navigation'
import { getRecipeListColumns } from '@app/containers/Recipe/constants/recipe-list.columns'
import {
  RECIPE_DETAIL_CREATE_ROUTE,
  RECIPE_DETAIL_EDIT_ROUTE
} from '@app/containers/Recipe/constants/recipe-routes.constants'
import useDeleteRecipes from '@app/containers/Recipe/hooks/useDeleteRecipes'
import BackDrop from '@app/components/BackDrop/BackDrop'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { recipeQueryKey } from '@app/containers/Recipe/constants/recipe-query.key'

const RecipeList = () => {
  const { handlePaginationChange, pageSize, page } = useTablePagination()
  const router = useRouter()
  const { mutate: mutateDeleteRecipes } = useDeleteRecipes()
  const queryClient = useQueryClient()

  const handleDelete = (recipe: Recipe) => {
    mutateDeleteRecipes(
      {
        id: [recipe.id]
      },
      {
        onSuccess: async () => {
          toast.success(`Delete recipe ${recipe.code} successfully`)
          await queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === recipeQueryKey.getAllRecipes()[0]
          })
        }
      }
    )
  }
  const handleEdit = (recipe: Recipe) => {
    router.push(`${RECIPE_DETAIL_EDIT_ROUTE(recipe.id)}`)
  }

  const { data: recipes, isLoading: isGettingRecipes } = useGetRecipes({
    page: page - 1,
    size: pageSize
  })

  return (
    <Page>
      <BackDrop isLoading={isGettingRecipes} />
      <div className='flex justify-between items-center'>
        <TableHeader headerName='Recipies' totalItems={100} />
        <Button
          className='flex gap-2'
          onClick={() => {
            router.push(`${RECIPE_DETAIL_CREATE_ROUTE}`)
          }}
        >
          <PlusIcon />
          Add Recipe
        </Button>
      </div>
      <div className='mt-8'>
        <DataTable
          columns={getRecipeListColumns({
            onDelete: handleDelete,
            onEdit: handleEdit
          })}
          data={recipes?.data || []}
          totalRecords={recipes?.meta.count || 0}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </Page>
  )
}

export default RecipeList
