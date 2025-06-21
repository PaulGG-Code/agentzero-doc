'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import clsx from 'clsx';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  side: 'left' | 'right';
  isMobile: boolean;
  maxWidth: number;
  toggleSidebar: () => void;
  showIconsOnCollapse: boolean;
  logo?: React.ReactNode;
  className?: string;
};

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
}

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  defaultSide?: 'left' | 'right';
  defaultMaxWidth?: number;
  showIconsOnCollapse?: boolean;
  mobileView?: boolean;
}

export function SidebarProvider({
  defaultOpen = true,
  defaultSide = 'left',
  defaultMaxWidth = 280,
  showIconsOnCollapse = true,
  mobileView = true,
  ...props
}: SidebarProviderProps) {
  const useMobile = useIsMobile();

  const isMobile = mobileView ? useMobile : false;

  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [side] = React.useState<'left' | 'right'>(defaultSide);
  const [maxWidth] = React.useState(defaultMaxWidth);

  const toggleSidebar = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Add keyboard shortcut (Ctrl+B) to toggle sidebar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      side,
      isMobile,
      maxWidth,
      toggleSidebar,
      showIconsOnCollapse,
    }),
    [
      isOpen,
      setIsOpen,
      side,
      isMobile,
      maxWidth,
      toggleSidebar,
      showIconsOnCollapse,
    ]
  );

  return <SidebarContext.Provider value={contextValue} {...props} />;
}

// For enabling multiple sidebars in a layout
export function SidebarLayout({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex min-h-screen w-full', className)} {...props} />
  );
}

// Component for main content between sidebars
export function MainContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col h-screen overflow-auto w-full', className)}
      {...props}
    />
  );
}

export function Sidebar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { isOpen, side, isMobile, maxWidth, setIsOpen, showIconsOnCollapse } =
    useSidebar();

  // For mobile: use a fixed overlay when sidebar is open
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <aside
          className={cn(
            `
            fixed top-0 bottom-0 z-50 flex flex-col
            ${side === 'left' ? 'left-0' : 'right-0'}
            ${isOpen ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'}
            w-[85vw] max-w-[300px] bg-white dark:bg-gray-900 
            ${side === 'left' ? 'border-r' : 'border-l'} border-border
            transition-transform duration-300 ease-in-out
          `,
            className
          )}
          style={{ maxWidth: `${maxWidth}px` }}
          {...props}
        >
          {children}
        </aside>
      </>
    );
  }

  // For desktop: use a fixed sidebar
  return (
    <aside
      className={clsx(
        `
        sticky top-0 bottom-0 z-0 flex flex-col h-screen
        ${side === 'left' ? 'left-0 border-r' : 'right-0 border-l'} border-border
        transition-all duration-300 ease-in-out
        bg-sidebar
      `,
        className
      )}
      style={{
        minWidth: isOpen ? `${maxWidth}px` : showIconsOnCollapse ? '4rem' : '0',
        width: !isOpen
          ? showIconsOnCollapse
            ? `${maxWidth / 4}px`
            : '0'
          : '0px',
      }}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, showIconsOnCollapse } = useSidebar();

  // Extract the first child to show as icon when collapsed
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];

  return (
    <div
      className={cn(
        `
        flex items-center h-16 gap-2 border-b ${isOpen ? 'px-8' : ''} border-border
        ${isOpen ? '' : 'justify-center'}
      `,
        className
      )}
      {...props}
    >
      {isOpen
        ? children
        : showIconsOnCollapse && firstChild
          ? firstChild
          : null}
    </div>
  );
}

export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, showIconsOnCollapse } = useSidebar();
  return isOpen || showIconsOnCollapse ? (
    <div
      className={cn('flex-1 overflow-auto px-3 py-2', className)}
      {...props}
    />
  ) : null;
}

export function SidebarFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, showIconsOnCollapse } = useSidebar();

  // Extract the first child to show as icon when collapsed
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];

  return (
    <div
      className={cn(
        `
        flex items-center h-16 border-t gap-2 ${isOpen ? 'px-4' : ''} border-border
        ${isOpen ? '' : 'justify-center'}
      `,
        className
      )}
      {...props}
    >
      {isOpen
        ? children
        : showIconsOnCollapse && firstChild
          ? firstChild
          : null}
    </div>
  );
}

export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, showIconsOnCollapse } = useSidebar();
  return isOpen || showIconsOnCollapse ? (
    <nav className={cn('space-y-1 px-2', className)} {...props} />
  ) : null;
}

interface SidebarMenuItemProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  children?: React.ReactNode;
  isActive?: boolean;
  defaultOpen?: boolean;
  alwaysOpen?: boolean;
  isCollapsable?: boolean;
  className?: string;
}

export function SidebarMenuItem({
  icon,
  label,
  href,
  children,
  isActive: propIsActive,
  defaultOpen = false,
  alwaysOpen = false,
  isCollapsable = false,
  className,
  ...props
}: SidebarMenuItemProps) {
  const { isOpen, isMobile, setIsOpen } = useSidebar();
  const [isExpanded, setIsExpanded] = React.useState(defaultOpen || alwaysOpen);
  const pathname = usePathname();

  // Determine if this item is active based on the current path
  const isActive =
    propIsActive !== undefined
      ? propIsActive
      : href
        ? pathname === href || pathname.startsWith(href)
        : false;

  React.useEffect(() => {
    // If alwaysOpen is true, ensure the menu stays open
    if (alwaysOpen) {
      setIsExpanded(true);
    }
  }, [alwaysOpen]);

  const handleClick = (e: React.MouseEvent) => {
    if (children && !href && !alwaysOpen) {
      e.preventDefault();
      setIsExpanded((prev) => !prev);
    }
    // Close the sidebar if in mobile view when a link is clicked
    if (isMobile && href) {
      setIsOpen(false); // Close the sidebar
    }
  };

  const toggleOpen = () => {
    if (isCollapsable) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn('w-full', className)}
      {...props}
    >
      <button
        onClick={toggleOpen}
        className={cn(
          'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-active hover:text-sidebar-active-foreground',
          isCollapsable && 'cursor-pointer',
          !isCollapsable && 'cursor-default'
        )}
      >
        {icon && <span className="h-4 w-4">{icon}</span>}
        <span className="flex-1 text-left">{label}</span>
        {isCollapsable && (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-4 w-4"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        )}
      </button>
      <AnimatePresence>
        {isExpanded && isCollapsable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-2 space-y-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function NestedLink({
  children,
  href = '#',
  isActive: propIsActive,
}: {
  children: React.ReactNode;
  href?: string;
  isActive?: boolean;
}) {
  const pathname = usePathname();
  const { isMobile, setIsOpen } = useSidebar();

  // Determine if this link is active based on the current path
  const isActive =
    propIsActive !== undefined
      ? propIsActive
      : pathname === href || pathname.startsWith(href);
  const handleClick = () => {
    // Close the sidebar if in mobile view when a link is clicked
    if (isMobile && href) {
      setIsOpen(false); // Close the sidebar
    }
  };
  return (
    <Link
      href={href}
      className={`
        block py-1 px-2 rounded-md text-sm
        ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'}
      `}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar, side, isOpen } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        'p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700',
        className
      )}
    >
      {side === 'left' && !isOpen ? (
        <Menu />
      ) : side === 'left' && isOpen ? (
        <ChevronLeft />
      ) : side === 'right' && !isOpen ? (
        <Menu />
      ) : (
        <ChevronRight />
      )}
    </button>
  );
}

export function SidebarHeaderLogo({
  logo,
  className,
}: {
  logo?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'h-10 w-10 flex items-center justify-center truncate',
        className
      )}
    >
      {logo}
    </div>
  );
}

export function SidebarHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadElement>) {
  return (
    <h1
      className={cn(
        'text-3xl font-stretch-110% -tracking-tighter text-black dark:text-white truncate',
        className
      )}
      {...props}
    />
  );
}

export function UserAvatar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'h-8 w-8 rounded-full flex items-center justify-center',
        className
      )}
      {...props}
    />
  );
}
