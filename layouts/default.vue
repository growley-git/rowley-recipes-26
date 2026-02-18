<template>
  <div class="layout">
    <header class="header">
      <div class="container">
        <h1 class="logo">Rowley Recipes</h1>
        <nav class="nav">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/recipes" class="nav-link">Recipes</NuxtLink>
        </nav>
      </div>
    </header>
    
    <main class="main">
      <slot />
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} Rowley Recipes. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
@use '../assets/scss/_mixins.scss' as *;

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--color-secondary);
  color: var(--color-background);
  padding: var(--spacing-md) 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .container {
    @include flex-between;
  }

  .logo {
    font-size: var(--font-size-h3);
    margin: 0;
    color: var(--color-background);
  }

  .nav {
    display: flex;
    gap: var(--spacing-lg);

    .nav-link {
      color: var(--color-background);
      font-weight: var(--font-weight-medium);
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.main {
  flex: 1;
  padding: var(--spacing-xl) 0;
}

.footer {
  background-color: var(--color-background-alt);
  padding: var(--spacing-lg) 0;
  margin-top: auto;
  border-top: 1px solid var(--color-border);

  p {
    text-align: center;
    color: var(--color-text-light);
    font-size: var(--font-size-small);
    margin: 0;
  }
}

.container {
  @include container;
}
</style>

