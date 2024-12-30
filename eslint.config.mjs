import { FlatCompat } from '@eslint/eslintrc'
import love from 'eslint-config-love'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  love,
  ...compat.config({
    extends: ['prettier', 'plugin:tailwindcss/recommended', 'next']
  })
]

export default eslintConfig
