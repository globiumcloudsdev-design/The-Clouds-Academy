/**
 * Master Admin layout — fully responsive with mobile sidebar
 */
'use client';

import Link from 'next/link';
import { Menu, BellRing } from 'lucide-react';

import useUiStore from '@/store/uiStore';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function MasterAdminLayout({ children }) {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col md:ml-64 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </Button>

          <span className="flex-1 text-sm font-medium text-muted-foreground truncate">
            The Clouds Academy — Admin Panel
          </span>

          <ThemeToggle />

          <Link
            href="/master-admin/notifications"
            className="inline-flex items-center gap-2 rounded-lg border bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 dark:border-amber-500/30 dark:text-amber-400 px-3 py-1.5 text-xs font-semibold transition-colors"
            title="View Notifications"
          >
            <BellRing size={14} />
            View Notifications
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
