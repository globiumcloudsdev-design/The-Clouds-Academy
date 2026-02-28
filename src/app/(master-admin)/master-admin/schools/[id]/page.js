'use client';

import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, CreditCard, Shield } from 'lucide-react';
import { toast } from 'sonner';

import { masterAdminService } from '@/services';
import {
  PageHeader,
  AppBreadcrumb,
  PageLoader,
  ErrorAlert,
  InputField,
  CheckboxField,
  SwitchField,
  FormSubmitButton,
  StatusBadge,
  SectionHeader,
} from '@/components/common';
import { Button }     from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator }  from '@/components/ui/separator';
import { Badge }      from '@/components/ui/badge';

// ─── API ─────────────────────────────────────────────────────
const fetchSchool  = (id)          => masterAdminService.getSchoolById(id);
const updateSchool = (id, body)    => masterAdminService.updateSchool(id, body);
const toggleStatus = (id, is_active) => masterAdminService.toggleSchoolStatus(id, is_active);

// ─── Page ─────────────────────────────────────────────────────
export default function SchoolDetailPage({ params }) {
  const { id }  = use(params);
  const router  = useRouter();
  const qc      = useQueryClient();

  const { data: school, isLoading, error } = useQuery({
    queryKey: ['master-school', id],
    queryFn:  () => fetchSchool(id),
    enabled:  !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (body) => updateSchool(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-school', id] });
      qc.invalidateQueries({ queryKey: ['master-schools']     });
      toast.success('School updated');
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Update failed'),
  });

  const toggleMutation = useMutation({
    mutationFn: (is_active) => toggleStatus(id, is_active),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['master-school', id] });
      qc.invalidateQueries({ queryKey: ['master-schools']     });
      toast.success('Status updated');
    },
    onError: (e) => toast.error(e?.response?.data?.message ?? 'Update failed'),
  });

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    values: school ? { name: school.name, has_branches: school.has_branches } : {},
  });

  if (isLoading) return <PageLoader message="Loading school…" />;
  if (error)     return <ErrorAlert message="Failed to load school data." />;
  if (!school)   return null;

  const sub = school.subscription;

  return (
    <div className="space-y-6">
      <AppBreadcrumb
        items={[
          { label: 'Schools', href: '/master-admin/schools' },
          { label: school.name },
        ]}
      />

      <PageHeader
        title={school.name}
        description={`Code: ${school.code}`}
        action={
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft size={14} className="mr-2" /> Back
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ── Left column: Edit form ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Basic info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 size={16} /> Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit((body) => updateMutation.mutate(body))}
                className="space-y-4"
              >
                <InputField
                  label="School Name"
                  name="name"
                  register={register}
                  error={errors.name}
                  required
                />
                <CheckboxField
                  label="This school has multiple branches"
                  name="has_branches"
                  control={control}
                />
                <div className="flex justify-end pt-2">
                  <FormSubmitButton
                    loading={updateMutation.isPending}
                    label="Save Changes"
                    loadingLabel="Saving…"
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Subscription details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard size={16} /> Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sub ? (
                <div className="space-y-3 text-sm">
                  <Row label="Plan"       value={<Badge variant="outline">{sub.plan}</Badge>} />
                  <Separator />
                  <Row label="Start Date" value={sub.start_date ? new Date(sub.start_date).toLocaleDateString() : '—'} />
                  <Row label="End Date"   value={sub.end_date   ? new Date(sub.end_date).toLocaleDateString()   : '—'} />
                  <Row label="Amount"     value={sub.amount != null ? `PKR ${Number(sub.amount).toLocaleString()}` : '—'} />
                  <Row label="Status"     value={<StatusBadge status={sub.status ?? (sub.is_active ? 'active' : 'inactive')} />} />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No subscription assigned.{' '}
                  <a href="/master-admin/subscriptions" className="text-primary underline">
                    Manage subscriptions →
                  </a>
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Right column: Status & meta ── */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield size={16} /> Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Current status</span>
                <StatusBadge status={school.is_active ? 'active' : 'inactive'} />
              </div>
              <Separator />
              <Button
                variant={school.is_active ? 'destructive' : 'default'}
                size="sm"
                className="w-full"
                disabled={toggleMutation.isPending}
                onClick={() => toggleMutation.mutate(!school.is_active)}
              >
                {toggleMutation.isPending
                  ? 'Updating…'
                  : school.is_active ? 'Deactivate School' : 'Activate School'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Row label="Code"           value={<span className="font-mono">{school.code}</span>} />
              <Row label="Has Branches"   value={school.has_branches ? 'Yes' : 'No'} />
              <Row label="Created"        value={school.createdAt ? new Date(school.createdAt).toLocaleDateString() : '—'} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
