// reference: https://vitejs.cn/

import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import Inspect from 'vite-plugin-inspect'

export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const { VITE_APP_TITLE, VITE_SERVER_HOST, VITE_SERVER_PORT } = env
  const https = Number(VITE_SERVER_PORT) === 443

  return {
    server: {
      host: VITE_SERVER_HOST,
      port: VITE_SERVER_PORT,
      https,
      open: true,
      strictPort: true
    },
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
            title: VITE_APP_TITLE
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
    },
    define: {
      MODE_IS_DEVELOPMENT: mode === 'development',
      MODE_IS_PRODUCTION: mode === 'production'
    }
  }
})
