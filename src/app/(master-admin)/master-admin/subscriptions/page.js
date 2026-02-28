'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
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
  SelectField,
  DatePickerField,
  FormSubmitButton,
  ErrorAlert,
} from '@/components/common';
import { Button } from '@/components/ui/button';
import { Badge }  from '@/components/ui/badge';

// ─── PLAN OPTIONS ──────────────────────────────────────────
const PLAN_OPTIONS = [
  { value: 'basic',      label: 'Basic'      },
  { value: 'standard',   label: 'Standard'   },
  { value: 'premium',    label: 'Premium'    },
  { value: 'enterprise', label: 'Enterprise' },
];

const STATUS_OPTIONS = [
  { value: 'active',    label: 'Active'    },
  { value: 'expired',   label: 'Expired'   },
  { value: 'cancelled', label: 'Cancelled' },
];

// ─── API ──────────────────────────────────────────────────
const fetchSubs        = ({ school_id, status }) => masterAdminService.getSubscriptions({ school_id: school_id || undefined, status: status || undefined });
const createSub        = (body) => masterAdminService.createSubscription(body);
const cancelSub        = (id)   => masterAdminService.cancelSubscription(id);
const fetchSchoolsList = ()     => masterAdminService.getSchools({ limit: 100 }).then((r) => r?.data?.rows ?? r?.data ?? []);

// ─── Columns ──────────────────────────────────────────────
const buildColumns = (onCancel) => [
  {
    id: 'school',
    header: 'School',
    cell: ({ row }) => (
      <span className="font-medium">{row.original.school?.name ?? '—'}</span>
    ),
  },
  {
    accessorKey: 'plan',
    header: 'Plan',
    cell: ({ getValue }) => (
      <Badge variant="outline" className="capitalize">{getValue()}</Badge>
    ),
  },
  {
    accessorKey: 'start_date',
    header: 'Start Date',
    cell: ({ getValue }) => getValue() ? new Date(getValue()).toLocaleDateString() : '—',
  },
  {
    accessorKey: 'end_date',
    header: 'End Date',
    cell: ({ getValue }) => getValue() ? new Date(getValue()).toLocaleDateString() : '—',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => (
      getValue() != null ? `PKR ${Number(getValue()).toLocaleString()}` : '—'
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const s = row.original;
      return (
        <TableRowActions
          onDelete={s.status === 'active' ? () => onCancel(s) : undefined}
          extra={[]}
        />
      );
    },
  },
];

// ─── Page ─────────────────────────────────────────────────
export default function SubscriptionsPage() {
  const qc = useQueryClient();

  const [schoolFilter, setSchoolFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [createOpen,   setCreateOpen]   = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['master-subs', schoolFilter, statusFilter],
    queryFn:  () => fetchSubs({ school_id: schoolFilter, status: statusFilter }),
  });

  // Schools list for the dropdown in create form
  const { data: schoolRows } = useQuery({
    queryKey: ['master-schools-all'],
    queryFn:  fetchSchoolsList,
  });

  const subs = data?.data?.rows ?? data?.data ?? [];

  const createMutation = useMutation({
    mutationFn: createSub,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-subs'] });
      toast.success('Subscription created');
      setCreateOpen(false);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Failed'),
  });

  const cancelMutation = useMutation({
    mutationFn: ({ id }) => cancelSub(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-subs'] });
      toast.success('Subscription cancelled');
      setCancelTarget(null);
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Cancel failed'),
  });

  const schoolOptions = (schoolRows ?? []).map((s) => ({ value: s.id, label: s.name }));

  const columns = useMemo(
    () => buildColumns(setCancelTarget),
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscriptions"
        description="Manage school subscriptions across the platform"
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus size={16} className="mr-2" /> New Subscription
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={subs}
        loading={isLoading}
        emptyMessage="No subscriptions found"
        filters={[
          {
            name: 'school',
            label: 'School',
            value: schoolFilter,
            onChange: setSchoolFilter,
            options: schoolOptions,
          },
          {
            name: 'status',
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: STATUS_OPTIONS,
          },
        ]}
      />

      {/* ── Create Modal ── */}
      <SubFormModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={(body) => createMutation.mutate(body)}
        loading={createMutation.isPending}
        schoolOptions={schoolOptions}
      />

      {/* ── Cancel Confirm ── */}
      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={() => cancelMutation.mutate(cancelTarget)}
        loading={cancelMutation.isPending}
        title="Cancel Subscription"
        description={`Cancel the subscription for "${cancelTarget?.school?.name}"? This cannot be undone.`}
        confirmLabel="Cancel Subscription"
        variant="destructive"
      />
    </div>
  );
}

// ─── Create Subscription Form ─────────────────────────────
function SubFormModal({ open, onClose, onSubmit, loading, schoolOptions }) {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm();

  const handleClose = () => { reset(); onClose(); };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title="New Subscription"
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <FormSubmitButton
            loading={loading}
            label="Create Subscription"
            loadingLabel="Creating…"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <SelectField
          label="School"
          name="school_id"
          control={control}
          options={schoolOptions}
          placeholder="Select a school"
          error={errors.school_id}
          required
        />
        <SelectField
          label="Plan"
          name="plan"
          control={control}
          options={PLAN_OPTIONS}
          placeholder="Select plan"
          error={errors.plan}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <DatePickerField
            label="Start Date"
            name="start_date"
            control={control}
            error={errors.start_date}
            required
          />
          <DatePickerField
            label="End Date"
            name="end_date"
            control={control}
            error={errors.end_date}
            required
          />
        </div>
        <InputField
          label="Amount (PKR)"
          name="amount"
          type="number"
          register={register}
          error={errors.amount}
          placeholder="e.g. 25000"
        />
      </form>
    </AppModal>
  );
}
