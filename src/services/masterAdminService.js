/**
 * Master Admin API Service
 * All calls require MASTER_ADMIN role (verified by backend).
 */
import api from '@/lib/api';
import { buildQuery } from '@/lib/utils';
import { withFallback } from '@/lib/withFallback';
import {
  DUMMY_MA_STATS, DUMMY_MA_SCHOOLS, DUMMY_MA_SUBSCRIPTIONS,
  DUMMY_MA_USERS, DUMMY_MA_SUBSCRIPTION_TEMPLATES, paginate,
} from '@/data/dummyData';

export const masterAdminService = {
  // ─── Stats ────────────────────────────────────────────────
  getStats: () =>
    withFallback(
      () => api.get('/master-admin/stats').then((r) => r.data?.data ?? r.data),
      () => DUMMY_MA_STATS,
    ),

  // ─── Schools ──────────────────────────────────────────────
  getSchools: (filters = {}) =>
    withFallback(
      () => api.get(`/master-admin/schools${buildQuery(filters)}`).then((r) => r.data),
      () => paginate(DUMMY_MA_SCHOOLS, filters.page, filters.limit),
    ),

  getSchoolById: (id) =>
    withFallback(
      () => api.get(`/master-admin/schools/${id}`).then((r) => r.data?.data ?? r.data),
      () => DUMMY_MA_SCHOOLS.find((s) => s.id === id) ?? null,
    ),

  // body: { institute_type, name, code, address?, admin_email, admin_password, has_branches?, subscription_template_id?,
  //         affiliation_board?, grade_range?, subject_focus?, target_exams?, specialization?, degree_programs?, hec_charter?, faculties? }
  createSchool: (body) =>
    api.post('/master-admin/schools', body).then((r) => r.data),

  updateSchool: (id, body) =>
    api.put(`/master-admin/schools/${id}`, body).then((r) => r.data),

  toggleSchoolStatus: (id, is_active) =>
    api.patch(`/master-admin/schools/${id}/status`, { is_active }).then((r) => r.data),

  deleteSchool: (id) =>
    api.delete(`/master-admin/schools/${id}`).then((r) => r.data),

  // ─── Subscriptions ────────────────────────────────────────
  // filters: { school_id?, status? }
  getSubscriptions: (filters = {}) =>
    withFallback(
      () => api.get(`/master-admin/subscriptions${buildQuery(filters)}`).then((r) => r.data),
      () => paginate(DUMMY_MA_SUBSCRIPTIONS, filters.page, filters.limit),
    ),

  getSubscriptionById: (id) =>
    api.get(`/master-admin/subscriptions/${id}`).then((r) => r.data),

  // body: { school_id, plan, start_date, end_date, amount? }
  createSubscription: (body) =>
    api.post('/master-admin/subscriptions', body).then((r) => r.data),

  updateSubscription: (id, body) =>
    api.put(`/master-admin/subscriptions/${id}`, body).then((r) => r.data),

  cancelSubscription: (id) =>
    api.patch(`/master-admin/subscriptions/${id}/cancel`).then((r) => r.data),

  // ─── Users ────────────────────────────────────────────────
  getUsers: (filters = {}) =>
    withFallback(
      () => api.get(`/master-admin/users${buildQuery(filters)}`).then((r) => r.data),
      () => paginate(DUMMY_MA_USERS, filters.page, filters.limit),
    ),

  getUserById: (id) =>
    api.get(`/master-admin/users/${id}`).then((r) => r.data),

  createUser: (body) =>
    api.post('/master-admin/users', body).then((r) => r.data),

  updateUser: (id, body) =>
    api.put(`/master-admin/users/${id}`, body).then((r) => r.data),

  toggleUserStatus: (id, is_active) =>
    api.patch(`/master-admin/users/${id}/status`, { is_active }).then((r) => r.data),

  deleteUser: (id) =>
    api.delete(`/master-admin/users/${id}`).then((r) => r.data),

  // ─── Subscription Templates ────────────────────────────────────
  getSubscriptionTemplates: (filters = {}) =>
    withFallback(
      () => api.get(`/master-admin/subscription-templates${buildQuery(filters)}`).then((r) => r.data),
      () => paginate(DUMMY_MA_SUBSCRIPTION_TEMPLATES, filters.page, filters.limit),
    ),

  getSubscriptionTemplateById: (id) =>
    withFallback(
      () => api.get(`/master-admin/subscription-templates/${id}`).then((r) => r.data),
      () => DUMMY_MA_SUBSCRIPTION_TEMPLATES.find((t) => t.id === id) ?? null,
    ),

  createSubscriptionTemplate: (body) =>
    api.post('/master-admin/subscription-templates', body).then((r) => r.data),

  updateSubscriptionTemplate: (id, body) =>
    api.put(`/master-admin/subscription-templates/${id}`, body).then((r) => r.data),

  deleteSubscriptionTemplate: (id) =>
    api.delete(`/master-admin/subscription-templates/${id}`).then((r) => r.data),
};

