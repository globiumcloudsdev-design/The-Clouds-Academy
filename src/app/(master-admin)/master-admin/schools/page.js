'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { masterAdminService } from '@/services';
import {
  PageHeader,
  DataTable,
  StatusBadge,
  TableRowActions,
  ConfirmDialog,
  AppModal,
  InputField,
  CheckboxField,
  FormSubmitButton,
  ErrorAlert,
} from '@/components/common';
import { Button } from '@/components/ui/button';

// ─── API helpers ────────────────────────────────────────────
const fetchSchools = ({ page, search, is_active }) =>
  masterAdminService.getSchools({ page, limit: 20, search: search || undefined, is_active: is_active || undefined });
const createSchool       = (body)             => masterAdminService.createSchool(body);
const deleteSchool       = (id)               => masterAdminService.deleteSchool(id);
const toggleSchoolStatus = (id, is_active)    => masterAdminService.toggleSchoolStatus(id, is_active);

// ─── Columns ────────────────────────────────────────────────
const buildColumns = (onEdit, onToggle, onDelete, router) => [
  {
    accessorKey: 'name',
    header: 'School Name',
    cell: ({ row }) => (
      <span className="font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ getValue }) => (
      <span className="font-mono text-sm text-muted-foreground">{getValue()}</span>
    ),
  },
  {
    accessorKey: 'has_branches',
    header: 'Branches',
    cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
  },
  {
    id: 'subscription',
    header: 'Plan',
    cell: ({ row }) => row.original.subscription?.plan ?? '—',
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ getValue }) => (
      <StatusBadge status={getValue() ? 'active' : 'inactive'} />
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const s = row.original;
      return (
        <TableRowActions
          onView={() => router.push(`/master-admin/schools/${s.id}`)}
          onEdit={() => onEdit(s)}
          onDelete={() => onDelete(s)}
          extra={[
            {
              label: s.is_active ? 'Deactivate' : 'Activate',
              onClick: () => onToggle(s),
            },
          ]}
        />
      );
    },
  },
];

// ─── Page ────────────────────────────────────────────────────
export default function MasterSchoolsPage() {
  const router  = useRouter();
  const qc      = useQueryClient();

  const [page,     setPage]     = useState(1);
  const [search,   setSearch]   = useState('');
  const [status,   setStatus]   = useState('');

  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget,  setDeleteTarget]  = useState(null); // { id, name }
  const [toggleTarget,  setToggleTarget]  = useState(null); // { id, name, is_active }
  const [editTarget,    setEditTarget]    = useState(null); // school obj for edit modal

  const { data, isLoading } = useQuery({
    queryKey: ['master-schools', page, search, status],
    queryFn:  () => fetchSchools({ page, search, is_active: status }),
  });

  const schools    = data?.data?.rows ?? data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  // ── Mutations
  const createMutation = useMutation({
    mutationFn: createSchool,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-schools'] });
      toast.success('School created');
      setCreateOpen(false);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Failed to create school'),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => deleteSchool(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-schools'] });
      toast.success('School deleted');
      setDeleteTarget(null);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Delete failed'),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, is_active }) => toggleSchoolStatus(id, is_active),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-schools'] });
      toast.success('Status updated');
      setToggleTarget(null);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Update failed'),
  });

  const columns = useMemo(
    () => buildColumns(setEditTarget, setToggleTarget, setDeleteTarget, router),
    [router],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schools"
        description="Manage all registered schools on the platform"
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus size={16} className="mr-2" /> Add School
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={schools}
        loading={isLoading}
        emptyMessage="No schools found"
        search={search}
        onSearch={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Search by name or code…"
        filters={[
          {
            name: 'status',
            label: 'Status',
            value: status,
            onChange: (v) => { setStatus(v); setPage(1); },
            options: [
              { value: 'true',  label: 'Active'   },
              { value: 'false', label: 'Inactive' },
            ],
          },
        ]}
        pagination={{ page, totalPages, onPageChange: setPage }}
      />

      {/* ── Create / Edit Modal ── */}
      <SchoolFormModal
        open={createOpen || !!editTarget}
        onClose={() => { setCreateOpen(false); setEditTarget(null); }}
        defaultValues={editTarget ?? {}}
        onSubmit={(body) => {
          if (editTarget) {
            masterAdminService.updateSchool(editTarget.id, body)
              .then(() => {
                qc.invalidateQueries({ queryKey: ['master-schools'] });
                toast.success('School updated');
                setEditTarget(null);
              })
              .catch((e) => toast.error(e?.response?.data?.message ?? 'Update failed'));
          } else {
            createMutation.mutate(body);
          }
        }}
        loading={createMutation.isPending}
        isEdit={!!editTarget}
      />

      {/* ── Delete Confirm ── */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget)}
        loading={deleteMutation.isPending}
        title="Delete School"
        description={`Are you sure you want to permanently delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
      />

      {/* ── Toggle Status Confirm ── */}
      <ConfirmDialog
        open={!!toggleTarget}
        onClose={() => setToggleTarget(null)}
        onConfirm={() =>
          toggleMutation.mutate({ id: toggleTarget.id, is_active: !toggleTarget.is_active })
        }
        loading={toggleMutation.isPending}
        title={toggleTarget?.is_active ? 'Deactivate School' : 'Activate School'}
        description={`${toggleTarget?.is_active ? 'Deactivate' : 'Activate'} "${toggleTarget?.name}"?`}
        confirmLabel={toggleTarget?.is_active ? 'Deactivate' : 'Activate'}
      />
    </div>
  );
}

// ─── School Form (create + edit) ─────────────────────────────
function SchoolFormModal({ open, onClose, defaultValues, onSubmit, loading, isEdit }) {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
  });

  const handleClose = () => { reset(); onClose(); };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={isEdit ? 'Edit School' : 'Add New School'}
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <FormSubmitButton
            loading={loading}
            label={isEdit ? 'Save Changes' : 'Create School'}
            loadingLabel={isEdit ? 'Saving…' : 'Creating…'}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="School Name"
          name="name"
          register={register}
          error={errors.name}
          placeholder="e.g. Al-Iqbal Public School"
          required
        />
        {!isEdit && (
          <>
            <InputField
              label="School Code"
              name="code"
              register={register}
              error={errors.code}
              placeholder="e.g. AIQS-LHR"
              required
            />
            <InputField
              label="Admin Email"
              name="admin_email"
              type="email"
              register={register}
              error={errors.admin_email}
              placeholder="admin@school.com"
              required
            />
            <InputField
              label="Admin Password"
              name="admin_password"
              type="password"
              register={register}
              error={errors.admin_password}
              placeholder="Min 8 characters"
              required
            />
          </>
        )}
        <CheckboxField
          label="This school has multiple branches"
          name="has_branches"
          control={control}
        />
      </form>
    </AppModal>
  );
}
