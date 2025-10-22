import {defineConfig, globalIgnores} from 'eslint/config'
import nextPlugin from '@next/eslint-plugin-next'
import prettier from 'eslint-config-prettier/flat'

const eslintConfig = defineConfig([
  nextPlugin.configs['core-web-vitals', 'next-typescript'],
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      semi: ['error', 'never']
    }
  }
])

export default eslintConfig
