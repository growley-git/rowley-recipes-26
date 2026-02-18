<template>
  <NuxtLink :to="`/recipes/${recipe.id}`" class="recipe-card">
    <div class="recipe-image">
      <img :src="recipe.image" :alt="recipe.title" />
    </div>
    <div class="recipe-content">
      <h3 class="recipe-title">{{ recipe.title }}</h3>
      <p class="recipe-description">{{ recipe.description }}</p>
      <div class="recipe-meta">
        <span class="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {{ totalTime }} min
        </span>
        <span class="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          {{ recipe.servings }} servings
        </span>
        <span class="meta-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          {{ recipe.category }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types/recipe'

interface Props {
  recipe: Recipe
}

const props = defineProps<Props>()

const totalTime = computed(() => {
  return props.recipe.prepTime + props.recipe.cookTime
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/_variables.scss' as *;
@use '../assets/scss/_mixins.scss' as *;

.recipe-card {
  display: block;
  background-color: $background;
  border: 1px solid $border-color;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  color: inherit;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .recipe-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background-color: $background-alt;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover .recipe-image img {
    transform: scale(1.05);
  }

  .recipe-content {
    padding: $spacing-lg;
  }

  .recipe-title {
    font-size: $font-size-h4;
    color: $secondary-color;
    margin: 0 0 $spacing-sm 0;
    font-weight: $font-weight-bold;
    line-height: 1.3;
  }

  .recipe-description {
    color: $text-light;
    font-size: $font-size-small;
    line-height: $line-height-base;
    margin: 0 0 $spacing-md 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .recipe-meta {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-md;
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid $border-color;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-small;
    color: $text-light;

    svg {
      flex-shrink: 0;
    }
  }
}
</style>

