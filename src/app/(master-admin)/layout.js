/**
 * Master Admin layout — fully responsive with mobile sidebar
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Building2, Users, CreditCard,
  LogOut, FileText, Menu, X,
} from 'lucide-react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

import useAuthStore from '@/store/authStore';
import { authService } from '@/services';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/master-admin',                        label: 'Dashboard',       icon: LayoutDashboard },
  { href: '/master-admin/schools',                label: 'Schools',         icon: Building2       },
  { href: '/master-admin/subscriptions',          label: 'Subscriptions',   icon: CreditCard      },
  { href: '/master-admin/subscription-templates', label: 'Sub. Templates',  icon: FileText        },
  { href: '/master-admin/users',                  label: 'Users',           icon: Users           },
];

export default function MasterAdminLayout({ children }) {
  const pathname     = usePathname();
  const router       = useRouter();
  const logout       = useAuthStore((s) => s.logout);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try { await authService.logout(); } catch (_) {}
    logout();
    Cookies.remove('role_code');
    router.replace('/login');
    toast.success('Logged out');
  };

  return (
    <div className="flex min-h-screen bg-background">

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-56 flex-col bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))] transition-transform duration-200',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        {/* Logo + close (mobile only) */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <span className="font-bold text-sm">☁ Master Admin</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1.5 text-white/70 hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/master-admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-[hsl(var(--sidebar-accent))] text-white'
                    : 'text-white/70 hover:bg-[hsl(var(--sidebar-accent))] hover:text-white',
                )}
              >
                <Icon size={16} />{label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 border-t border-white/10 px-5 py-4 text-sm text-white/60 hover:text-white"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col md:ml-56 min-w-0">

        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background px-4 sm:px-6">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-medium text-muted-foreground truncate">
            The Clouds Academy — Admin Panel
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
