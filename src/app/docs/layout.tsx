// src/app/doc/layout.tsx
'use client';

import React, { ReactNode, Suspense } from 'react';
import Link from 'next/link';
import { allDocs } from 'contentlayer/generated';
import SearchDialog from '@/components/search-dialog';
import { sidebarNav } from 'config/sidebar';
import Image from 'next/image';
import {
  SidebarProvider,
  SidebarLayout,
  MainContent,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeaderLogo,
  SidebarHeaderTitle,
  UserAvatar,
  NestedLink,
} from '@/components/sidebar';
import { Github, Globe } from 'lucide-react';
import Header from '@/components/header';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ScrollToAnchor from '@/components/scroll-to-anchor';
import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/use-mounted';

export default function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isMounted = useMounted();

  return (
    <SidebarLayout>
      <SidebarProvider
        defaultOpen={isMobile ? false : true}
        defaultSide="left"
        defaultMaxWidth={280}
        showIconsOnCollapse={true}
      >
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderLogo
              logo={
                <>
                  {isMounted ? (
                    <Image
                      alt="logo"
                      className={'h-8 w-8'}
                      width={32}
                      height={32}
                      src={
                        theme === 'dark'
                          ? '/logos/agent-zero-logo.png'
                          : '/logos/agent-zero-light-logo.png'
                      }
                    />
                  ) : (
                    <div className="h-8 w-8" />
                  )}
                </>
              }
            />

            <Link href={'/'} className="flex flex-1 gap-3">
              <SidebarHeaderTitle>
                AGENT<span className="text-4xl">Z</span>ERO
              </SidebarHeaderTitle>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            {sidebarNav.map((section) => (
              <SidebarMenuItem
                isCollapsable={section.pages && section.pages.length > 0}
                key={section.title}
                label={section.title}
                icon={section.icon}
                defaultOpen={section.defaultOpen}
              >
                {section.pages?.map((page) => (
                  <NestedLink key={page.href} href={page.href}>
                    {page.title}
                  </NestedLink>
                ))}
              </SidebarMenuItem>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <UserAvatar>
              {
                <Image
                  alt="logo"
                  src={'/logos/author_logo.png'}
                  width={100}
                  height={100}
                />
              }
            </UserAvatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                PaulGG-Code
              </span>
            </div>
          </SidebarFooter>
        </Sidebar>
        <MainContent>
          <Header className="justify-between py-2">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold">Documentation</h1>
            </div>
            <div className="flex gap-2 items-center pr-0 lg:pr-8">
              <SearchDialog searchData={allDocs} />
              <ModeToggle />
              <Button
                onClick={() =>
                  window.open('https://www.agent-zero.ai/', '_blank')
                }
              >
                <Globe className="h-[1.2rem] w-[1.2rem] transition-all" />
              </Button>
              <Button
                onClick={() =>
                  window.open('https://github.com/frdel/agent-zero', '_blank')
                }
              >
                <Github className="h-[1.2rem] w-[1.2rem] transition-all" />
              </Button>
            </div>
          </Header>
            <Suspense>
              <ScrollToAnchor />
            </Suspense>
          <main className="overflow-auto p-6">{children}</main>
        </MainContent>
      </SidebarProvider>
    </SidebarLayout>
  );
}
