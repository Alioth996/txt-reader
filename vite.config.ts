import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      cache: true,
      resolvers: [], // ui框架自动按需引入
      imports: ['vue', 'vitest', '@vue/composition-api', 'vue-router'],
      dts: './auto-imports.d.ts'
    }),
    UnoCSS({
      presets: [presetAttributify({}), presetUno()],
      shortcuts: {
        'wh-full': 'w-full h-full',
        'h-vh': 'h-100vh',
        'w-vw': 'w-100vw',
        'flex-c': 'flex items-center justify-center'
      },
      theme: {
        colors: {
          bookbg: '#ece6d9', // 背景色
          light: '#7f8c8d',
          gray: '#353b48',
          dark: '#2c3e50',
          active: '#2980b9',
          border: '#3498db80',
          white: '#dfe6e9'
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.ts', '.css', '.scss', '.less']
  }
})
