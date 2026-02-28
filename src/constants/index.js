/**
 * The Clouds Academy — App-wide Constants
 */

// ── Permissions (mirror of backend src/config/permissions.js) ─────────────
export const PERMISSIONS = {
  STUDENT_CREATE:       'student.create',
  STUDENT_READ:         'student.read',
  STUDENT_UPDATE:       'student.update',
  STUDENT_DELETE:       'student.delete',
  STUDENT_EXPORT:       'student.export',
  TEACHER_CREATE:       'teacher.create',
  TEACHER_READ:         'teacher.read',
  TEACHER_UPDATE:       'teacher.update',
  TEACHER_DELETE:       'teacher.delete',
  CLASS_CREATE:         'class.create',
  CLASS_READ:           'class.read',
  CLASS_UPDATE:         'class.update',
  CLASS_DELETE:         'class.delete',
  SECTION_CREATE:       'section.create',
  SECTION_READ:         'section.read',
  SECTION_UPDATE:       'section.update',
  SECTION_DELETE:       'section.delete',
  ATTENDANCE_CREATE:    'attendance.create',
  ATTENDANCE_READ:      'attendance.read',
  ATTENDANCE_UPDATE:    'attendance.update',
  ATTENDANCE_EXPORT:    'attendance.export',
  FEE_CREATE:           'fee.create',
  FEE_READ:             'fee.read',
  FEE_UPDATE:           'fee.update',
  FEE_DELETE:           'fee.delete',
  FEE_COLLECT:          'fee.collect',
  FEE_REFUND:           'fee.refund',
  FEE_EXPORT:           'fee.export',
  EXAM_CREATE:          'exam.create',
  EXAM_READ:            'exam.read',
  EXAM_UPDATE:          'exam.update',
  EXAM_DELETE:          'exam.delete',
  EXAM_PUBLISH:         'exam.publish',
  ROLE_CREATE:          'role.create',
  ROLE_READ:            'role.read',
  ROLE_UPDATE:          'role.update',
  ROLE_DELETE:          'role.delete',
  ROLE_ASSIGN:          'role.assign',
  USER_CREATE:          'user.create',
  USER_READ:            'user.read',
  USER_UPDATE:          'user.update',
  USER_DELETE:          'user.delete',
  ACADEMIC_YEAR_CREATE: 'academic_year.create',
  ACADEMIC_YEAR_READ:   'academic_year.read',
  ACADEMIC_YEAR_UPDATE: 'academic_year.update',
  ACADEMIC_YEAR_DELETE: 'academic_year.delete',
  SCHOOL_UPDATE:        'school.update',
  SCHOOL_SETTINGS:      'school.settings',
  SCHOOL_ASSIGN_ROLE:   'school.assign_role',
  BRANCH_CREATE:        'branch.create',
  BRANCH_READ:          'branch.read',
  BRANCH_UPDATE:        'branch.update',
  BRANCH_DELETE:        'branch.delete',
  REPORT_FINANCIAL:     'report.financial',
  REPORT_ATTENDANCE:    'report.attendance',
  REPORT_STUDENT:       'report.student',
  REPORT_EXAM:          'report.exam',
};

// ── Nav items for School portal ───────────────────────────────────────────
// Each item optionally requires a permission code to be visible.
export const SCHOOL_NAV = [
  { label: 'Dashboard',       href: '/dashboard',       icon: 'LayoutDashboard', permission: null },
  { label: 'Students',        href: '/students',         icon: 'Users',          permission: PERMISSIONS.STUDENT_READ },
  { label: 'Teachers',        href: '/teachers',         icon: 'GraduationCap',  permission: PERMISSIONS.TEACHER_READ },
  { label: 'Classes',         href: '/classes',          icon: 'BookOpen',       permission: PERMISSIONS.CLASS_READ },
  { label: 'Attendance',      href: '/attendance',       icon: 'CalendarCheck',  permission: PERMISSIONS.ATTENDANCE_READ },
  { label: 'Exams',           href: '/exams',            icon: 'ClipboardList',  permission: PERMISSIONS.EXAM_READ },
  { label: 'Fees',            href: '/fees',             icon: 'CreditCard',     permission: PERMISSIONS.FEE_READ },
  { label: 'Academic Years',  href: '/academic-years',   icon: 'Calendar',       permission: PERMISSIONS.ACADEMIC_YEAR_READ },
  { label: 'Roles',           href: '/roles',            icon: 'ShieldCheck',    permission: PERMISSIONS.ROLE_READ },
  { label: 'Users',           href: '/users',            icon: 'UserCog',        permission: PERMISSIONS.USER_READ },
  { label: 'Branches',        href: '/branches',         icon: 'GitBranch',      permission: PERMISSIONS.BRANCH_READ, hideForRoles: ['BRANCH_ADMIN'] },
  { label: 'Settings',        href: '/settings',        icon: 'Settings',        permission: PERMISSIONS.SCHOOL_SETTINGS },
];

// ── Gender options ────────────────────────────────────────────────────────
export const GENDER_OPTIONS = [
  { value: 'male',   label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other',  label: 'Other' },
];

// ── Attendance status options ─────────────────────────────────────────────
export const ATTENDANCE_STATUS = [
  { value: 'present', label: 'Present', color: 'green' },
  { value: 'absent',  label: 'Absent',  color: 'red' },
  { value: 'late',    label: 'Late',    color: 'yellow' },
  { value: 'leave',   label: 'Leave',   color: 'blue' },
  { value: 'holiday', label: 'Holiday', color: 'purple' },
];

// ── Fee voucher status ────────────────────────────────────────────────────
export const FEE_STATUS = [
  { value: 'pending',   label: 'Pending',   color: 'yellow' },
  { value: 'paid',      label: 'Paid',      color: 'green' },
  { value: 'overdue',   label: 'Overdue',   color: 'red' },
  { value: 'partial',   label: 'Partial',   color: 'blue' },
  { value: 'cancelled', label: 'Cancelled', color: 'gray' },
];

// ── Payment methods ───────────────────────────────────────────────────────
export const PAYMENT_METHODS = [
  { value: 'cash',          label: 'Cash' },
  { value: 'cheque',        label: 'Cheque' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'jazzcash',      label: 'JazzCash' },
  { value: 'easypaisa',     label: 'EasyPaisa' },
  { value: 'stripe',        label: 'Card (Stripe)' },
  { value: 'other',         label: 'Other' },
];

// ── Exam types ────────────────────────────────────────────────────────────
export const EXAM_TYPES = [
  { value: 'mid_term',   label: 'Mid Term' },
  { value: 'final',      label: 'Final' },
  { value: 'unit_test',  label: 'Unit Test' },
  { value: 'monthly',    label: 'Monthly' },
  { value: 'other',      label: 'Other' },
];

// ── Months ────────────────────────────────────────────────────────────────
export const MONTHS = [
  { value: 1,  label: 'January' },
  { value: 2,  label: 'February' },
  { value: 3,  label: 'March' },
  { value: 4,  label: 'April' },
  { value: 5,  label: 'May' },
  { value: 6,  label: 'June' },
  { value: 7,  label: 'July' },
  { value: 8,  label: 'August' },
  { value: 9,  label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];
