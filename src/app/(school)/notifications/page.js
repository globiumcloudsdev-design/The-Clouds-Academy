'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, BellOff, Eye, Trash2, CheckCircle2, Clock, Mail, AlertCircle, Info, DollarSign, Calendar, FileText } from "lucide-react";
import { toast } from 'sonner';

import { notificationService } from '@/services';
import { PageHeader, DataTable, StatsCard, TableRowActions, ConfirmDialog, StatusBadge } from '@/components/common';
import { cn } from '@/lib/utils';

const fmtDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

const TYPE_CONFIG = {
  fee:        { icon: DollarSign,  color: 'text-emerald-700 bg-emerald-50 border-emerald-200', label: 'Fee' },
  exam:       { icon: FileText,    color: 'text-blue-700 bg-blue-50 border-blue-200', label: 'Exam' },
  notice:     { icon: Bell,        color: 'text-purple-700 bg-purple-50 border-purple-200', label: 'Notice' },
  payroll:    { icon: DollarSign,  color: 'text-amber-700 bg-amber-50 border-amber-200', label: 'Payroll' },
  attendance: { icon: Calendar,    color: 'text-orange-700 bg-orange-50 border-orange-200', label: 'Attendance' },
  admission:  { icon: Mail,        color: 'text-green-700 bg-green-50 border-green-200', label: 'Admission' },
  leave:      { icon: Clock,       color: 'text-sky-700 bg-sky-50 border-sky-200', label: 'Leave' },
  system:     { icon: Info,        color: 'text-slate-700 bg-slate-100 border-slate-300', label: 'System' },
  alert:      { icon: AlertCircle, color: 'text-red-700 bg-red-50 border-red-200', label: 'Alert' },
  default:    { icon: Info,        color: 'text-gray-700 bg-gray-50 border-gray-200', label: 'General' }
};

function TypeBadge({ type }) {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.default;
  const Icon = cfg.icon;
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold uppercase', cfg.color)}>
      <Icon size={10} />
      {cfg.label}
    </span>
  );
}

function ReadStatusBadge({ isRead }) {
  return isRead ? (
    <StatusBadge status="read" label="Read" />
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold text-blue-700 bg-blue-50 border-blue-200">
      <BellOff size={10} /> Unread
    </span>
  );
}

function buildColumns(onMarkRead, onDelete) {
  return [
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => <TypeBadge type={row.original.type} />,
      size: 120
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ getValue }) => (
        <span className="font-medium text-slate-800 line-clamp-1 max-w-[280px]\">{getValue()}</span>
      ),
    },
    {
      accessorKey: 'message',
      header: 'Message',
      cell: ({ getValue }) => (
        <span className="text-sm text-slate-600 line-clamp-2 max-w-[400px]\">{getValue()}</span>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Date/Time',
      cell: ({ getValue }) => <span className="text-sm text-slate-600">{fmtDate(getValue())}</span>,
    },
    {
      accessorKey: 'is_read',
      header: 'Status',
      cell: ({ row }) => <ReadStatusBadge isRead={row.original.is_read} />,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const item = row.original;
        return (
          <TableRowActions
            onView={() => toast.info(`Notification: ${item.title}`)}
            onEdit={item.is_read ? null : () => onMarkRead(item.id)}
            editLabel={item.is_read ? null : 'Mark Read'}
            onDelete={() => onDelete(item)}
          />
        );
      },
    },
  ];
}

export default function NotificationsPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [readFilter, setReadFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [markAllDialog, setMarkAllDialog] = useState(false);

  // Queries
  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications', { page, pageSize, search, is_read: readFilter, type: typeFilter }],
    queryFn: () => notificationService.getAll({ page, limit: pageSize, search, is_read: readFilter, type: typeFilter }),
  });

  const { data: unreadCountData } = useQuery({
    queryKey: ['notifications-unread-count'],
    queryFn: () => notificationService.getUnreadCount(),
  });

  const notifications = notificationsData?.data?.rows ?? [];
  const totalPages = notificationsData?.data?.totalPages ?? 1;
  const total = notificationsData?.data?.total ?? 0;
  const unreadCount = unreadCountData?.data?.count ?? notifications.filter(n => !n.is_read).length;

  // Mutations
  const markReadMutation = useMutation({
    mutationFn: notificationService.markRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
      toast.success('Notification marked as read');
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
      toast.success('All notifications marked as read');
      setMarkAllDialog(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => notificationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification deleted');
      setDeleteTarget(null);
    },
  });

  const handleMarkAllRead = () => markAllReadMutation.mutate();

  const columns = useMemo(
    () => buildColumns(
      (id) => markReadMutation.mutate({ id }),
      setDeleteTarget
    ),
    [markReadMutation]
  );

  const readOptions = [
    { value: '', label: 'All Status' },
    { value: 'false', label: 'Unread' },
    { value: 'true', label: 'Read' },
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'fee', label: 'Fee' },
    { value: 'exam', label: 'Exam' },
    { value: 'notice', label: 'Notice' },
    { value: 'payroll', label: 'Payroll' },
    { value: 'attendance', label: 'Attendance' },
    { value: 'admission', label: 'Admission' },
    { value: 'leave', label: 'Leave' },
    { value: 'system', label: 'System' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Your notification inbox with unread alerts and messages"
        action={
          unreadCount > 0 && (
            <button
              onClick={() => setMarkAllDialog(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <BellOff size={14} />
              Mark All Read ({unreadCount})
            </button>
          )
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4  ">
        <StatsCard
          label="Total"
          value={total}
          icon={<Bell size={20} />}
          trend="stable"
        />
        <StatsCard
          label="Unread"
          value={unreadCount}
          icon={<BellOff size={20} />}
          trend="↑ 2 today"
          trendColor="text-orange-600"
        />
      </div>

      <DataTable
        data={notifications}
        columns={columns}
        loading={isLoading}
        emptyMessage="No notifications"
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search notifications..."
        filters={[
          {
            name: 'readFilter',
            label: 'Read Status',
            value: readFilter,
            onChange: (v) => { setReadFilter(v); setPage(1); },
            options: readOptions,
          },
          {
            name: 'typeFilter',
            label: 'Type',
            value: typeFilter,
            onChange: (v) => { setTypeFilter(v); setPage(1); },
            options: typeOptions,
          },
        ]}
        pagination={{
          page, totalPages, onPageChange: setPage, total, pageSize, onPageSizeChange: setPageSize
        }}
        enableColumnVisibility
        exportConfig={{
          filename: 'notifications',
          sheetName: 'Notifications Inbox',
          columns: [
            { key: 'title', label: 'Title' },
            { key: 'message', label: 'Message' },
            { key: 'type', label: 'Type' },
            { key: 'created_at', label: 'Date' },
            { key: 'is_read', label: 'Read Status' },
          ]
        }}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget)}
        loading={deleteMutation.isPending}
        title="Delete Notification"
        description="This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
      />

      <ConfirmDialog
        open={markAllDialog}
        onClose={() => setMarkAllDialog(false)}
        onConfirm={handleMarkAllRead}
        loading={markAllReadMutation.isPending}
        title="Mark All Read"
        description={`Mark all ${unreadCount} unread notifications as read?`}
        confirmLabel="Mark All Read"
      />
    </div>
  );
}

