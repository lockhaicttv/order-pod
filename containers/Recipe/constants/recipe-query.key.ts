import { ListingQuery } from '@app/api'

export const recipeQueryKey = {
  getAllRecipes: (query?: ListingQuery) => ['get-all-recipes', query],
  getRecipe: (id: string) => ['get-recipe', id]
}
