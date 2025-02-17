// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import pluginVue from 'eslint-plugin-vue'

export default withNuxt(
  [
    {
      name: 'app/files-to-lint',
      files: ['**/*.{ts,mts,tsx,vue}'],
    },

    {
      name: 'app/files-to-ignore',
      ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    },

    ...pluginVue.configs['flat/essential'],
    {
      name: 'app/disable-multi-word-rule',
      rules: { 'vue/multi-word-component-names': 'off' },
      files: ['**/*.vue'],
    },
    {
      name: 'app/enforce-line-rules',
      rules: { 'no-multiple-empty-lines': ['error', { max: 1 }] },
    },
    {
      name: 'app/enforce-line-rules',
      rules: {
        'no-multiple-empty-lines': ['error', { max: 1 }],
        semi: ['error', 'never'],
      },
    },
    {
      name: 'app/custom-rules',
      files: ['**/*.{ts,mts,tsx,vue}'],
      rules: {
        semi: ['error', 'never'], // Desabilita o uso de ponto e vírgula
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // Limita linhas vazias consecutivas
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'return' }, // Linha em branco antes de return
        ],
        'eol-last': ['error', 'always'], // Garante uma linha vazia no final do arquivo
        '@typescript-eslint/no-explicit-any': 'off', // Ignora erro do any no TypeScript
      },
    },
  ]
)
