// reference: https://vitejs.cn/

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import { title } from './src/app.config'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`
    },
    extensions: ['.js', '.vue']
  },
  plugins: [
    vue(),
    ElementPlus({ useSource: true }),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      directoryAsNamespace: true
    }),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.js',
      template: '/index.html',
      inject: {
        data: {
          title
        }
      }
    }),
    Inspect()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  }
})
