/**
 * Notification API Service
 * GET   /notifications
 * PATCH /notifications/:id/read
 * PATCH /notifications/read-all
 * DELETE /notifications/:id
 */

import api from '@/lib/api';

export const notificationService = {
  getAll: (params = {}) =>
    api.get('/notifications', { params }).then((r) => r.data),

  markRead: (id) =>
    api.patch(`/notifications/${id}/read`).then((r) => r.data),

  markAllRead: () =>
    api.patch('/notifications/read-all').then((r) => r.data),

  delete: (id) =>
    api.delete(`/notifications/${id}`).then((r) => r.data),
};
