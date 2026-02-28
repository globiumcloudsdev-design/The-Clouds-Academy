'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { masterAdminService } from '@/services';
import {
  PageHeader,
  DataTable,
  StatusBadge,
  AvatarWithInitials,
} from '@/components/common';
import { Badge } from '@/components/ui/badge';

// ─── API ──────────────────────────────────────────────────
const fetchUsers = ({ page, search }) =>
  masterAdminService.getUsers({ page, limit: 20, search: search || undefined });

// ─── Columns ──────────────────────────────────────────────
const COLUMNS = [
  {
    id: 'user',
    header: 'User',
    cell: ({ row }) => {
      const u = row.original;
      return (
        <div className="flex items-center gap-3">
          <AvatarWithInitials
            src={u.photo_url}
            firstName={u.first_name}
            lastName={u.last_name}
            size="sm"
          />
          <div>
            <p className="font-medium text-sm leading-tight">
              {u.first_name} {u.last_name}
            </p>
            <p className="text-xs text-muted-foreground">{u.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'school',
    header: 'School',
    cell: ({ row }) => <span className="text-sm">{row.original.school?.name ?? '—'}</span>,
  },
  {
    id: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.original.role?.name ?? row.original.role_code;
      return role ? <Badge variant="secondary" className="text-xs">{role}</Badge> : '—';
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ getValue }) => <span className="text-sm">{getValue() ?? '—'}</span>,
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ getValue }) => (
      <StatusBadge status={getValue() ? 'active' : 'inactive'} />
    ),
  },
  {
    id: 'joined',
    header: 'Joined',
    cell: ({ row }) => {
      const d = row.original.createdAt;
      return d ? <span className="text-sm text-muted-foreground">{new Date(d).toLocaleDateString()}</span> : '—';
    },
  },
];

// ─── Page ─────────────────────────────────────────────────
export default function MasterUsersPage() {
  const [page,   setPage]   = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['master-users', page, search],
    queryFn:  () => fetchUsers({ page, search }),
  });

  const users      = data?.data?.rows ?? data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Users"
        description="All registered users across every school on the platform"
      />

      <DataTable
        columns={COLUMNS}
        data={users}
        loading={isLoading}
        emptyMessage="No users found"
        search={search}
        onSearch={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Search by name or email…"
        pagination={{ page, totalPages, onPageChange: setPage }}
      />
    </div>
  );
}
