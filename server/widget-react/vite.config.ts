import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     postcss({
//       extract: true,
//       minimize: true,
//       to: './assets',
//     }),
//   ],
//   base: '',
//   build: {
//     emptyOutDir: false,
//     outDir: '../assets',
//     rollupOptions: {
//       input: './src/main.tsx',
//       output: {
//         entryFileNames: `index.js`,
//         assetFileNames: '[name][extname]',
//         chunkFileNames: '[name][extname]',
//         format: 'iife',
//         name: 'QueueWidget',
//         globals: {
//           react: 'React',
//           'react-dom': 'ReactDOM',
//         },
//       },
//     },
//   },
// });

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    emptyOutDir: false,
    outDir: '../assets',
    rollupOptions: {
      input: {
        main: './src/main.tsx',
      },
      output: {
        entryFileNames: `index.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        format: 'iife',
      },
    },
    cssCodeSplit: false,
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});
