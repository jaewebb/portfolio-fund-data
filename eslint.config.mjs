import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      'comma-dangle': ['error', {
        'arrays': 'always',
        'objects': 'always',
        'exports': 'never',
        'functions': 'never',
        'imports': 'never'
      }],
      'eol-last': ['error', 'always'],
      'max-len': ['error', { 'code': 125, 'comments': 125 }],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['warn', 'always'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never']
    }
  })
]

export default eslintConfig
