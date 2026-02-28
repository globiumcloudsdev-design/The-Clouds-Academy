/**
 * Student API Service
 * GET    /students
 * POST   /students
 * GET    /students/:id
 * PUT    /students/:id
 * DELETE /students/:id
 * POST   /students/:id/photo        (Cloudinary upload)
 */

import api from '@/lib/api';
import { buildQuery } from '@/lib/utils';
import { withFallback } from '@/lib/withFallback';
import { DUMMY_STUDENTS, paginate } from '@/data/dummyData';

export const studentService = {
  // List with pagination + filters
  getAll: (filters = {}) =>
    withFallback(
      () => api.get(`/students${buildQuery(filters)}`).then((r) => r.data),
      () => {
        let list = [...DUMMY_STUDENTS];
        if (filters.class_id)  list = list.filter((s) => s.class_id  === filters.class_id);
        if (filters.branch_id) list = list.filter((s) => s.branch_id === filters.branch_id);
        if (filters.search) {
          const q = filters.search.toLowerCase();
          list = list.filter(
            (s) =>
              s.first_name.toLowerCase().includes(q) ||
              s.last_name.toLowerCase().includes(q) ||
              s.roll_number.toLowerCase().includes(q),
          );
        }
        return paginate(list, filters.page, filters.limit);
      },
    ),

  // Get single student with full profile
  getById: (id) => api.get(`/students/${id}`).then((r) => r.data),

  // Create student
  // body matches Student model fields
  create: (body) => api.post('/students', body).then((r) => r.data),

  // Update student
  update: (id, body) => api.put(`/students/${id}`, body).then((r) => r.data),

  // Soft delete
  delete: (id) => api.delete(`/students/${id}`).then((r) => r.data),

  // Upload photo (multipart/form-data)
  uploadPhoto: (id, formData) =>
    api
      .post(`/students/${id}/photo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),
};
