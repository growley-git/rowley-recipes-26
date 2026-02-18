<template>
  <div class="recipes-page">
    <div class="container">
      <header class="page-header">
        <h1>All Recipes</h1>
        <p class="page-subtitle">Discover delicious recipes from around the world</p>
      </header>

      <SearchBar @search="handleSearch" />

      <div v-if="filteredRecipes.length > 0" class="recipes-grid">
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>

      <div v-else class="empty-state">
        <svg class="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <h2>No recipes found</h2>
        <p>Try adjusting your search terms or browse all recipes.</p>
        <button v-if="searchQuery" class="clear-all-button" @click="clearAll">
          Clear Search
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getAllRecipes, searchRecipes } = useRecipes()

const allRecipes = getAllRecipes()
const searchQuery = ref('')
const filteredRecipes = ref(allRecipes)

const handleSearch = (query: string) => {
  searchQuery.value = query
  if (query.trim() === '') {
    filteredRecipes.value = allRecipes
  } else {
    filteredRecipes.value = searchRecipes(query)
  }
}

const clearAll = () => {
  searchQuery.value = ''
  filteredRecipes.value = allRecipes
}

useHead({
  title: 'Recipes - Rowley Recipes',
  meta: [
    { name: 'description', content: 'Browse our collection of delicious recipes' }
  ]
})
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../../assets/scss/_variables.scss' as *;
@use '../../assets/scss/_mixins.scss' as *;

.recipes-page {
  .page-header {
    text-align: center;
    margin-bottom: $spacing-xxl;

    h1 {
      color: $secondary-color;
      margin-bottom: $spacing-sm;
    }

    .page-subtitle {
      color: $text-light;
      font-size: $font-size-large;
    }
  }

  .recipes-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .empty-state {
    text-align: center;
    padding: $spacing-xxl 0;
    color: $text-light;

    .empty-icon {
      margin: 0 auto $spacing-lg;
      color: $text-light;
      opacity: 0.5;
    }

    h2 {
      color: $text-color;
      margin-bottom: $spacing-sm;
    }

    p {
      margin-bottom: $spacing-lg;
    }

    .clear-all-button {
      padding: $spacing-sm $spacing-lg;
      background-color: $primary-color;
      color: $background;
      border: none;
      border-radius: 6px;
      font-size: $font-size-base;
      font-weight: $font-weight-medium;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: color.adjust($primary-color, $lightness: -10%);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
      }
    }
  }
}

.container {
  @include container;
}
</style>

