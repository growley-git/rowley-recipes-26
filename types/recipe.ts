export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  ingredients: string[]
  instructions: string[]
  prepTime: number // in minutes
  cookTime: number // in minutes
  servings: number
  category: string
  tags: string[]
  author: string
  createdAt: string
}

