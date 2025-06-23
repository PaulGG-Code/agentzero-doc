import { Rocket, Book, Wrench } from 'lucide-react';

export const sidebarNav = [
  {
    title: 'navigation.gettingStarted',
    icon: <Rocket className="h-5 w-5" />,
    defaultOpen: true,
    pages: [
      {
        title: 'sidebar.welcome',
        href: '/docs/readme',
      },
      {
        title: 'sidebar.quickStart',
        href: '/docs/quickstart',
      },
      {
        title: 'sidebar.installation',
        href: '/docs/installation',
      },
      {
        title: 'sidebar.usageGuide',
        href: '/docs/usage',
      },
    ],
  },
  {
    title: 'navigation.guides',
    icon: <Book className="h-5 w-5" />,
    defaultOpen: false,
    pages: [
      {
        title: 'sidebar.architecture',
        href: '/docs/architecture',
      },
      {
        title: 'sidebar.cudaDockerSetup',
        href: '/docs/cuda_docker_setup',
      },
      {
        title: 'sidebar.mcpServerSetup',
        href: '/docs/mcp_setup',
      },
      {
        title: 'sidebar.tunnelFeature',
        href: '/docs/tunnel',
      },
    ],
  },
  {
    title: 'navigation.advanced',
    icon: <Wrench className="h-5 w-5" />,
    defaultOpen: false,
    pages: [
      {
        title: 'sidebar.troubleshooting',
        href: '/docs/troubleshooting',
      },
      {
        title: 'sidebar.contributing',
        href: '/docs/contribution',
      },
    ],
  },
];
