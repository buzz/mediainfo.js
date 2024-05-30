import postcssColorModFunction from 'postcss-color-mod-function'
import postcssEach from 'postcss-each'
import type { PluginModule } from '@docusaurus/types'

const postcss: PluginModule = () => ({
  name: 'postcss',
  configurePostCss(postcssOptions) {
    postcssOptions.plugins.push(postcssEach, postcssColorModFunction)
    return postcssOptions
  },
})

export default postcss
