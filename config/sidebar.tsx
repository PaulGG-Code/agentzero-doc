import { Rocket, Book, Wrench } from 'lucide-react';

export const sidebarNav = [
  {
    title: 'Getting Started',
    icon: <Rocket className="h-5 w-5" />,
    defaultOpen: true,
    pages: [
      {
        title: 'Welcome',
        href: '/docs/readme',
      },
      {
        title: 'Quick Start',
        href: '/docs/quickstart',
      },
      {
        title: 'Installation',
        href: '/docs/installation',
      },
      {
        title: 'Usage Guide',
        href: '/docs/usage',
      },
    ],
  },
  {
    title: 'Guides',
    icon: <Book className="h-5 w-5" />,
    defaultOpen: false,
    pages: [
      {
        title: 'Architecture',
        href: '/docs/architecture',
      },
      {
        title: 'CUDA Docker Setup',
        href: '/docs/cuda_docker_setup',
      },
      {
        title: 'MCP Server Setup',
        href: '/docs/mcp_setup',
      },
      {
        title: 'Tunnel Feature',
        href: '/docs/tunnel',
      }
    ],
  },
  {
    title: 'Advanced',
    icon: <Wrench className="h-5 w-5" />,
    defaultOpen: false,
    pages: [
      {
        title: 'Troubleshooting',
        href: '/docs/troubleshooting',
      },
      {
        title: 'Contributing',
        href: '/docs/contribution',
      },
    ],
  },
];


