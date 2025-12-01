import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CentralAuth Docs',
  tagline: 'Documentation for CentralAuth',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.centralauth.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    }
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/'
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'CentralAuth',
      logo: {
        alt: 'CentralAuth Logo',
        src: 'img/logo_round.svg',
      },
      items: [
        {
          to: 'https://centralauth.com',
          label: 'Home',
          position: 'left'
        },
        {
          to: 'https://centralauth.com/dashboard',
          label: 'Dashboard',
          position: 'left',
        },
        {
          to: 'https://centralauth.com/api_doc',
          label: 'API explorer',
          position: 'left',
        },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} CentralAuth`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php', 'typescript', 'javascript', 'bash', 'json'],
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'WRSUITCLK4',

      // Public API key: it is safe to commit it
      apiKey: 'b91b57ee666aedb7ba01fafc38151fdf',

      //AI assistant ID
      // askAi: "56Y8hJR9dcNO",

      indexName: 'centralauth',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
