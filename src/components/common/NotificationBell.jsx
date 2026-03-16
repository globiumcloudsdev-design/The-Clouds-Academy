/**
 * NotificationBell — Bell icon with unread count badge
 * ─────────────────────────────────────────────────────────────────
 * Connects to uiStore for unread count.
 * Clicking opens a simple notification dropdown (extend later).
 *
 * Props:
 *   onClick  () => void   optional click override
 *
 * Usage:
 *   <NotificationBell />
 */
'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useUiStore from '@/store/uiStore';

import { useRouter } from 'next/navigation';

export default function NotificationBell({ onClick }) {
  const router = useRouter();
  const unreadCount = useUiStore((s) => s.unreadCount);

  const handleClick = onClick || (() => router.push('/master-admin/notifications'));


  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={handleClick}
      aria-label="Notifications"
    >
      <Bell size={18} />
      {unreadCount > 0 && (
        <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Button>
  );
}
