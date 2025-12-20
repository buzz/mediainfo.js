import react from '@vitejs/plugin-react'
import { defineConfig, searchForWorkspaceRoot, type Plugin } from 'vite'

// Vite warns about mediainfo.js's generated `new URL('MediaInfoModule.wasm', import.meta.url)`.
// We fix the warning by rewriting the
function fixMediainfoWasmImportMetaUrl(): Plugin {
  return {
    name: 'fix-mediainfo-wasm-import-meta-url',
    enforce: 'pre',
    transform(code, id) {
      const normalizedId = id.split('?')[0].replace(/\\/g, '/')

      const isMediaInfoWasmFallback =
        normalizedId.endsWith('/dist/esm/MediaInfoModule.js') ||
        normalizedId.endsWith('/dist/esm-bundle/index.js')

      if (!isMediaInfoWasmFallback) {
        return
      }

      const fixedCode = code.replace(
        /new URL\((['"])MediaInfoModule\.wasm\1,\s*import\.meta\.url\)\.href/g,
        "new URL('../MediaInfoModule.wasm', import.meta.url).href"
      )

      if (fixedCode === code) {
        return
      }

      return {
        code: fixedCode,
        map: null,
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [fixMediainfoWasmImportMetaUrl(), react()],
  server: {
    fs: {
      // allow linked package files in monorepos
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
})
