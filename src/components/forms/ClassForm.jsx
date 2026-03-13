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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Class Name"
        name="name"
        register={register}
        error={errors.name}
        required
        placeholder="e.g. Grade 5, Class 10-A"
      />
      <InputField
        label="Grade Level"
        name="grade_level"
        register={register}
        error={errors.grade_level}
        type="number"
        placeholder="e.g. 5"
      />
      <SelectField
        label="Academic Year"
        name="academic_year_id"
        control={control}
        error={errors.academic_year_id}
        options={academicYearOptions}
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

      <InputField
        label="Section"
        name="section"
        register={register}
        error={errors.section}
        placeholder="e.g. A, B, Alpha"
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
      <SelectField
        label="Status"
        name="status"
        control={control}
        error={errors.status}
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ]}
        required
      />
      <SelectField
        label="Class Teacher"
        name="class_teacher_id"
        control={control}
        error={errors.class_teacher_id}
        options={teacherOptions}
        placeholder="Select class teacher"
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
