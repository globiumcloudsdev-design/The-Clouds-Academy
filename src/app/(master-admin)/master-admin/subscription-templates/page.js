'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Plus, Check, X as XIcon } from 'lucide-react';
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
import { Badge }  from '@/components/ui/badge';

// ─── Helpers ──────────────────────────────────────────────
const formatPrice   = (p) => p != null ? `PKR ${Number(p).toLocaleString()}` : '—';
const extractRows   = (d) => d?.data?.rows ?? d?.data ?? [];
const extractPages  = (d) => d?.data?.totalPages ?? 1;

// ─── Columns ──────────────────────────────────────────────
const buildColumns = (onEdit, onDelete) => [
  {
    accessorKey: 'name',
    header: 'Plan Name',
    cell: ({ getValue }) => (
      <span className="font-semibold capitalize">{getValue()}</span>
    ),
  },
  {
    accessorKey: 'price_monthly',
    header: 'Monthly Price',
    cell: ({ getValue }) => (
      <span className="font-mono text-sm">{formatPrice(getValue())}</span>
    ),
  },
  {
    accessorKey: 'duration_months',
    header: 'Duration',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-xs">
        {getValue()} month{getValue() !== 1 ? 's' : ''}
      </Badge>
    ),
  },
  {
    id: 'limits',
    header: 'Limits',
    cell: ({ row }) => {
      const t = row.original;
      return (
        <div className="text-xs text-muted-foreground space-y-0.5">
          <p>Students: {t.max_students ?? 'Unlimited'}</p>
          <p>Teachers: {t.max_teachers ?? 'Unlimited'}</p>
        </div>
      );
    },
  },
  {
    id: 'features',
    header: 'Features',
    cell: ({ row }) => {
      const features = row.original.features ?? [];
      return (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {features.slice(0, 3).map((f) => (
            <span key={f} className="inline-flex items-center gap-0.5 text-[10px] bg-muted px-1.5 py-0.5 rounded-full">
              <Check size={9} className="text-emerald-500" /> {f}
            </span>
          ))}
          {features.length > 3 && (
            <span className="text-[10px] text-muted-foreground">+{features.length - 3} more</span>
          )}
        </div>
      );
    },
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
    enableHiding: false,
    cell: ({ row }) => (
      <TableRowActions
        onEdit={() => onEdit(row.original)}
        onDelete={() => onDelete(row.original)}
      />
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────
export default function SubscriptionTemplatesPage() {
  const qc = useQueryClient();

  const [page,         setPage]        = useState(1);
  const [createOpen,   setCreateOpen]  = useState(false);
  const [editTarget,   setEditTarget]  = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['sub-templates', page],
    queryFn:  () => masterAdminService.getSubscriptionTemplates({ page, limit: 20 }),
  });

  const templates  = extractRows(data);
  const totalPages = extractPages(data);

  const createMutation = useMutation({
    mutationFn: masterAdminService.createSubscriptionTemplate,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sub-templates'] });
      toast.success('Template created');
      setCreateOpen(false);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Failed'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => masterAdminService.updateSubscriptionTemplate(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sub-templates'] });
      toast.success('Template updated');
      setEditTarget(null);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Failed'),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }) => masterAdminService.deleteSubscriptionTemplate(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sub-templates'] });
      toast.success('Template deleted');
      setDeleteTarget(null);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Failed'),
  });

  const columns = useMemo(
    () => buildColumns(setEditTarget, setDeleteTarget),
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription Templates"
        description="Define plan tiers available for school subscriptions"
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus size={16} className="mr-2" /> New Template
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={templates}
        loading={isLoading}
        emptyMessage="No subscription templates found"
        enableColumnVisibility
        pagination={{ page, totalPages, onPageChange: setPage }}
      />

      {/* Create Modal */}
      <AppModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="New Subscription Template"
        size="lg"
      >
        <TemplateForm
          onSubmit={(body) => createMutation.mutate(body)}
          onCancel={() => setCreateOpen(false)}
          loading={createMutation.isPending}
        />
      </AppModal>

      {/* Edit Modal */}
      <AppModal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Template"
        size="lg"
      >
        <TemplateForm
          defaultValues={editTarget ?? {}}
          onSubmit={(body) => updateMutation.mutate({ id: editTarget.id, body })}
          onCancel={() => setEditTarget(null)}
          loading={updateMutation.isPending}
          isEdit
        />
      </AppModal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget)}
        loading={deleteMutation.isPending}
        title="Delete Template"
        description={`Delete the "${deleteTarget?.name}" template? Schools already subscribed will not be affected.`}
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
}

// ─── Template Form ────────────────────────────────────────
function TemplateForm({ defaultValues = {}, onSubmit, onCancel, loading, isEdit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:            defaultValues.name            ?? '',
      price_monthly:   defaultValues.price_monthly   ?? '',
      duration_months: defaultValues.duration_months ?? 12,
      max_students:    defaultValues.max_students    ?? '',
      max_teachers:    defaultValues.max_teachers    ?? '',
      features:        (defaultValues.features ?? []).join('\n'),
      is_active:       defaultValues.is_active       ?? true,
    },
  });

  const [apiError, setApiError] = useState(null);

  const submit = async (data) => {
    setApiError(null);
    try {
      const body = {
        name:            data.name,
        price_monthly:   Number(data.price_monthly),
        duration_months: Number(data.duration_months),
        max_students:    data.max_students ? Number(data.max_students) : null,
        max_teachers:    data.max_teachers ? Number(data.max_teachers) : null,
        features:        data.features
          ? data.features.split('\n').map((f) => f.trim()).filter(Boolean)
          : [],
        is_active: data.is_active,
      };
      await onSubmit(body);
    } catch (e) {
      setApiError(e?.response?.data?.message ?? 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      {apiError && <ErrorAlert message={apiError} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="Plan Name"
          placeholder="e.g. Premium"
          error={errors.name?.message}
          {...register('name', { required: 'Required' })}
        />
        <InputField
          label="Monthly Price (PKR)"
          type="number"
          placeholder="e.g. 5000"
          error={errors.price_monthly?.message}
          {...register('price_monthly', { required: 'Required', min: { value: 0, message: 'Must be ≥ 0' } })}
        />
        <InputField
          label="Duration (months)"
          type="number"
          placeholder="e.g. 12"
          error={errors.duration_months?.message}
          {...register('duration_months', { required: 'Required', min: { value: 1, message: 'At least 1 month' } })}
        />
        <div>{/* spacer */}</div>
        <InputField
          label="Max Students (leave blank = unlimited)"
          type="number"
          placeholder="e.g. 500"
          error={errors.max_students?.message}
          {...register('max_students')}
        />
        <InputField
          label="Max Teachers (leave blank = unlimited)"
          type="number"
          placeholder="e.g. 50"
          error={errors.max_teachers?.message}
          {...register('max_teachers')}
        />
      </div>

      {/* Features textarea */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Features <span className="text-xs text-muted-foreground">(one per line)</span>
        </label>
        <textarea
          {...register('features')}
          rows={5}
          placeholder={'Fee Management\nAttendance Tracking\nExam Reports'}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      <CheckboxField
        label="Active (visible to schools)"
        name="is_active"
        control={control}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <FormSubmitButton loading={loading}>
          {isEdit ? 'Save Changes' : 'Create Template'}
        </FormSubmitButton>
      </div>
    </form>
  );
}
