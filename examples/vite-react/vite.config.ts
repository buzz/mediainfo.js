import path from 'path'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.join(
            import.meta.dirname,
            'node_modules',
            'mediainfo.js',
            'dist',
            'MediaInfoModule.wasm'
          ),
          dest: '',
        },
      ],
    }),
  ],
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // allow wasm file
        '../../dist/MediaInfoModule.wasm',
      ],
    },
  },
})
