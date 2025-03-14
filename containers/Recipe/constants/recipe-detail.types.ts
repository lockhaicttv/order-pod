export interface Recipe {
  id: string
  name: string
  createdDate: string
  author: string
  ingredients: Ingredient[]
}

export interface Ingredient {
  id: number
  name: string
  quantity: number
}
