'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { masterAdminService } from '@/services';
import { INSTITUTE_TYPES } from '@/data/dummyData';
import {
  PageHeader,
  DataTable,
  StatusBadge,
  TableRowActions,
  ConfirmDialog,
  AppModal,
  InputField,
  CheckboxField,
  SelectField,
  FormSubmitButton,
  ErrorAlert,
} from '@/components/common';
import { Button } from '@/components/ui/button';

// ─── Helpers ─────────────────────────────────────────────────
const INST_TYPE_OPTIONS = INSTITUTE_TYPES.map((t) => ({ value: t.value, label: `${t.icon}  ${t.label}` }));

const TYPE_BADGE = {
  school:     'bg-blue-100 text-blue-800',
  coaching:   'bg-orange-100 text-orange-800',
  academy:    'bg-indigo-100 text-indigo-800',
  college:    'bg-cyan-100 text-cyan-800',
  university: 'bg-violet-100 text-violet-800',
};

// ─── API helpers ─────────────────────────────────────────────
const fetchInstitutes       = ({ page, search, is_active }) =>
  masterAdminService.getSchools({ page, limit: 20, search: search || undefined, is_active: is_active || undefined });
const createInstitute       = (body)          => masterAdminService.createSchool(body);
const deleteInstitute       = (id)            => masterAdminService.deleteSchool(id);
const toggleInstituteStatus = (id, is_active) => masterAdminService.toggleSchoolStatus(id, is_active);

// ─── Columns ─────────────────────────────────────────────────
const buildColumns = (onEdit, onToggle, onDelete, router) => [
  {
    accessorKey: 'name',
    header: 'Institute Name',
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
    accessorKey: 'institute_type',
    header: 'Type',
    cell: ({ getValue }) => {
      const val     = getValue();
      const typeDef = INSTITUTE_TYPES.find((t) => t.value === val);
      if (!typeDef) return <span className="text-muted-foreground text-xs">—</span>;
      return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${TYPE_BADGE[val] ?? 'bg-gray-100 text-gray-700'}`}>
          {typeDef.icon} {typeDef.label}
        </span>
      );
    },
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
    queryKey: ['master-institutes', page, search, status],
    queryFn:  () => fetchInstitutes({ page, search, is_active: status }),
  });

  const institutes = data?.data?.rows ?? data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  // ── Mutations
  const createMutation = useMutation({
    mutationFn: createInstitute,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-institutes'] });
      toast.success('Institute created');
      setCreateOpen(false);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Failed to create institute'),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => deleteInstitute(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-institutes'] });
      toast.success('Institute deleted');
      setDeleteTarget(null);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Delete failed'),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, is_active }) => toggleInstituteStatus(id, is_active),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-institutes'] });
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
        title="Institutes"
        description="Manage all registered institutes on the platform"
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus size={16} className="mr-2" /> Add Institute
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={institutes}
        loading={isLoading}
        emptyMessage="No institutes found"
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
      <InstituteFormModal
        open={createOpen || !!editTarget}
        onClose={() => { setCreateOpen(false); setEditTarget(null); }}
        defaultValues={editTarget ?? {}}
        onSubmit={(body) => {
          if (editTarget) {
            masterAdminService.updateSchool(editTarget.id, body)
              .then(() => {
                qc.invalidateQueries({ queryKey: ['master-institutes'] });
                toast.success('Institute updated');
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
        title="Delete Institute"
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
        title={toggleTarget?.is_active ? 'Deactivate Institute' : 'Activate Institute'}
        description={`${toggleTarget?.is_active ? 'Deactivate' : 'Activate'} "${toggleTarget?.name}"?`}
        confirmLabel={toggleTarget?.is_active ? 'Deactivate' : 'Activate'}
      />
    </div>
  );
}

// ─── Institute Form (create + edit) ──────────────────────────
function InstituteFormModal({ open, onClose, defaultValues, onSubmit, loading, isEdit }) {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
  });

  const selectedType = useWatch({ control, name: 'institute_type' });
  const typeDef      = INSTITUTE_TYPES.find((t) => t.value === selectedType);

  // Fetch subscription templates for the dropdown
  const { data: tplData } = useQuery({
    queryKey: ['sub-templates'],
    queryFn:  () => masterAdminService.getSubscriptionTemplates(),
    enabled:  open,
  });
  const tplOptions = (tplData?.data?.rows ?? tplData?.data ?? []).map((t) => ({
    value: t.id,
    label: `${t.name} — PKR ${t.price_monthly?.toLocaleString()}/mo`,
  }));

  const handleClose = () => { reset(); onClose(); };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={isEdit ? 'Edit Institute' : 'Add New Institute'}
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <FormSubmitButton
            loading={loading}
            label={isEdit ? 'Save Changes' : 'Create Institute'}
            loadingLabel={isEdit ? 'Saving…' : 'Creating…'}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

        {/* ── 1. Institute Type ── */}
        <div>
          <SelectField
            label="Institute Type"
            name="institute_type"
            control={control}
            error={errors.institute_type}
            options={INST_TYPE_OPTIONS}
            placeholder="Select type…"
            required
          />
          {typeDef && (
            <p className="mt-1 text-xs text-muted-foreground">{typeDef.description}</p>
          )}
        </div>

        {/* ── 2. Basic Info ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            label="Institute Name"
            name="name"
            register={register}
            error={errors.name}
            placeholder={typeDef ? `e.g. My ${typeDef.label}` : 'e.g. Al-Iqbal Public School'}
            required
          />
          {!isEdit && (
            <InputField
              label="Institute Code"
              name="code"
              register={register}
              error={errors.code}
              placeholder="e.g. APS-LHR"
              required
            />
          )}
        </div>

        <InputField
          label="Address"
          name="address"
          register={register}
          error={errors.address}
          placeholder="e.g. Plot 5, DHA Phase 2, Lahore"
        />

        {/* ── 3. Type-specific extra fields ── */}
        {typeDef && typeDef.extra_fields.length > 0 && (
          <div className="rounded-lg border border-dashed p-4 space-y-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {typeDef.icon} {typeDef.label} Details
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {typeDef.extra_fields.map((field) => (
                <InputField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  register={register}
                  error={errors[field.name]}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── 4. Admin Account (create only) ── */}
        {!isEdit && (
          <div className="rounded-lg border border-dashed p-4 space-y-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              👤 Admin Account
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                label="Admin Email"
                name="admin_email"
                type="email"
                register={register}
                error={errors.admin_email}
                placeholder="admin@institute.com"
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
            </div>
            <p className="text-[11px] text-muted-foreground">
              A default <strong>Institute Admin</strong> role will be auto-assigned. You can manage roles from the institute's portal.
            </p>
          </div>
        )}

        {/* ── 5. Subscription Plan ── */}
        <SelectField
          label="Subscription Plan"
          name="subscription_template_id"
          control={control}
          error={errors.subscription_template_id}
          options={tplOptions}
          placeholder="Assign a subscription plan…"
        />

        {/* ── 6. Branches ── */}
        <CheckboxField
          label="This institute has multiple branches"
          name="has_branches"
          control={control}
        />

      </form>
    </AppModal>
  );
}
