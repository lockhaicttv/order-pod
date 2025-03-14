export interface Recipe {
  id: number
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

export const sampleExperiments: Recipe = {
  id: 1,
  name: 'Chocolate Cake',
  createdDate: '2024-04-16',
  author: 'Baker Bob',
  ingredients: [
    { id: 1, name: 'Flour', quantity: 2 },
    { id: 2, name: 'Sugar', quantity: 1 },
    { id: 3, name: 'Eggs', quantity: 3 },
    { id: 4, name: 'Cocoa Powder', quantity: 0.5 },
    { id: 5, name: 'Milk', quantity: 1 }
  ]
}
