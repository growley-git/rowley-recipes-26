<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Search recipes..."
        @input="handleSearch"
      />
      <button
        v-if="searchQuery"
        class="clear-button"
        @click="clearSearch"
        aria-label="Clear search"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const emit = defineEmits<{
  search: [query: string]
}>()

let debounceTimer: NodeJS.Timeout | null = null

const handleSearch = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    emit('search', searchQuery.value)
  }, 300)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/_mixins.scss' as *;

.search-bar {
  width: 100%;
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: var(--spacing-md);
    color: var(--color-text-light);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-xl) var(--spacing-md) 3rem;
    font-size: var(--font-size-base);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-background);
    color: var(--color-text);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 10%, transparent);
    }

    &::placeholder {
      color: var(--color-text-light);
    }
  }

  .clear-button {
    position: absolute;
    right: var(--spacing-md);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-light);
    padding: var(--spacing-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-text);
    }

    &:focus {
      outline: none;
    }
  }
}
</style>

