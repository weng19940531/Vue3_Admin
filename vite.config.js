import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'

// reference: https://vitejs.cn/
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
