import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    vue(),
    // 组件自动按需引入
    Components({
      dts: resolve(__dirname, 'src/components.d.ts'),
      resolvers: [NaiveUiResolver()]
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', 'vitest'],
      dts: resolve(__dirname, 'src/auto-import.d.ts')
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
          grayLight: '#ccc',
          gray: '#353b48',
          dark: '#2c3e50',
          active: '#2980b9',
          border: '#3498db',
          white: '#dfe6e9',
          error: '#e74c3c',
          navColor: '#e29c45',
          chapterHover: '#bb7c2e'
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
