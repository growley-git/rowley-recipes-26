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
@use '../assets/scss/_variables.scss' as *;
@use '../assets/scss/_mixins.scss' as *;

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: $secondary-color;
  color: $background;
  padding: $spacing-md 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .container {
    @include flex-between;
  }

  .logo {
    font-size: $font-size-h3;
    margin: 0;
    color: $background;
  }

  .nav {
    display: flex;
    gap: $spacing-lg;

    .nav-link {
      color: $background;
      font-weight: $font-weight-medium;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.main {
  flex: 1;
  padding: $spacing-xl 0;
}

.footer {
  background-color: $background-alt;
  padding: $spacing-lg 0;
  margin-top: auto;
  border-top: 1px solid $border-color;

  p {
    text-align: center;
    color: $text-light;
    font-size: $font-size-small;
    margin: 0;
  }
}

.container {
  @include container;
}
</style>

