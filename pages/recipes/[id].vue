<template>
  <div v-if="recipe" class="recipe-detail">
    <div class="container">
      <NuxtLink to="/recipes" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Recipes
      </NuxtLink>

      <article class="recipe-article">
        <div class="recipe-hero">
          <img :src="recipe.image" :alt="recipe.title" class="recipe-hero-image" />
        </div>

        <div class="recipe-header">
          <h1 class="recipe-title">{{ recipe.title }}</h1>
          <p class="recipe-description">{{ recipe.description }}</p>

          <div class="recipe-meta-grid">
            <div class="meta-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <div class="meta-label">Prep Time</div>
                <div class="meta-value">{{ recipe.prepTime }} min</div>
              </div>
            </div>
            <div class="meta-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <div class="meta-label">Cook Time</div>
                <div class="meta-value">{{ recipe.cookTime }} min</div>
              </div>
            </div>
            <div class="meta-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <div>
                <div class="meta-label">Servings</div>
                <div class="meta-value">{{ recipe.servings }}</div>
              </div>
            </div>
            <div class="meta-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              <div>
                <div class="meta-label">Category</div>
                <div class="meta-value">{{ recipe.category }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="recipe-content-grid">
          <section class="ingredients-section">
            <h2>Ingredients</h2>
            <ul class="ingredients-list">
              <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ ingredient }}
              </li>
            </ul>
          </section>

          <section class="instructions-section">
            <h2>Instructions</h2>
            <ol class="instructions-list">
              <li v-for="(instruction, index) in recipe.instructions" :key="index">
                {{ instruction }}
              </li>
            </ol>
          </section>
        </div>

        <div v-if="recipe.tags.length > 0" class="recipe-tags">
          <h3>Tags</h3>
          <div class="tags-list">
            <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="container">
      <div class="not-found-content">
        <h1>Recipe Not Found</h1>
        <p>Sorry, we couldn't find the recipe you're looking for.</p>
        <NuxtLink to="/recipes" class="back-button">
          Browse All Recipes
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getRecipeById } = useRecipes()

const recipe = computed(() => {
  const id = route.params.id as string
  return getRecipeById(id)
})

useHead(() => {
  if (!recipe.value) {
    return {
      title: 'Recipe Not Found - Rowley Recipes'
    }
  }

  return {
    title: `${recipe.value.title} - Rowley Recipes`,
    meta: [
      { name: 'description', content: recipe.value.description },
      { property: 'og:title', content: recipe.value.title },
      { property: 'og:description', content: recipe.value.description },
      { property: 'og:image', content: recipe.value.image }
    ]
  }
})
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_mixins.scss' as *;

.recipe-detail {
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-xl);
    transition: color 0.2s ease;

    &:hover {
      color: color-mix(in srgb, var(--color-primary) 90%, black);
    }

    svg {
      flex-shrink: 0;
    }
  }

  .recipe-article {
    max-width: 1000px;
    margin: 0 auto;
  }

  .recipe-hero {
    width: 100%;
    height: 400px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: var(--spacing-xl);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    @include respond-to(md) {
      height: 500px;
    }

    .recipe-hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .recipe-header {
    margin-bottom: var(--spacing-xxl);

    .recipe-title {
      font-size: var(--font-size-h1);
      color: var(--color-secondary);
      margin-bottom: var(--spacing-md);
    }

    .recipe-description {
      font-size: var(--font-size-large);
      color: var(--color-text-light);
      line-height: var(--line-height-base);
      margin-bottom: var(--spacing-xl);
    }
  }

  .recipe-meta-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);

    @include respond-to(md) {
      grid-template-columns: repeat(4, 1fr);
    }

    .meta-card {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      background-color: var(--color-background-alt);
      border-radius: 8px;
      border: 1px solid var(--color-border);

      svg {
        flex-shrink: 0;
        color: var(--color-primary);
      }

      .meta-label {
        font-size: var(--font-size-small);
        color: var(--color-text-light);
        margin-bottom: var(--spacing-xs);
      }

      .meta-value {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-bold);
        color: var(--color-text);
      }
    }
  }

  .recipe-content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xxl);
    margin-bottom: var(--spacing-xxl);

    @include respond-to(lg) {
      grid-template-columns: 1fr 2fr;
    }
  }

  .ingredients-section,
  .instructions-section {
    h2 {
      color: var(--color-secondary);
      margin-bottom: var(--spacing-lg);
      font-size: var(--font-size-h2);
    }
  }

  .ingredients-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: var(--spacing-sm) 0 var(--spacing-sm) var(--spacing-xl);
      position: relative;
      line-height: var(--line-height-base);
      color: var(--color-text);

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
        font-size: 1.2em;
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-border);
      }
    }
  }

  .instructions-list {
    list-style: none;
    padding: 0;
    margin: 0;
    counter-reset: step-counter;

    li {
      counter-increment: step-counter;
      padding: var(--spacing-md) 0 var(--spacing-md) var(--spacing-xxl);
      position: relative;
      line-height: var(--line-height-base);
      color: var(--color-text);
      margin-bottom: var(--spacing-md);

      &::before {
        content: counter(step-counter);
        position: absolute;
        left: 0;
        top: var(--spacing-md);
        width: 2rem;
        height: 2rem;
        background-color: var(--color-primary);
        color: var(--color-background);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-small);
      }
    }
  }

  .recipe-tags {
    padding-top: var(--spacing-xl);
    border-top: 2px solid var(--color-border);

    h3 {
      color: var(--color-secondary);
      margin-bottom: var(--spacing-md);
      font-size: var(--font-size-h4);
    }

    .tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
    }

    .tag {
      display: inline-block;
      padding: var(--spacing-xs) var(--spacing-md);
      background-color: var(--color-background-alt);
      color: var(--color-text);
      border-radius: 20px;
      font-size: var(--font-size-small);
      border: 1px solid var(--color-border);
    }
  }
}

.not-found {
  padding: var(--spacing-xxl) 0;

  .not-found-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;

    h1 {
      color: var(--color-secondary);
      margin-bottom: var(--spacing-md);
    }

    p {
      color: var(--color-text-light);
      margin-bottom: var(--spacing-xl);
      font-size: var(--font-size-large);
    }

    .back-button {
      display: inline-block;
      padding: var(--spacing-md) var(--spacing-xl);
      background-color: var(--color-primary);
      color: var(--color-background);
      text-decoration: none;
      border-radius: 8px;
      font-weight: var(--font-weight-medium);
      transition: background-color 0.2s ease;

      &:hover {
        background-color: color-mix(in srgb, var(--color-primary) 90%, black);
      }
    }
  }
}

.container {
  @include container;
}
</style>

