// @ts-expect-error No declarations available
import postcssColorModFunction from 'postcss-color-mod-function'
// @ts-expect-error No declarations available
import postcssEach from 'postcss-each' // pinned to 0.10.0 for compatibility with postcss-color-mod-function
import type { PluginModule } from '@docusaurus/types'

const postcss: PluginModule = () => ({
  name: 'postcss',
  configurePostCss(postcssOptions) {
    postcssOptions.plugins.push(postcssEach, postcssColorModFunction)
    return postcssOptions
  },
})

export default postcss
