import eslint from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const reactAppGlobs = [
  'apps/ops/**/*.{jsx,tsx}',
  'apps/saas/**/*.{jsx,tsx}',
  'packages/ui/**/*.{jsx,tsx}',
];

function scopeReactConfig(config) {
  return {
    ...config,
    files: config.files ?? reactAppGlobs,
  };
}

const flatReact = react.configs.flat.recommended;
const reactRecommended = Array.isArray(flatReact)
  ? flatReact.map(scopeReactConfig)
  : [scopeReactConfig(flatReact)];

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '.turbo/**',
      'pnpm-lock.yaml',
      'описание проекта.txt',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['repo.config.ts', 'apps/api/**/*.ts', 'packages/sdk/**/*.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ['apps/**/vite.config.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ['apps/ops/**/*.{ts,tsx}', 'apps/saas/**/*.{ts,tsx}', 'packages/ui/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  ...reactRecommended,
  {
    files: reactAppGlobs,
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: reactAppGlobs,
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      react: { version: 'detect' },
    },
  },
);
