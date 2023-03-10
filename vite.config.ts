import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({
      presets: [presetAttributify(), presetUno()],

      // 二维数组写法
      // shortcuts: [
      //   ['wh-full','h-full w-full']
      // ]
      shortcuts: {
        'wh-full': 'w-full h-full',
        'flex-c': 'flex items-center justify-center'
      },
      theme: {
        colors: {
          bookbg: '#ece6d9',
          light: '#7f8c8d',
          gray: '#353b48',
          dark: '#2c3e50',
          active: '#2980b9',
          border: '#3498db80'
        }
      }
    })
  ],

  // 第二种写法
  // resolve: {
  //   alias: [
  //    {
  //        find:'@',
  //        replacement:path.resolve(__dirname,'src'),
  //    }
  //  ]
  // }
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.ts', '.css', '.scss', '.less']
  }
})
