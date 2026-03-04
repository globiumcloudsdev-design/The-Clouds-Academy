'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

import { roleService } from '@/services';
import { PERMISSIONS } from '@/constants';
import {
  PageHeader, DataTable,
  StatusBadge, TableRowActions,
  ConfirmDialog, AppModal,
} from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// ── Permission groups (built from PERMISSIONS constant) ─────────────────
const PERMISSION_GROUPS = [
  {
    label: 'Students',
    perms: [
      PERMISSIONS.STUDENT_CREATE, PERMISSIONS.STUDENT_READ,
      PERMISSIONS.STUDENT_UPDATE, PERMISSIONS.STUDENT_DELETE,
      PERMISSIONS.STUDENT_EXPORT,
    ],
  },
  {
    label: 'Admissions',
    perms: [
      PERMISSIONS.ADMISSION_CREATE, PERMISSIONS.ADMISSION_READ,
      PERMISSIONS.ADMISSION_UPDATE, PERMISSIONS.ADMISSION_DELETE,
      PERMISSIONS.ADMISSION_APPROVE,
    ],
  },
  {
    label: 'Parents',
    perms: [
      PERMISSIONS.PARENT_CREATE, PERMISSIONS.PARENT_READ,
      PERMISSIONS.PARENT_UPDATE, PERMISSIONS.PARENT_DELETE,
    ],
  },
  {
    label: 'Teachers',
    perms: [
      PERMISSIONS.TEACHER_CREATE, PERMISSIONS.TEACHER_READ,
      PERMISSIONS.TEACHER_UPDATE, PERMISSIONS.TEACHER_DELETE,
    ],
  },
  {
    label: 'Academics',
    perms: [
      PERMISSIONS.CLASS_CREATE,   PERMISSIONS.CLASS_READ,
      PERMISSIONS.CLASS_UPDATE,   PERMISSIONS.CLASS_DELETE,
      PERMISSIONS.SECTION_CREATE, PERMISSIONS.SECTION_READ,
      PERMISSIONS.SECTION_UPDATE, PERMISSIONS.SECTION_DELETE,
      PERMISSIONS.SUBJECT_CREATE, PERMISSIONS.SUBJECT_READ,
      PERMISSIONS.SUBJECT_UPDATE, PERMISSIONS.SUBJECT_DELETE,
      PERMISSIONS.TIMETABLE_CREATE, PERMISSIONS.TIMETABLE_READ,
      PERMISSIONS.TIMETABLE_UPDATE, PERMISSIONS.TIMETABLE_DELETE,
    ],
  },
  {
    label: 'Attendance',
    perms: [
      PERMISSIONS.ATTENDANCE_CREATE, PERMISSIONS.ATTENDANCE_READ,
      PERMISSIONS.ATTENDANCE_UPDATE, PERMISSIONS.ATTENDANCE_EXPORT,
    ],
  },
  {
    label: 'Finance',
    perms: [
      PERMISSIONS.FEE_CREATE,    PERMISSIONS.FEE_READ,
      PERMISSIONS.FEE_UPDATE,    PERMISSIONS.FEE_DELETE,
      PERMISSIONS.FEE_COLLECT,   PERMISSIONS.FEE_REFUND,
      PERMISSIONS.FEE_EXPORT,
      PERMISSIONS.FEE_TEMPLATE_CREATE, PERMISSIONS.FEE_TEMPLATE_READ,
      PERMISSIONS.FEE_TEMPLATE_UPDATE, PERMISSIONS.FEE_TEMPLATE_DELETE,
      PERMISSIONS.FEE_TEMPLATE_ASSIGN,
    ],
  },
  {
    label: 'Exams',
    perms: [
      PERMISSIONS.EXAM_CREATE, PERMISSIONS.EXAM_READ,
      PERMISSIONS.EXAM_UPDATE, PERMISSIONS.EXAM_DELETE,
      PERMISSIONS.EXAM_PUBLISH,
    ],
  },
  {
    label: 'HR & Payroll',
    perms: [
      PERMISSIONS.PAYROLL_READ,     PERMISSIONS.PAYROLL_CREATE,
      PERMISSIONS.PAYROLL_UPDATE,   PERMISSIONS.PAYROLL_DELETE,
      PERMISSIONS.PAYROLL_GENERATE, PERMISSIONS.PAYROLL_EXPORT,
      PERMISSIONS.LEAVE_READ,       PERMISSIONS.LEAVE_CREATE,
      PERMISSIONS.LEAVE_APPROVE,
    ],
  },
  {
    label: 'Communication',
    perms: [
      PERMISSIONS.NOTICE_CREATE,     PERMISSIONS.NOTICE_READ,
      PERMISSIONS.NOTICE_UPDATE,     PERMISSIONS.NOTICE_DELETE,
      PERMISSIONS.NOTIFICATION_SEND,
    ],
  },
  {
    label: 'Reports',
    perms: [
      PERMISSIONS.REPORT_FINANCIAL,  PERMISSIONS.REPORT_ATTENDANCE,
      PERMISSIONS.REPORT_STUDENT,    PERMISSIONS.REPORT_EXAM,
      PERMISSIONS.REPORT_SALARY,     PERMISSIONS.REPORT_EXPORT,
    ],
  },
  {
    label: 'Admin',
    perms: [
      PERMISSIONS.ROLE_CREATE,  PERMISSIONS.ROLE_READ,
      PERMISSIONS.ROLE_UPDATE,  PERMISSIONS.ROLE_DELETE,
      PERMISSIONS.ROLE_ASSIGN,
      PERMISSIONS.USER_CREATE,  PERMISSIONS.USER_READ,
      PERMISSIONS.USER_UPDATE,  PERMISSIONS.USER_DELETE,
      PERMISSIONS.ACADEMIC_YEAR_CREATE, PERMISSIONS.ACADEMIC_YEAR_READ,
      PERMISSIONS.ACADEMIC_YEAR_UPDATE, PERMISSIONS.ACADEMIC_YEAR_DELETE,
      PERMISSIONS.SCHOOL_UPDATE,   PERMISSIONS.SCHOOL_SETTINGS,
      PERMISSIONS.SCHOOL_ASSIGN_ROLE,
      PERMISSIONS.BRANCH_CREATE, PERMISSIONS.BRANCH_READ,
      PERMISSIONS.BRANCH_UPDATE, PERMISSIONS.BRANCH_DELETE,
    ],
  },
];

const ALL_PERMISSIONS_FLAT = PERMISSION_GROUPS.flatMap((g) => g.perms);

// Pretty label: "student.create" → "Create"
const permLabel = (p) =>
  p.split('.').pop().replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// ── Columns ─────────────────────────────────────────────
const buildColumns = (onEdit, onDelete) => [
  {
    id: 'role',
    header: 'Role Name',
    cell: ({ row }) => {
      const r = row.original;
      return (
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-muted-foreground shrink-0" />
          <div>
            <p className="font-semibold text-sm">{r.name}</p>
            <p className="text-xs font-mono text-muted-foreground">{r.code}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'permissions',
    header: 'Permissions',
    cell: ({ row }) => {
      const count = row.original.permissions?.length ?? 0;
      return (
        <Badge variant="secondary" className="text-xs">
          {count} permission{count !== 1 ? 's' : ''}
        </Badge>
      );
    },
  },
  {
    id: 'type',
    header: 'Type',
    cell: ({ row }) => (
      row.original.is_system
        ? <Badge className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-100">System</Badge>
        : <Badge variant="outline" className="text-xs">Custom</Badge>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge status={row.original.is_active !== false ? 'active' : 'inactive'} />
    ),
  },
  {
    id: 'actions',
    header: '',
    enableHiding: false,
    cell: ({ row }) => {
      const r = row.original;
      return (
        <TableRowActions
          onEdit={() => onEdit(r)}
          onDelete={r.is_system ? undefined : () => onDelete(r)}
        />
      );
    },
  },
];

// ── Page ────────────────────────────────────────────────
export default function MasterRolesPage() {
  const qc = useQueryClient();

  const [mounted,      setMounted]      = useState(false);
  const [search,       setSearch]       = useState('');
  const [page,         setPage]         = useState(1);
  const [pageSize,     setPageSize]     = useState(10);
  const [createOpen,   setCreateOpen]   = useState(false);
  const [editTarget,   setEditTarget]   = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  // Reset to page 1 when search changes
  useEffect(() => { setPage(1); }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ['roles', page, pageSize, search],
    queryFn:  () => roleService.getAll({ page, limit: pageSize, search: search || undefined }),
  });

  const roles      = data?.data?.rows ?? data?.data ?? [];
  const totalCount = data?.data?.total ?? roles.length;
  const totalPages = (data?.data?.totalPages ?? Math.ceil(totalCount / pageSize)) || 1;

  const createMutation = useMutation({
    mutationFn: roleService.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['roles'] }); toast.success('Role created'); setCreateOpen(false); },
    onError:   (e) => toast.error(e?.response?.data?.message ?? 'Failed to create role'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => roleService.update(id, body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['roles'] }); toast.success('Role updated'); setEditTarget(null); },
    onError:   (e) => toast.error(e?.response?.data?.message ?? 'Failed to update role'),
  });

  const deleteMutation = useMutation({
    mutationFn: roleService.delete,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['roles'] }); toast.success('Role deleted'); setDeleteTarget(null); },
    onError:   (e) => toast.error(e?.response?.data?.message ?? 'Failed to delete role'),
  });

  const columns = buildColumns(
    (r) => setEditTarget(r),
    (r) => setDeleteTarget(r),
  );

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Roles"
        description="Manage system roles and their permissions"
        action={
          <Button onClick={() => setCreateOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Add Role
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={roles}
        loading={isLoading}
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search roles…"
        enableColumnVisibility
        exportConfig={{ fileName: 'roles' }}
        pagination={{
          page,
          totalPages,
          total:            totalCount,
          pageSize,
          onPageChange:     setPage,
          onPageSizeChange: (s) => { setPageSize(s); setPage(1); },
        }}
      />

      {/* Create modal */}
      <AppModal open={createOpen} onClose={() => setCreateOpen(false)} title="Add Role" size="lg">
        <RoleForm
          onSubmit={(body) => createMutation.mutate(body)}
          onCancel={() => setCreateOpen(false)}
          isLoading={createMutation.isPending}
        />
      </AppModal>

      {/* Edit modal */}
      <AppModal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Role" size="lg">
        <RoleForm
          defaultValues={editTarget}
          onSubmit={(body) => updateMutation.mutate({ id: editTarget.id, body })}
          onCancel={() => setEditTarget(null)}
          isLoading={updateMutation.isPending}
        />
      </AppModal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Role"
        description={`Delete role "${deleteTarget?.name}"? Users assigned this role will lose their access.`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ── Role Form ────────────────────────────────────────────
function RoleForm({ defaultValues, onSubmit, onCancel, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name:        defaultValues?.name        ?? '',
      code:        defaultValues?.code        ?? '',
      description: defaultValues?.description ?? '',
    },
  });

  // Permissions are managed as local state (array of strings)
  const [selected, setSelected] = useState(defaultValues?.permissions ?? []);

  const toggle = (perm) =>
    setSelected((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm],
    );

  const toggleGroup = (perms) => {
    const allOn = perms.every((p) => selected.includes(p));
    if (allOn) {
      setSelected((prev) => prev.filter((p) => !perms.includes(p)));
    } else {
      setSelected((prev) => [...new Set([...prev, ...perms])]);
    }
  };

  const selectAll = () => setSelected([...ALL_PERMISSIONS_FLAT]);
  const clearAll  = () => setSelected([]);

  const onFormSubmit = (data) => {
    onSubmit({
      ...data,
      code:        data.code.toUpperCase().replace(/\s+/g, '_'),
      permissions: selected,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5 py-1">
      {/* Basic info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Role Name <span className="text-destructive">*</span></Label>
          <Input
            {...register('name', { required: 'Required' })}
            placeholder="e.g. Exam Officer"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Code <span className="text-destructive">*</span></Label>
          <Input
            {...register('code', { required: 'Required' })}
            placeholder="e.g. EXAM_OFFICER"
            className="font-mono uppercase"
          />
          {errors.code && <p className="text-xs text-destructive">{errors.code.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Description</Label>
        <Textarea
          {...register('description')}
          placeholder="Brief description of this role's responsibilities…"
          rows={2}
          className="resize-none"
        />
      </div>

      {/* Permissions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Permissions</Label>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={selectAll}>
              Select All
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={clearAll}>
              Clear
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[40vh] rounded-lg border">
          <div className="divide-y">
          {PERMISSION_GROUPS.map((group) => {
            const allOn  = group.perms.every((p) => selected.includes(p));
            const someOn = !allOn && group.perms.some((p) => selected.includes(p));
            return (
              <div key={group.label} className="p-3">
                {/* Group header */}
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    id={`group-${group.label}`}
                    checked={allOn ? true : someOn ? 'indeterminate' : false}
                    onCheckedChange={() => toggleGroup(group.perms)}
                  />
                  <label
                    htmlFor={`group-${group.label}`}
                    className="text-sm font-semibold cursor-pointer select-none"
                  >
                    {group.label}
                  </label>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {group.perms.filter((p) => selected.includes(p)).length}/{group.perms.length}
                  </span>
                </div>

                {/* Individual permissions */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 pl-6">
                  {group.perms.map((perm) => (
                    <label
                      key={perm}
                      className={cn(
                        'flex items-center gap-1.5 text-xs cursor-pointer select-none',
                        selected.includes(perm) ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      <Checkbox
                        checked={selected.includes(perm)}
                        onCheckedChange={() => toggle(perm)}
                        className="h-3.5 w-3.5"
                      />
                      {permLabel(perm)}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
          </div>
        </ScrollArea>

        <p className="text-xs text-muted-foreground">
          {selected.length} of {ALL_PERMISSIONS_FLAT.length} permissions selected
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? 'Saving…' : 'Save Role'}
        </Button>
      </div>
    </form>
  );
}
