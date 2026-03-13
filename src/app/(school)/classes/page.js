
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Plus, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

import { classService, academicYearService, teacherService, branchService } from '@/services';
import useAuthStore from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { PERMISSIONS } from '@/constants';
import {
  PageHeader, DataTable,
  StatusBadge, TableRowActions, ConfirmDialog, AppModal,
} from '@/components/common';
import { ClassForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Badge }  from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const extractRows  = (d) => d?.data?.rows ?? d?.data ?? [];
const extractPages = (d) => d?.data?.totalPages ?? 1;
const toOptions    = (arr, labelFn) => (arr ?? []).map((x) => ({ value: x.id, label: labelFn(x) }));

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];

const normalizeClassPayload = (body, activeBranchId) => {
  const payload = {
    name: body.name?.trim(),
    academic_year_id: body.academic_year_id,
    grade_level: body.grade_level === '' || body.grade_level == null ? undefined : Number(body.grade_level),
    section: body.section?.trim() || undefined,
    capacity: body.capacity === '' || body.capacity == null ? undefined : Number(body.capacity),
    class_teacher_id: body.class_teacher_id || undefined,
    is_active: body.status === 'active',
    branch_id: body.branch_id || activeBranchId || undefined,
  };

  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
};

const buildColumns = (onEdit, onDelete, router) => [
  { accessorKey: 'name',        header: 'Class Name',  cell: ({ getValue }) => <span className="font-medium">{getValue()}</span> },
{ accessorKey: 'grade_level', header: 'Grade',       cell: ({ getValue }) => <Badge variant="secondary">{getValue() ?? '\u2014'}</Badge> },
  { accessorKey: 'section', header: 'Section', cell: ({ getValue }) => <Badge variant="outline">{getValue() ?? '—'}</Badge> },
  { accessorKey: 'capacity', header: 'Capacity', cell: ({ getValue }) => getValue() ?? '—' },
  { accessorKey: 'class_teacher_id', header: 'Class Teacher', cell: ({ row }) => row.original.class_teacher_name ?? row.original.class_teacher_id ?? 'None' },
  { id: 'sections', header: 'Sections', cell: ({ row }) => <span className="text-sm">{row.original.sections?.length ?? 0}</span> },
  { id: 'students', header: 'Students', cell: ({ row }) => <span className="text-sm">{row.original.student_count ?? 0}</span> },
  { accessorKey: 'is_active', header: 'Status', cell: ({ getValue }) => <StatusBadge status={getValue() !== false ? 'active' : 'inactive'} /> },
  {
    id: 'actions', header: '', enableHiding: false,
    cell: ({ row }) => {
      const c = row.original;
      return <TableRowActions onView={() => router.push(`/classes/${c.id}`)} onEdit={() => onEdit(c)} onDelete={onDelete ? () => onDelete(c) : undefined} />;
    },
  },
];

export default function ClassesPage() {
  const router = useRouter();
  const qc     = useQueryClient();

  const canCreate = useAuthStore((s) => s.canDo(PERMISSIONS.CLASS_CREATE));
  const canDelete = useAuthStore((s) => s.canDo(PERMISSIONS.CLASS_DELETE));
  const { activeBranchId } = useUIStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [createOpen, setCreateOpen]     = useState(false);
  const [editTarget, setEditTarget]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page,     setPage]     = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['classes', { page, pageSize, search, statusFilter, branch_id: activeBranchId }],
    queryFn:  () => classService.getAll({
      page,
      limit: pageSize,
      search: search || undefined,
      is_active: statusFilter || undefined,
      branch_id: activeBranchId || undefined,
    }),
  });

const { data: yearsData }   = useQuery({ queryKey: ['academic-years-all'], queryFn: () => academicYearService.getAll() });

  const { data: teachersData } = useQuery({
    queryKey: ['teachers', activeBranchId],
    queryFn: () => teacherService.getAll({ branch_id: activeBranchId, is_active: true, limit: 100 }),
  });

  const { data: branchesData } = useQuery({
    queryKey: ['branches'],
    queryFn: () => branchService.getAll(),
  });

  const classes             = extractRows(data);
  const totalPages          = extractPages(data);
  const total               = data?.data?.total ?? classes.length;
  const activeCount         = classes.filter((c) => c.is_active !== false).length;
  const inactiveCount       = classes.length - activeCount;
const academicYearOptions = toOptions(yearsData?.data ?? [], (y) => y.name);

  const teacherOptions = useMemo(() => toOptions(extractRows(teachersData), (t) => `${t.first_name || ''} ${t.last_name || ''}`.trim() || (t.employee_id || 'Unnamed')), [teachersData]);
  const branchOptions = useMemo(() => toOptions(extractRows(branchesData), (b) => b.name), [branchesData]);

  const createMutation = useMutation({
    mutationFn: classService.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['classes'] }); toast.success('Class created'); setCreateOpen(false); },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Failed'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => classService.update(id, body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['classes'] }); toast.success('Class updated'); setEditTarget(null); },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => classService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['classes'] }); toast.success('Class deleted'); setDeleteTarget(null); },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Failed'),
  });

  const columns = useMemo(
    () => buildColumns(setEditTarget, canDelete ? setDeleteTarget : null, router),
    [canDelete, router],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Classes"
        description="Manage classes and their sections"
        action={mounted && canCreate && (
          <Button onClick={() => setCreateOpen(true)}><Plus size={16} className="mr-2" /> Add Class</Button>
        )}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: 'Total Classes', value: total, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Active', value: activeCount, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Inactive', value: inactiveCount, bg: 'bg-red-50', color: 'text-red-500' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-4xl font-bold leading-none text-slate-900">{isLoading ? '—' : item.value}</p>
            </div>
            <div className={cn('rounded-lg p-2.5', item.bg)}>
              <BookOpen size={16} className={item.color} />
            </div>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={classes}
        loading={isLoading}
        emptyMessage="No classes yet"
        search={search}
        onSearch={(value) => { setSearch(value); setPage(1); }}
        searchPlaceholder="Search classes..."
        filters={[
          {
            name: 'status',
            label: 'Status',
            value: statusFilter,
            onChange: (value) => { setStatusFilter(value); setPage(1); },
            options: STATUS_OPTIONS,
          },
        ]}
        enableColumnVisibility
        pagination={{ page, totalPages, onPageChange: setPage, total, pageSize, onPageSizeChange: (s) => { setPageSize(s); setPage(1); } }}
        exportConfig={{ fileName: 'classes' }}
      />

      <AppModal open={createOpen} onClose={() => setCreateOpen(false)} title="Add New Class" size="md">
        <ClassForm
          onSubmit={(body) => {
            const payload = normalizeClassPayload(body, activeBranchId);
            if (!payload.name) {
              toast.error('Class name is required');
              return;
            }
            if (!payload.academic_year_id) {
              toast.error('Academic year is required');
              return;
            }
            createMutation.mutate(payload);
          }}
          onCancel={() => setCreateOpen(false)}
          loading={createMutation.isPending}
          academicYearOptions={academicYearOptions}
          branchOptions={branchOptions}
          teacherOptions={teacherOptions}
        />

      </AppModal>

      <AppModal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Class" size="md">
        <ClassForm
          defaultValues={editTarget ?? {}}
          onSubmit={(body) => {
            const payload = normalizeClassPayload(body, activeBranchId);
            if (!payload.name) {
              toast.error('Class name is required');
              return;
            }
            if (!payload.academic_year_id) {
              toast.error('Academic year is required');
              return;
            }
            updateMutation.mutate({ id: editTarget.id, body: payload });
          }}
          onCancel={() => setEditTarget(null)}
          loading={updateMutation.isPending}

          academicYearOptions={academicYearOptions}
          branchOptions={branchOptions}
          teacherOptions={teacherOptions}
          isEdit
        />

      </AppModal>

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => deleteMutation.mutate(deleteTarget)} loading={deleteMutation.isPending} title="Delete Class" description={`Delete class "${deleteTarget?.name}"?`} confirmLabel="Delete" variant="destructive" />
    </div>
  );
}
