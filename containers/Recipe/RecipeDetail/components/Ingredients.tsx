import React from 'react'
import { Ingredient } from '@app/containers/Recipe/constants/recipe-detail.types'

interface Props {
  ingredients: Ingredient[]
}

const Ingredients: React.FC<Props> = ({ ingredients }) => {
  return (
    <div>
      <div className=''>
        {ingredients.map((ingredient, index) => {
          return (
            <div key={index} className='flex gap-4'>
              <div>{ingredient.name}</div>
              <div>{ingredient.quantity}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Ingredients
