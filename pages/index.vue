<template>
  <div class="home">
    <div class="container">
      <section class="hero">
        <h1 class="hero-title">Welcome to Rowley Recipes</h1>
        <p class="hero-subtitle">Discover and share your favorite recipes</p>
        <NuxtLink to="/recipes" class="cta-button">Browse Recipes</NuxtLink>
      </section>

      <section class="features">
        <div class="feature-card">
          <h3>Browse Recipes</h3>
          <p>Explore a collection of delicious recipes from around the world.</p>
        </div>
        <div class="feature-card">
          <h3>Share Your Favorites</h3>
          <p>Add and share your own recipes with the community.</p>
        </div>
        <div class="feature-card">
          <h3>Easy to Use</h3>
          <p>Simple and intuitive interface for finding the perfect recipe.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Home - Rowley Recipes'
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/_mixins.scss' as *;

.home {
  .hero {
    text-align: center;
    padding: var(--spacing-xxl) 0;
    margin-bottom: var(--spacing-xxl);

    .hero-title {
      color: var(--color-primary);
      margin-bottom: var(--spacing-md);
      
      @include respond-to(md) {
        font-size: var(--font-size-h1);
      }
    }

    .hero-subtitle {
      font-size: var(--font-size-large);
      color: var(--color-text-light);
      max-width: 600px;
      margin: 0 auto var(--spacing-xl);
    }

    .cta-button {
      display: inline-block;
      padding: var(--spacing-md) var(--spacing-xl);
      background-color: var(--color-primary);
      color: var(--color-background);
      text-decoration: none;
      border-radius: 8px;
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-base);
      transition: background-color 0.2s ease, transform 0.2s ease;

      &:hover {
        background-color: color-mix(in srgb, var(--color-primary) 90%, black);
        transform: translateY(-2px);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
      }
    }
  }

  .features {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-xl);

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }

    .feature-card {
      background-color: var(--color-background-alt);
      padding: var(--spacing-xl);
      border-radius: 8px;
      border: 1px solid var(--color-border);
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      h3 {
        color: var(--color-secondary);
        margin-bottom: var(--spacing-md);
        font-size: var(--font-size-h4);
      }

      p {
        color: var(--color-text-light);
        line-height: var(--line-height-base);
      }
    }
  }
}

.container {
  @include container;
}
</style>

