/**
 * Class & Section API Service
 *
 * Classes:
 * GET    /classes
 * POST   /classes
 * GET    /classes/:id
 * PUT    /classes/:id
 * DELETE /classes/:id
 *
 * Sections (nested):
 * GET    /classes/:classId/sections
 * POST   /classes/:classId/sections
 * GET    /classes/:classId/sections/:id
 * PUT    /classes/:classId/sections/:id
 * DELETE /classes/:classId/sections/:id
 */

import api from '@/lib/api';
import { buildQuery } from '@/lib/utils';
import { withFallback } from '@/lib/withFallback';
import { DUMMY_CLASSES, DUMMY_FLAT_TEACHERS, paginate } from '@/data/dummyData';

let fallbackClasses = [...DUMMY_CLASSES];

const normalizeBoolFilter = (value) => {
  if (value === undefined || value === null || value === '') return null;
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return null;
};

const resolveTeacherName = (teacherId) => {
  if (!teacherId) return null;
  const teacher = DUMMY_FLAT_TEACHERS.find((item) => String(item.id) === String(teacherId));
  return teacher ? `${teacher.first_name || ''} ${teacher.last_name || ''}`.trim() : null;
};

export const classService = {
  getAll: (filters = {}) =>
    withFallback(
      () => api.get(`/classes${buildQuery(filters)}`).then((r) => r.data),
      () => {
        let list = [...fallbackClasses];
        if (filters.branch_id) list = list.filter((c) => c.branch_id === filters.branch_id);
        if (filters.search) {
          const q = String(filters.search).toLowerCase();
          list = list.filter((c) => String(c.name ?? '').toLowerCase().includes(q));
        }
        const activeFilter = normalizeBoolFilter(filters.is_active);
        if (activeFilter !== null) {
          list = list.filter((c) => (c.is_active !== false) === activeFilter);
        }
        return paginate(list, filters.page, filters.limit);
      },
    ),

  getById: (id) =>
    withFallback(
      () => api.get(`/classes/${id}`).then((r) => r.data),
      () => ({ data: fallbackClasses.find((c) => c.id === id) ?? null }),
    ),

  // body: { name, grade_level, academic_year_id, branch_id?, class_teacher_id?, fee_structure? }
  create: (body) =>
    withFallback(
      () => api.post('/classes', body).then((r) => r.data),
      () => {
        const created = {
          id: `class-${Date.now()}`,
          name: body.name,
          grade_level: body.grade_level ?? null,
          academic_year_id: body.academic_year_id,
          branch_id: body.branch_id,
          class_teacher_id: body.class_teacher_id,
          class_teacher: resolveTeacherName(body.class_teacher_id),
          section: body.section ?? '',
          capacity: body.capacity ?? null,
          sections: body.section ? [{ id: `section-${Date.now()}`, name: body.section }] : [],
          sections_count: body.section ? 1 : 0,
          student_count: 0,
          is_active: body.is_active !== false,
        };
        fallbackClasses = [created, ...fallbackClasses];
        return { data: created };
      },
    ),

  update: (id, body) =>
    withFallback(
      () => api.put(`/classes/${id}`, body).then((r) => r.data),
      () => {
        fallbackClasses = fallbackClasses.map((current) => {
          if (current.id !== id) return current;

          const nextSection = body.section ?? current.section ?? '';
          return {
            ...current,
            ...body,
            class_teacher: body.class_teacher_id ? resolveTeacherName(body.class_teacher_id) : current.class_teacher,
            section: nextSection,
            capacity: body.capacity ?? current.capacity ?? null,
            sections_count: nextSection ? Math.max(current.sections_count ?? current.sections?.length ?? 0, 1) : (current.sections_count ?? current.sections?.length ?? 0),
            sections: nextSection ? (current.sections?.length ? current.sections : [{ id: `section-${id}`, name: nextSection }]) : (current.sections ?? []),
          };
        });
        return { data: fallbackClasses.find((c) => c.id === id) ?? { id, ...body } };
      },
    ),

  delete: (id) =>
    withFallback(
      () => api.delete(`/classes/${id}`).then((r) => r.data),
      () => {
        fallbackClasses = fallbackClasses.filter((c) => c.id !== id);
        return { data: { id } };
      },
    ),
};

export const sectionService = {
  // filters: { academic_year_id?, is_active? }
  getAll: (classId, filters = {}) =>
    api.get(`/classes/${classId}/sections${buildQuery(filters)}`).then((r) => r.data),

  getById: (classId, sectionId) =>
    api.get(`/classes/${classId}/sections/${sectionId}`).then((r) => r.data),

  // body: { academic_year_id, name, capacity, room_number?, section_teacher_id? }
  create: (classId, body) =>
    api.post(`/classes/${classId}/sections`, body).then((r) => r.data),

  update: (classId, sectionId, body) =>
    api.put(`/classes/${classId}/sections/${sectionId}`, body).then((r) => r.data),

  delete: (classId, sectionId) =>
    api.delete(`/classes/${classId}/sections/${sectionId}`).then((r) => r.data),
};
