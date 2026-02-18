import type { Recipe } from '~/types/recipe'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Parse markdown body to extract instructions array
 * Handles numbered lists (1., 2., etc.)
 */
function parseInstructions(body: string): string[] {
  if (!body) return []
  
  // Split by lines and filter out empty lines
  const lines = body.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  
  // Extract numbered list items (1., 2., etc.)
  const instructions: string[] = []
  for (const line of lines) {
    // Match lines starting with a number followed by a period and space
    const match = line.match(/^\d+\.\s+(.+)$/)
    if (match) {
      instructions.push(match[1])
    }
  }
  
  return instructions
}

/**
 * Load recipes from markdown files (server-side only)
 */
function loadRecipesFromFilesystem(): Recipe[] {
  if (!process.server) {
    return []
  }

  try {
    const recipesDir = path.join(process.cwd(), 'content', 'recipes')
    
    // Check if directory exists
    if (!fs.existsSync(recipesDir)) {
      console.warn('Recipes directory not found:', recipesDir)
      return []
    }
    
    // Read all markdown files
    const files = fs.readdirSync(recipesDir).filter(file => file.endsWith('.md'))
    
    const recipes: Recipe[] = files.map(file => {
      const filePath = path.join(recipesDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContents)
      
      // Parse instructions from markdown body
      const instructions = parseInstructions(content)
      
      // Build recipe object from frontmatter and parsed instructions
      const recipe: Recipe = {
        id: data.id || '',
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
        ingredients: data.ingredients || [],
        instructions: instructions,
        prepTime: data.prepTime || 0,
        cookTime: data.cookTime || 0,
        servings: data.servings || 0,
        category: data.category || '',
        tags: data.tags || [],
        author: data.author || '',
        createdAt: data.createdAt || ''
      }
      
      return recipe
    })
    
    // Sort by ID to maintain consistent order
    recipes.sort((a, b) => parseInt(a.id) - parseInt(b.id))
    
    return recipes
  } catch (error) {
    console.error('Error loading recipes from files:', error)
    return []
  }
}

export const useRecipes = () => {
  // Use Nuxt's useState for SSR-compatible caching (must be called inside setup)
  const recipesState = useState<Recipe[]>('recipes', () => {
    // Initialize with recipes loaded from filesystem (server-side)
    if (process.server) {
      return loadRecipesFromFilesystem()
    }
    return []
  })

  const getAllRecipes = (): Recipe[] => {
    // If state is empty and we're on server, try loading from filesystem
    if (recipesState.value.length === 0 && process.server) {
      const recipes = loadRecipesFromFilesystem()
      if (recipes.length > 0) {
        recipesState.value = recipes
      }
    }
    return recipesState.value
  }

  const getRecipeById = (id: string): Recipe | undefined => {
    const recipes = getAllRecipes()
    return recipes.find(recipe => recipe.id === id)
  }

  const searchRecipes = (query: string): Recipe[] => {
    const recipes = getAllRecipes()
    
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
