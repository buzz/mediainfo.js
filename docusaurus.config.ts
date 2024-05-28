import path from 'node:path'

import { themes as prismThemes } from 'prism-react-renderer'
import type { Config, ThemeConfig } from '@docusaurus/types'

import mediainfoPlugin from './plugins/mediainfoWasm'

const PROJECT_NAME = 'mediainfo.js'
const ORGANIZATION_NAME = 'buzz'
const GITHUB_LINK = `https://github.com/${ORGANIZATION_NAME}/${PROJECT_NAME}`
const SHORT_DESCRIPTION = 'Extract media file metadata in the browser using WebAssembly.'

const config: Config = {
  title: PROJECT_NAME,
  tagline: SHORT_DESCRIPTION,
  favicon: 'img/favicon.ico',
  url: 'https://mediainfo.js.org/',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: ORGANIZATION_NAME,
  projectName: PROJECT_NAME,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    image: 'img/mediainfo-social-card.jpg',
    metadata: [{ name: 'twitter:card', content: SHORT_DESCRIPTION }],
    navbar: {
      title: PROJECT_NAME,
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/api',
          label: 'API',
          position: 'left',
        },
        {
          to: '/demo',
          label: 'Demo',
          position: 'left',
        },
        {
          href: GITHUB_LINK,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Getting Started',
              to: '/docs/category/getting-started',
            },
            {
              label: 'API',
              to: '/api',
            },
          ],
        },
        {
          title: 'Misc',
          items: [
            {
              label: 'Demo',
              to: '/demo',
            },
            {
              label: 'License',
              to: '/license',
            },
            {
              label: 'Credits',
              to: '/credits',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/search?q=mediainfo.js',
            },
            {
              label: 'GitHub',
              href: GITHUB_LINK,
            },
            {
              label: 'MediaInfo',
              href: 'https://mediaarea.net/MediaInfo',
            },
          ],
        },
      ],
      copyright: `Copyleft <span class="flip-x">©</span> <a href="https://github.com/${ORGANIZATION_NAME}">${ORGANIZATION_NAME}</a> ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/buzz/mediainfo.js/tree/main/website/',
      },
    ],
    '@docusaurus/plugin-content-pages',
    [
      '@docusaurus/theme-classic',
      {
        customCss: './src/css/custom.css',
      },
    ],
    [
      'docusaurus-plugin-typedoc-api',
      {
        projectRoot: path.resolve(__dirname, '..', 'mediainfo.js'),
        packages: ['.'],
        changelogs: true,
        readmes: true,
      },
    ],
    mediainfoPlugin,
    process.env.NODE_ENV !== 'production' && '@docusaurus/plugin-debug',
    '@docusaurus/plugin-sitemap',
  ].filter(Boolean),
}

export default config
