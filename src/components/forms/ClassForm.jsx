/**
 * ClassForm — Create / Edit class
 * ─────────────────────────────────────────────────────────────────
 * Props:
 *   defaultValues       object
 *   onSubmit            (data) => void
 *   onCancel            () => void
 *   loading             boolean
 *   teacherOptions      { value, label }[]
 *   academicYearOptions { value, label }[]
 *   branchOptions       { value, label }[]
 *   isEdit              boolean
 */
'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  InputField,
  SelectField,
  FormSubmitButton,
} from '@/components/common';
import { Button } from '@/components/ui/button';

export default function ClassForm({
  defaultValues       = {},
  onSubmit,
  onCancel,
  loading             = false,
  teacherOptions      = [],
  academicYearOptions = [],
  branchOptions       = [],
  isEdit              = false,
}) {
  // Normalize is_active (boolean from API) → status string for the form
  const normalizedDefaults = useMemo(() => ({
    ...defaultValues,
    status: defaultValues.status
      ?? (defaultValues.is_active === false ? 'inactive' : 'active'),
    class_teacher_id: defaultValues.class_teacher_id ?? defaultValues.class_teacher?.id ?? '',
    academic_year_id: defaultValues.academic_year_id ?? defaultValues.academic_year?.id ?? '',
    branch_id: defaultValues.branch_id ?? defaultValues.branch?.id ?? '',
    grade_level: defaultValues.grade_level ?? '',
    section: defaultValues.section ?? defaultValues.section_name ?? '',
    capacity: defaultValues.capacity ?? defaultValues.max_capacity ?? '',
  }), [defaultValues]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: normalizedDefaults });

  useEffect(() => {
    reset(normalizedDefaults);
  }, [normalizedDefaults, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Required context fields */}
      <SelectField
        label="Academic Year"
        name="academic_year_id"
        control={control}
        error={errors.academic_year_id}
        options={academicYearOptions || []}
        placeholder="Select academic year"
        required
      />

      {branchOptions.length > 0 && (
        <SelectField
          label="Branch"
          name="branch_id"
          control={control}
          error={errors.branch_id}
          options={branchOptions}
          placeholder="Select branch"
        />
      )}

      {/* Table-matching fields (same order as columns) */}
      <InputField
        label="Class Name"
        name="name"
        register={register}
        error={errors.name}
        required
        placeholder="e.g. Grade 5, Class 10-A"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Grade Level"
          name="grade_level"
          register={register}
          error={errors.grade_level}
          type="number"
          placeholder="e.g. 5"
        />

        <InputField
          label="Capacity"
          name="capacity"
          register={register}
          error={errors.capacity}
          type="number"
          min="1"
          placeholder="e.g. 50"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <InputField
            label="Initial Section"
            name="section"
            register={register}
            error={errors.section}
            placeholder="e.g. A, B, Alpha"
            hint="Optional. Agar class ke saath first section banana ho to yahan enter karein."
          />
          <div className="flex justify-end">
            <Link
              href="/sections"
              className="text-xs font-medium text-primary hover:underline"
            >
              Manage sections separately
            </Link>
          </div>
        </div>

        <SelectField
          label="Class Teacher"
          name="class_teacher_id"
          control={control}
          error={errors.class_teacher_id}
          options={teacherOptions}
          placeholder={teacherOptions.length ? 'Select class teacher' : 'No teacher available'}
        />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed px-3 py-2">
        <p className="text-xs text-muted-foreground">
          {teacherOptions.length
            ? 'Aap abhi class teacher assign kar sakte hain, ya baad mein edit se update kar sakte hain.'
            : 'Abhi koi teacher available nahi hai. Pehle teacher create karein phir assign karein.'}
        </p>
        <Link
          href="/teachers"
          className="shrink-0 text-xs font-medium text-primary hover:underline"
        >
          Manage teachers
        </Link>
      </div>

      <SelectField
        label="Status"
        name="status"
        control={control}
        error={errors.status}
        options={[
          { value: 'active',   label: 'Active'   },
          { value: 'inactive', label: 'Inactive' },
        ]}
        required
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <FormSubmitButton
          loading={loading}
          label={isEdit ? 'Save Changes' : 'Add Class'}
          loadingLabel={isEdit ? 'Saving…' : 'Adding…'}
        />
      </div>
    </form>
  );
}
