import type { Recipe } from '~/types/recipe'
import { recipes } from '~/data/recipes'

export const useRecipes = () => {
  const getAllRecipes = (): Recipe[] => {
    return recipes
  }

  const getRecipeById = (id: string): Recipe | undefined => {
    return recipes.find(recipe => recipe.id === id)
  }

  const searchRecipes = (query: string): Recipe[] => {
    if (!query || query.trim() === '') {
      return recipes
    }

    const searchTerm = query.toLowerCase().trim()

    return recipes.filter(recipe => {
      const searchableText = [
        recipe.title,
        recipe.description,
        recipe.category,
        ...recipe.ingredients,
        ...recipe.tags
      ].join(' ').toLowerCase()

      return searchableText.includes(searchTerm)
    })
  }

  return {
    getAllRecipes,
    getRecipeById,
    searchRecipes
  }
}

