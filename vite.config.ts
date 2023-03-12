import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [
    vue({
      include: ['/.vue$/', '/.md$/']
    }),
    AutoImport({
      vueTemplate: true,
      imports: ['vue', 'vue-router'],
      dts: path.resolve(pathSrc, './auto-import.d.ts')
    }),
    // 组件自动按需引入
    Components({
      dirs: ['src/components/'],
      dts: path.resolve(pathSrc, './components.d.ts'),
      extensions: ['vue']
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
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.ts', '.css', '.scss', '.less']
  }
})
