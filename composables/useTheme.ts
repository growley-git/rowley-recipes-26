export type Theme = 'default' | 'dark' | 'warm' | 'minimal'

const themeValues: Record<Theme, Record<string, string>> = {
  default: {
    '--color-primary': '#42b883',
    '--color-secondary': '#35495e',
    '--color-accent': '#ff6b6b',
    '--color-text': '#2c3e50',
    '--color-text-light': '#7f8c8d',
    '--color-background': '#ffffff',
    '--color-background-alt': '#f8f9fa',
    '--color-border': '#e1e8ed'
  },
  dark: {
    '--color-primary': '#4ade80',
    '--color-secondary': '#1e293b',
    '--color-accent': '#f87171',
    '--color-text': '#e2e8f0',
    '--color-text-light': '#94a3b8',
    '--color-background': '#0f172a',
    '--color-background-alt': '#1e293b',
    '--color-border': '#334155'
  },
  warm: {
    '--color-primary': '#f97316',
    '--color-secondary': '#7c2d12',
    '--color-accent': '#dc2626',
    '--color-text': '#431407',
    '--color-text-light': '#9a3412',
    '--color-background': '#fff7ed',
    '--color-background-alt': '#ffedd5',
    '--color-border': '#fed7aa'
  },
  minimal: {
    '--color-primary': '#525252',
    '--color-secondary': '#171717',
    '--color-accent': '#737373',
    '--color-text': '#171717',
    '--color-text-light': '#737373',
    '--color-background': '#ffffff',
    '--color-background-alt': '#fafafa',
    '--color-border': '#e5e5e5'
  }
}

export const useTheme = () => {
  const currentTheme = useState<Theme>('theme', () => 'default')

  const setTheme = (theme: Theme) => {
    if (!process.client) return
    
    currentTheme.value = theme
    const root = document.documentElement
    const themeVars = themeValues[theme]
    
    // Apply all CSS variables to root
    Object.entries(themeVars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value)
    })

    // Store preference in localStorage
    localStorage.setItem('theme', theme)
  }

  const initTheme = () => {
    if (process.client) {
      // Load saved theme preference
      const savedTheme = localStorage.getItem('theme') as Theme | null
      if (savedTheme && ['default', 'dark', 'warm', 'minimal'].includes(savedTheme)) {
        setTheme(savedTheme)
      }
    }
  }

  return {
    currentTheme: readonly(currentTheme),
    setTheme,
    initTheme
  }
}
