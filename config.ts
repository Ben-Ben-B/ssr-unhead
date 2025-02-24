import type { UserConfig } from 'ssr-types'
import { UnheadWebpack } from '@unhead/addons/webpack'

const userConfig: UserConfig = {

  viteConfig: () => {
    const UnheadVite = require('@unhead/addons/vite')
    return {
      client: {
        extraPlugin: [
          UnheadVite
        ]
      }
    }
  },
  chainBaseConfig: (chain) => {
    // const { UnheadWebpack } = require('@unhead/addons/webpack')
    chain.plugin('unheadWebpack').use(UnheadWebpack())
  }
}

export { userConfig }
