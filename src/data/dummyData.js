/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   The Clouds Academy — Complete Dummy / Seed Data           ║
 * ║                                                              ║
 * ║  Used as fallback when backend API is unreachable.          ║
 * ║  Import DUMMY_USERS to show demo login credentials.          ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Demo Credentials
 * ─────────────────────────────────────────────────────────────────
 *  Role          │ School Code │ Email                    │ Password
 * ───────────────┼─────────────┼──────────────────────────┼──────────────
 *  Master Admin  │ MASTER      │ master@cloudsacademy.com │ master@123
 *  School Admin  │ TCA-LHR     │ admin@tca.edu.pk         │ admin@123
 *  Fee Manager   │ TCA-LHR     │ fees@tca.edu.pk          │ fees@123
 *  Class Teacher │ TCA-LHR     │ teacher@tca.edu.pk       │ teacher@123
 *  Receptionist  │ TCA-LHR     │ reception@tca.edu.pk     │ reception@123
 *  Branch Admin  │ TCA-LHR     │ branch@tca.edu.pk        │ branch@123
 * ─────────────────────────────────────────────────────────────────
 */

// ──────────────────────────────────────────────────────────────────────────────
// 0 ▸ SCHOOL
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_SCHOOL = {
  id: 'school-001',
  name: 'The Clouds Academy',
  code: 'TCA-LHR',
  address: '12-B, Gulberg III, Lahore, Punjab',
  phone: '+92-42-35761234',
  email: 'info@tca.edu.pk',
  website: 'https://tca.edu.pk',
  logo_url: null,
  has_branches: true,
  is_active: true,
  created_at: '2023-04-01T08:00:00.000Z',
};

// ──────────────────────────────────────────────────────────────────────────────
// 0.1 ▸ BRANCHES
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_BRANCHES = [
  {
    id: 'branch-001',
    name: 'Main Campus',
    address: '12-B, Gulberg III, Lahore',
    phone: '+92-42-35761234',
    email: 'main@tca.edu.pk',
    school_id: 'school-001',
    is_active: true,
    created_at: '2023-04-01T08:00:00.000Z',
  },
  {
    id: 'branch-002',
    name: 'DHA Branch',
    address: 'Plot 45, DHA Phase 5, Lahore',
    phone: '+92-42-35769999',
    email: 'dha@tca.edu.pk',
    school_id: 'school-001',
    is_active: true,
    created_at: '2024-01-15T08:00:00.000Z',
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 1 ▸ ROLES  (role_code mirrors backend)
// ──────────────────────────────────────────────────────────────────────────────
export const ALL_PERMISSIONS = [
  'student.create', 'student.read', 'student.update', 'student.delete', 'student.export',
  'teacher.create', 'teacher.read', 'teacher.update', 'teacher.delete',
  'class.create',   'class.read',   'class.update',   'class.delete',
  'section.create', 'section.read', 'section.update', 'section.delete',
  'attendance.create', 'attendance.read', 'attendance.update', 'attendance.export',
  'fee.create', 'fee.read', 'fee.update', 'fee.delete', 'fee.collect', 'fee.refund', 'fee.export',
  'exam.create', 'exam.read', 'exam.update', 'exam.delete', 'exam.publish',
  'role.create', 'role.read', 'role.update', 'role.delete', 'role.assign',
  'user.create', 'user.read', 'user.update', 'user.delete',
  'academic_year.create', 'academic_year.read', 'academic_year.update', 'academic_year.delete',
  'school.update', 'school.settings', 'school.assign_role',
  'branch.create', 'branch.read', 'branch.update', 'branch.delete',
  'report.financial', 'report.attendance', 'report.student', 'report.exam',
];

export const DUMMY_ROLES = [
  {
    id: 'role-001',
    name: 'School Admin',
    code: 'SCHOOL_ADMIN',
    is_system: true,
    permissions: ALL_PERMISSIONS,   // full access to everything in the school portal
  },
  {
    id: 'role-002',
    name: 'Fee Manager',
    code: 'FEE_MANAGER',
    is_system: false,
    permissions: [
      'student.read',
      'fee.create', 'fee.read', 'fee.update', 'fee.delete', 'fee.collect', 'fee.refund', 'fee.export',
      'report.financial',
    ],
  },
  {
    id: 'role-003',
    name: 'Class Teacher',
    code: 'CLASS_TEACHER',
    is_system: false,
    permissions: [
      'student.read', 'student.export',
      'class.read', 'section.read',
      'attendance.create', 'attendance.read', 'attendance.update', 'attendance.export',
      'exam.read', 'exam.create', 'exam.update',
      'report.attendance', 'report.student', 'report.exam',
    ],
  },
  {
    id: 'role-004',
    name: 'Receptionist',
    code: 'RECEPTIONIST',
    is_system: false,
    permissions: [
      'student.read', 'student.create',
      'fee.read', 'fee.collect',
      'attendance.read',
    ],
  },
  {
    id: 'role-005',
    name: 'Branch Admin',
    code: 'BRANCH_ADMIN',
    is_system: false,
    permissions: [
      'student.read', 'student.create', 'student.update',
      'teacher.read',
      'class.read', 'class.create', 'class.update',
      'section.read', 'section.create', 'section.update',
      'attendance.read', 'attendance.create',
      'fee.read',
      'user.read', 'user.create',
      'branch.create', 'branch.read', 'branch.update', 'branch.delete',
      'report.student', 'report.attendance',
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 2 ▸ USERS  (5 portal users — includes dummy login credentials)
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_USERS = [
  /* ─ 1 ─ MASTER ADMIN — platform-level, manages all schools ─── */
  {
    id: 'user-master-001',
    first_name: 'Zahid',
    last_name: 'Ali Khan',
    email: 'master@cloudsacademy.com',
    password: 'master@123',
    phone: '+92-300-1234567',
    role_code: 'MASTER_ADMIN',
    is_active: true,
    school_code: 'MASTER',
    school: null,
    role: { id: 'master-role', name: 'Master Admin', code: 'MASTER_ADMIN' },
    permissions: [],                 // MASTER_ADMIN bypasses all permission checks
    avatar: null,
    created_at: '2023-01-01T00:00:00.000Z',
  },

  /* ─ 2 ─ SCHOOL ADMIN — full access to all school features ──── */
  {
    id: 'user-002',
    first_name: 'Muhammad',
    last_name: 'Usman',
    email: 'admin@tca.edu.pk',
    password: 'admin@123',
    phone: '+92-321-9876543',
    role_code: 'SCHOOL_ADMIN',
    is_active: true,
    school_code: 'TCA-LHR',
    school: DUMMY_SCHOOL,
    role: DUMMY_ROLES[0],
    permissions: ALL_PERMISSIONS,   // every permission — students, fees, teachers, classes, exams, roles, users
    avatar: null,
    created_at: '2023-04-01T08:00:00.000Z',
  },

  /* ─ 3 ─ FEE MANAGER — fees + student read only ─────────────── */
  {
    id: 'user-003',
    first_name: 'Ayesha',
    last_name: 'Siddiqui',
    email: 'fees@tca.edu.pk',
    password: 'fees@123',
    phone: '+92-333-5556677',
    role_code: 'FEE_MANAGER',
    is_active: true,
    school_code: 'TCA-LHR',
    school: DUMMY_SCHOOL,
    role: DUMMY_ROLES[1],
    permissions: DUMMY_ROLES[1].permissions,
    avatar: null,
    created_at: '2023-06-15T08:00:00.000Z',
  },

  /* ─ 4 ─ CLASS TEACHER — attendance + exams + read ───────────── */
  {
    id: 'user-004',
    first_name: 'Hassan',
    last_name: 'Mahmood',
    email: 'teacher@tca.edu.pk',
    password: 'teacher@123',
    phone: '+92-315-4443322',
    role_code: 'CLASS_TEACHER',
    is_active: true,
    school_code: 'TCA-LHR',
    school: DUMMY_SCHOOL,
    role: DUMMY_ROLES[2],
    permissions: DUMMY_ROLES[2].permissions,
    avatar: null,
    created_at: '2023-08-01T08:00:00.000Z',
  },

  /* ─ 5 ─ RECEPTIONIST — minimal: admit students + collect fees ─ */
  {
    id: 'user-005',
    first_name: 'Sarah',
    last_name: 'Noor',
    email: 'reception@tca.edu.pk',
    password: 'reception@123',
    phone: '+92-311-7778899',
    role_code: 'RECEPTIONIST',
    is_active: true,
    school_code: 'TCA-LHR',
    school: DUMMY_SCHOOL,
    role: DUMMY_ROLES[3],
    permissions: DUMMY_ROLES[3].permissions,
    avatar: null,
    created_at: '2024-01-10T08:00:00.000Z',
  },

  /* ─ 6 ─ BRANCH ADMIN — manages branches of a multi-campus school ─ */
  {
    id: 'user-006',
    first_name: 'Tariq',
    last_name: 'Jamil',
    email: 'branch@tca.edu.pk',
    password: 'branch@123',
    phone: '+92-333-4445566',
    role_code: 'BRANCH_ADMIN',
    is_active: true,
    school_code: 'TCA-LHR',
    school: DUMMY_SCHOOL,
    branch_id: 'branch-001',
    branch: null, // will be set after DUMMY_BRANCHES is referenced
    role: DUMMY_ROLES[4],
    permissions: DUMMY_ROLES[4].permissions,
    avatar: null,
    created_at: '2024-03-05T08:00:00.000Z',
  },
];

// Back-fill branch reference on user-006
DUMMY_USERS.find((u) => u.id === 'user-006').branch = DUMMY_BRANCHES[0];

// ──────────────────────────────────────────────────────────────────────────────
// 3 ▸ ACADEMIC YEARS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_ACADEMIC_YEARS = [
  { id: 'year-001', name: '2025–2026', start_date: '2025-04-01', end_date: '2026-03-31', is_current: true,  is_active: true,  school_id: 'school-001' },
  { id: 'year-002', name: '2024–2025', start_date: '2024-04-01', end_date: '2025-03-31', is_current: false, is_active: false, school_id: 'school-001' },
  { id: 'year-003', name: '2023–2024', start_date: '2023-04-01', end_date: '2024-03-31', is_current: false, is_active: false, school_id: 'school-001' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 4 ▸ TEACHERS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_TEACHERS = [
  { id: 'teacher-001', first_name: 'Hassan',   last_name: 'Mahmood',  email: 'teacher@tca.edu.pk',   phone: '+92-315-4443322', employee_id: 'EMP-001', qualification: 'M.Sc Mathematics',  branch_id: 'branch-001', is_active: true,  school_id: 'school-001' },
  { id: 'teacher-002', first_name: 'Sana',     last_name: 'Tariq',    email: 'sana@tca.edu.pk',      phone: '+92-322-8887766', employee_id: 'EMP-002', qualification: 'B.Ed English',       branch_id: 'branch-001', is_active: true,  school_id: 'school-001' },
  { id: 'teacher-003', first_name: 'Adnan',    last_name: 'Iqbal',    email: 'adnan@tca.edu.pk',     phone: '+92-345-6665544', employee_id: 'EMP-003', qualification: 'M.A Urdu',           branch_id: 'branch-001', is_active: true,  school_id: 'school-001' },
  { id: 'teacher-004', first_name: 'Rabia',    last_name: 'Nawaz',    email: 'rabia@tca.edu.pk',     phone: '+92-311-2223344', employee_id: 'EMP-004', qualification: 'B.Sc Computer Sci',  branch_id: 'branch-002', is_active: true,  school_id: 'school-001' },
  { id: 'teacher-005', first_name: 'Bilal',    last_name: 'Chaudhry', email: 'bilal@tca.edu.pk',     phone: '+92-302-9990011', employee_id: 'EMP-005', qualification: 'M.Sc Physics',       branch_id: 'branch-002', is_active: false, school_id: 'school-001' },
  { id: 'teacher-006', first_name: 'Nadia',    last_name: 'Rehman',   email: 'nadia@tca.edu.pk',     phone: '+92-333-1112233', employee_id: 'EMP-006', qualification: 'M.Ed Biology',       branch_id: 'branch-001', is_active: true,  school_id: 'school-001' },
  { id: 'teacher-007', first_name: 'Kamran',   last_name: 'Shah',     email: 'kamran@tca.edu.pk',    phone: '+92-321-4445566', employee_id: 'EMP-007', qualification: 'B.Sc Chemistry',     branch_id: 'branch-001', is_active: true,  school_id: 'school-001' },
  { id: 'teacher-008', first_name: 'Zobia',    last_name: 'Aslam',    email: 'zobia@tca.edu.pk',     phone: '+92-300-7778899', employee_id: 'EMP-008', qualification: 'M.A History',        branch_id: 'branch-002', is_active: true,  school_id: 'school-001' },
  { id: 'teacher-009', first_name: 'Imran',    last_name: 'Baig',     email: 'imran@tca.edu.pk',     phone: '+92-313-6667788', employee_id: 'EMP-009', qualification: 'M.Sc Statistics',    branch_id: 'branch-002', is_active: true,  school_id: 'school-001' },
  { id: 'teacher-010', first_name: 'Amna',     last_name: 'Farooq',   email: 'amna.t@tca.edu.pk',    phone: '+92-345-3334455', employee_id: 'EMP-010', qualification: 'B.Ed Islamiat',      branch_id: 'branch-001', is_active: false, school_id: 'school-001' },
  { id: 'teacher-011', first_name: 'Tariq',    last_name: 'Aziz',     email: 'taziz@tca.edu.pk',     phone: '+92-302-2223344', employee_id: 'EMP-011', qualification: 'M.Phil Economics',   branch_id: 'branch-001', is_active: true,  school_id: 'school-001' },
  { id: 'teacher-012', first_name: 'Farah',    last_name: 'Qureshi',  email: 'farah@tca.edu.pk',     phone: '+92-311-5556677', employee_id: 'EMP-012', qualification: 'B.Ed Arts',          branch_id: 'branch-002', is_active: true,  school_id: 'school-001' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 5 ▸ CLASSES
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_CLASSES = [
  { id: 'class-001', name: 'Class 1',  grade_level: 1, classTeacher: DUMMY_TEACHERS[0], sections: [{ id: 's-001', name: 'A' }, { id: 's-002', name: 'B' }], student_count: 58, branch_id: 'branch-001', is_active: true, school_id: 'school-001' },
  { id: 'class-002', name: 'Class 2',  grade_level: 2, classTeacher: DUMMY_TEACHERS[1], sections: [{ id: 's-003', name: 'A' }, { id: 's-004', name: 'B' }], student_count: 52, branch_id: 'branch-001', is_active: true, school_id: 'school-001' },
  { id: 'class-003', name: 'Class 3',  grade_level: 3, classTeacher: DUMMY_TEACHERS[2], sections: [{ id: 's-005', name: 'A' }],                               student_count: 45, branch_id: 'branch-001', is_active: true, school_id: 'school-001' },
  { id: 'class-004', name: 'Class 4',  grade_level: 4, classTeacher: DUMMY_TEACHERS[3], sections: [{ id: 's-006', name: 'A' }, { id: 's-007', name: 'B' }], student_count: 60, branch_id: 'branch-002', is_active: true, school_id: 'school-001' },
  { id: 'class-005', name: 'Class 5',  grade_level: 5, classTeacher: DUMMY_TEACHERS[4], sections: [{ id: 's-008', name: 'A' }],                               student_count: 40, branch_id: 'branch-002', is_active: true, school_id: 'school-001' },
  { id: 'class-006', name: 'Class 6',  grade_level: 6, classTeacher: DUMMY_TEACHERS[0], sections: [{ id: 's-009', name: 'A' }, { id: 's-010', name: 'B' }], student_count: 55, branch_id: 'branch-002', is_active: true, school_id: 'school-001' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 6 ▸ STUDENTS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_STUDENTS = [
  { id: 'stu-001', first_name: 'Ali',       last_name: 'Raza',       roll_number: 'TCA-001', email: 'ali@student.tca',    phone: '+92-300-1110001', gender: 'male',   date_of_birth: '2014-03-15', class_id: 'class-001', class: DUMMY_CLASSES[0], academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true },
  { id: 'stu-002', first_name: 'Fatima',    last_name: 'Malik',      roll_number: 'TCA-002', email: 'fatima@student.tca', phone: '+92-300-1110002', gender: 'female', date_of_birth: '2014-07-22', class_id: 'class-001', class: DUMMY_CLASSES[0], academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true },
  { id: 'stu-003', first_name: 'Zaid',      last_name: 'Khan',       roll_number: 'TCA-003', email: 'zaid@student.tca',   phone: '+92-300-1110003', gender: 'male',   date_of_birth: '2013-11-05', class_id: 'class-002', class: DUMMY_CLASSES[1], academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true },
  { id: 'stu-004', first_name: 'Mariam',    last_name: 'Hussain',    roll_number: 'TCA-004', email: null,                 phone: '+92-300-1110004', gender: 'female', date_of_birth: '2013-02-18', class_id: 'class-002', class: DUMMY_CLASSES[1], academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true },
  { id: 'stu-005', first_name: 'Omar',      last_name: 'Farooq',     roll_number: 'TCA-005', email: null,                 phone: '+92-300-1110005', gender: 'male',   date_of_birth: '2012-09-30', class_id: 'class-003', class: DUMMY_CLASSES[2], academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true },
  { id: 'stu-006', first_name: 'Hina',      last_name: 'Butt',       roll_number: 'TCA-006', email: null,                 phone: '+92-300-1110006', gender: 'female', date_of_birth: '2012-06-12', class_id: 'class-003', class: DUMMY_CLASSES[2], academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true },
  { id: 'stu-007', first_name: 'Usman',     last_name: 'Sheikh',     roll_number: 'TCA-007', email: null,                 phone: '+92-300-1110007', gender: 'male',   date_of_birth: '2011-04-08', class_id: 'class-004', class: DUMMY_CLASSES[3], academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true },
  { id: 'stu-008', first_name: 'Noor',      last_name: 'Ahmed',      roll_number: 'TCA-008', email: null,                 phone: '+92-300-1110008', gender: 'female', date_of_birth: '2011-12-25', class_id: 'class-004', class: DUMMY_CLASSES[3], academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true },
  { id: 'stu-009', first_name: 'Ibrahim',   last_name: 'Qureshi',    roll_number: 'TCA-009', email: null,                 phone: '+92-300-1110009', gender: 'male',   date_of_birth: '2010-08-14', class_id: 'class-005', class: DUMMY_CLASSES[4], academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true },
  { id: 'stu-010', first_name: 'Zainab',    last_name: 'Baig',       roll_number: 'TCA-010', email: null,                 phone: '+92-300-1110010', gender: 'female', date_of_birth: '2010-05-01', class_id: 'class-005', class: DUMMY_CLASSES[4], academic_year_id: 'year-001', branch_id: 'branch-002', is_active: false },
  { id: 'stu-011', first_name: 'Hamza',     last_name: 'Awan',       roll_number: 'TCA-011', email: null,                 phone: '+92-300-1110011', gender: 'male',   date_of_birth: '2009-01-20', class_id: 'class-006', class: DUMMY_CLASSES[5], academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true },
  { id: 'stu-012', first_name: 'Amna',      last_name: 'Ijaz',       roll_number: 'TCA-012', email: null,                 phone: '+92-300-1110012', gender: 'female', date_of_birth: '2009-10-07', class_id: 'class-006', class: DUMMY_CLASSES[5], academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true },
];

// ──────────────────────────────────────────────────────────────────────────────
// 7 ▸ EXAMS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_EXAMS = [
  { id: 'exam-001', name: 'Mid Term Exam',   type: 'mid_term',  class_id: 'class-001', class: DUMMY_CLASSES[0], academic_year_id: 'year-001', start_date: '2025-10-15', end_date: '2025-10-22', total_marks: 100, passing_marks: 40, is_published: true  },
  { id: 'exam-002', name: 'Final Exam',      type: 'final',     class_id: 'class-001', class: DUMMY_CLASSES[0], academic_year_id: 'year-001', start_date: '2026-02-10', end_date: '2026-02-20', total_marks: 150, passing_marks: 60, is_published: false },
  { id: 'exam-003', name: 'Unit Test 1',     type: 'unit_test', class_id: 'class-002', class: DUMMY_CLASSES[1], academic_year_id: 'year-001', start_date: '2025-09-05', end_date: '2025-09-05', total_marks: 50,  passing_marks: 20, is_published: true  },
  { id: 'exam-004', name: 'Monthly Test',    type: 'monthly',   class_id: 'class-003', class: DUMMY_CLASSES[2], academic_year_id: 'year-001', start_date: '2025-11-01', end_date: '2025-11-02', total_marks: 50,  passing_marks: 20, is_published: true  },
  { id: 'exam-005', name: 'Mid Term Exam',   type: 'mid_term',  class_id: 'class-004', class: DUMMY_CLASSES[3], academic_year_id: 'year-001', start_date: '2025-10-16', end_date: '2025-10-23', total_marks: 100, passing_marks: 40, is_published: true  },
  { id: 'exam-006', name: 'Final Exam',      type: 'final',     class_id: 'class-005', class: DUMMY_CLASSES[4], academic_year_id: 'year-001', start_date: '2026-03-01', end_date: '2026-03-12', total_marks: 200, passing_marks: 80, is_published: false },
];

// ──────────────────────────────────────────────────────────────────────────────
// 8 ▸ FEES
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_FEES = [
  { id: 'fee-001', student_id: 'stu-001', student: DUMMY_STUDENTS[0],  month: 1, year: 2026, amount: 3500, discount: 0,   due_date: '2026-01-10', status: 'paid',    paid_on: '2026-01-08' },
  { id: 'fee-002', student_id: 'stu-001', student: DUMMY_STUDENTS[0],  month: 2, year: 2026, amount: 3500, discount: 0,   due_date: '2026-02-10', status: 'paid',    paid_on: '2026-02-09' },
  { id: 'fee-003', student_id: 'stu-002', student: DUMMY_STUDENTS[1],  month: 1, year: 2026, amount: 3500, discount: 350, due_date: '2026-01-10', status: 'paid',    paid_on: '2026-01-07' },
  { id: 'fee-004', student_id: 'stu-002', student: DUMMY_STUDENTS[1],  month: 2, year: 2026, amount: 3500, discount: 350, due_date: '2026-02-10', status: 'pending', paid_on: null          },
  { id: 'fee-005', student_id: 'stu-003', student: DUMMY_STUDENTS[2],  month: 1, year: 2026, amount: 3500, discount: 0,   due_date: '2026-01-10', status: 'paid',    paid_on: '2026-01-12' },
  { id: 'fee-006', student_id: 'stu-003', student: DUMMY_STUDENTS[2],  month: 2, year: 2026, amount: 3500, discount: 0,   due_date: '2026-02-10', status: 'overdue', paid_on: null          },
  { id: 'fee-007', student_id: 'stu-004', student: DUMMY_STUDENTS[3],  month: 1, year: 2026, amount: 4000, discount: 0,   due_date: '2026-01-10', status: 'partial', paid_on: null          },
  { id: 'fee-008', student_id: 'stu-005', student: DUMMY_STUDENTS[4],  month: 1, year: 2026, amount: 4000, discount: 400, due_date: '2026-01-10', status: 'pending', paid_on: null          },
  { id: 'fee-009', student_id: 'stu-006', student: DUMMY_STUDENTS[5],  month: 2, year: 2026, amount: 4000, discount: 0,   due_date: '2026-02-10', status: 'paid',    paid_on: '2026-02-05' },
  { id: 'fee-010', student_id: 'stu-007', student: DUMMY_STUDENTS[6],  month: 1, year: 2026, amount: 4500, discount: 0,   due_date: '2026-01-10', status: 'overdue', paid_on: null          },
  { id: 'fee-011', student_id: 'stu-008', student: DUMMY_STUDENTS[7],  month: 2, year: 2026, amount: 4500, discount: 450, due_date: '2026-02-10', status: 'pending', paid_on: null          },
  { id: 'fee-012', student_id: 'stu-009', student: DUMMY_STUDENTS[8],  month: 1, year: 2026, amount: 4500, discount: 0,   due_date: '2026-01-10', status: 'paid',    paid_on: '2026-01-09' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 9 ▸ MASTER-ADMIN  — Schools, Subscriptions, Platform Stats
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_MA_SCHOOLS = [
  {
    id: 'school-001', name: 'The Clouds Academy',          code: 'TCA-LHR',  address: 'Gulberg III, Lahore',        has_branches: false, is_active: true,  created_at: '2023-04-01T00:00:00.000Z',
    subscription: { plan: 'premium',  status: 'active', expires_at: '2026-12-31' },
  },
  {
    id: 'school-002', name: 'Beaconhouse Institute',        code: 'BHI-KHI',  address: 'DHA Phase 5, Karachi',       has_branches: true,  is_active: true,  created_at: '2023-07-15T00:00:00.000Z',
    subscription: { plan: 'basic',    status: 'active', expires_at: '2026-07-14' },
  },
  {
    id: 'school-003', name: 'Roots International Islamabad', code: 'RIS-ISL', address: 'F-7/1, Islamabad',           has_branches: true,  is_active: true,  created_at: '2024-01-20T00:00:00.000Z',
    subscription: { plan: 'standard', status: 'active', expires_at: '2026-01-19' },
  },
  {
    id: 'school-004', name: 'City Grammar School',           code: 'CGS-MUL', address: 'Model Town, Multan',         has_branches: false, is_active: false, created_at: '2024-03-10T00:00:00.000Z',
    subscription: { plan: 'basic',    status: 'expired', expires_at: '2025-03-09' },
  },
  {
    id: 'school-005', name: 'Allied School Faisalabad',      code: 'ASF-FSD', address: 'Peoples Colony, Faisalabad', has_branches: false, is_active: true,  created_at: '2024-06-01T00:00:00.000Z',
    subscription: { plan: 'standard', status: 'active', expires_at: '2026-05-31' },
  },
];

export const DUMMY_MA_SUBSCRIPTIONS = [
  { id: 'sub-001', school_id: 'school-001', school: DUMMY_MA_SCHOOLS[0], plan: 'premium',  status: 'active',    start_date: '2024-01-01', expires_at: '2026-12-31', amount: 120000 },
  { id: 'sub-002', school_id: 'school-002', school: DUMMY_MA_SCHOOLS[1], plan: 'basic',    status: 'active',    start_date: '2025-07-15', expires_at: '2026-07-14', amount: 24000  },
  { id: 'sub-003', school_id: 'school-003', school: DUMMY_MA_SCHOOLS[2], plan: 'standard', status: 'active',    start_date: '2025-01-20', expires_at: '2026-01-19', amount: 60000  },
  { id: 'sub-004', school_id: 'school-004', school: DUMMY_MA_SCHOOLS[3], plan: 'basic',    status: 'expired',   start_date: '2024-03-10', expires_at: '2025-03-09', amount: 24000  },
  { id: 'sub-005', school_id: 'school-005', school: DUMMY_MA_SCHOOLS[4], plan: 'standard', status: 'active',    start_date: '2024-06-01', expires_at: '2026-05-31', amount: 60000  },
  { id: 'sub-006', school_id: 'school-001', school: DUMMY_MA_SCHOOLS[0], plan: 'standard', status: 'cancelled', start_date: '2023-04-01', expires_at: '2024-03-31', amount: 60000  },
];

export const DUMMY_MA_USERS = [
  { id: 'user-master-001', first_name: 'Zahid',     last_name: 'Ali Khan',  email: 'master@cloudsacademy.com',  role: { name: 'Master Admin'  }, school: null,               is_active: true,  created_at: '2023-01-01T00:00:00.000Z' },
  { id: 'user-002',        first_name: 'Muhammad',  last_name: 'Usman',     email: 'admin@tca.edu.pk',          role: { name: 'School Admin'  }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2023-04-01T00:00:00.000Z' },
  { id: 'user-003',        first_name: 'Ayesha',    last_name: 'Siddiqui',  email: 'fees@tca.edu.pk',           role: { name: 'Fee Manager'   }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2023-06-15T00:00:00.000Z' },
  { id: 'user-004',        first_name: 'Hassan',    last_name: 'Mahmood',   email: 'teacher@tca.edu.pk',        role: { name: 'Class Teacher' }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2023-08-01T00:00:00.000Z' },
  { id: 'user-005',        first_name: 'Sarah',     last_name: 'Noor',      email: 'reception@tca.edu.pk',      role: { name: 'Receptionist'  }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2024-01-10T00:00:00.000Z' },
  { id: 'user-006',        first_name: 'Tariq',     last_name: 'Jamil',     email: 'branch@tca.edu.pk',         role: { name: 'Branch Admin'  }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2024-03-05T00:00:00.000Z' },
  { id: 'user-007',        first_name: 'Imran',     last_name: 'Akhtar',    email: 'principal@bhi.edu.pk',      role: { name: 'School Admin'  }, school: DUMMY_MA_SCHOOLS[1], is_active: true,  created_at: '2023-07-15T00:00:00.000Z' },
  { id: 'user-008',        first_name: 'Samina',    last_name: 'Murtaza',   email: 'admin@ris.edu.pk',          role: { name: 'School Admin'  }, school: DUMMY_MA_SCHOOLS[2], is_active: false, created_at: '2024-01-20T00:00:00.000Z' },
];

export const DUMMY_MA_STATS = {
  total_schools:        DUMMY_MA_SCHOOLS.length,
  active_schools:       DUMMY_MA_SCHOOLS.filter((s) => s.is_active).length,
  active_subscriptions: DUMMY_MA_SUBSCRIPTIONS.filter((s) => s.status === 'active').length,
  total_users:          DUMMY_MA_USERS.length,
  total_students:       DUMMY_STUDENTS.length,
  revenue_this_month:   288000,
};

// ───────────────────────────────────────────────────────────────────────────────
// 10 ▸ SUBSCRIPTION TEMPLATES  — Plan definitions managed by Master Admin
// ───────────────────────────────────────────────────────────────────────────────
export const DUMMY_MA_SUBSCRIPTION_TEMPLATES = [
  {
    id: 'tpl-001',
    name: 'Basic',
    price_monthly: 2000,
    duration_months: 12,
    max_students: 200,
    max_teachers: 20,
    features: ['Students (up to 200)', 'Teachers (up to 20)', 'Attendance Tracking', 'Fee Management'],
    is_active: true,
    created_at: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'tpl-002',
    name: 'Standard',
    price_monthly: 5000,
    duration_months: 12,
    max_students: 500,
    max_teachers: 60,
    features: ['Students (up to 500)', 'Teachers (up to 60)', 'Attendance Tracking', 'Fee Management', 'Exam Management', 'Reports'],
    is_active: true,
    created_at: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'tpl-003',
    name: 'Premium',
    price_monthly: 10000,
    duration_months: 12,
    max_students: 2000,
    max_teachers: 200,
    features: ['Students (up to 2000)', 'Teachers (up to 200)', 'All Modules', 'Multi-Branch Support', 'Advanced Reports', 'Priority Support'],
    is_active: true,
    created_at: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'tpl-004',
    name: 'Enterprise',
    price_monthly: 20000,
    duration_months: 12,
    max_students: null,
    max_teachers: null,
    features: ['Unlimited Students', 'Unlimited Teachers', 'All Modules', 'Unlimited Branches', 'Custom Integrations', 'Dedicated Support', 'SLA Guarantee'],
    is_active: true,
    created_at: '2023-01-01T00:00:00.000Z',
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 10 ▸ DASHBOARD STATS  (school portal)
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_DASHBOARD_STATS = {
  total_students:   DUMMY_STUDENTS.length,
  active_students:  DUMMY_STUDENTS.filter((s) => s.is_active).length,
  total_teachers:   DUMMY_TEACHERS.length,
  active_teachers:  DUMMY_TEACHERS.filter((t) => t.is_active).length,
  total_classes:    DUMMY_CLASSES.length,
  fees_collected:   DUMMY_FEES.filter((f) => f.status === 'paid').reduce((sum, f) => sum + (f.amount - (f.discount ?? 0)), 0),
  fees_pending:     DUMMY_FEES.filter((f) => ['pending', 'overdue', 'partial'].includes(f.status)).reduce((sum, f) => sum + f.amount, 0),
  upcoming_exams:   DUMMY_EXAMS.filter((e) => !e.is_published).length,
};

// ──────────────────────────────────────────────────────────────────────────────
// 10.1 ▸ CHART DATA  (used by dashboard charts)
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_CHART_DATA = {
  // Monthly attendance % — last 8 months
  attendance: [
    { month: 'Jul', present: 92, absent: 5, late: 3 },
    { month: 'Aug', present: 88, absent: 8, late: 4 },
    { month: 'Sep', present: 91, absent: 6, late: 3 },
    { month: 'Oct', present: 85, absent: 10, late: 5 },
    { month: 'Nov', present: 87, absent: 9, late: 4 },
    { month: 'Dec', present: 78, absent: 16, late: 6 },
    { month: 'Jan', present: 90, absent: 7, late: 3 },
    { month: 'Feb', present: 93, absent: 5, late: 2 },
  ],

  // Monthly fees — amount in PKR (thousands)
  fees: [
    { month: 'Jul', collected: 245000, pending: 32000 },
    { month: 'Aug', collected: 278000, pending: 18000 },
    { month: 'Sep', collected: 260000, pending: 25000 },
    { month: 'Oct', collected: 290000, pending: 15000 },
    { month: 'Nov', collected: 275000, pending: 22000 },
    { month: 'Dec', collected: 230000, pending: 45000 },
    { month: 'Jan', collected: 285000, pending: 12000 },
    { month: 'Feb', collected: 310000, pending: 8000 },
  ],

  // Students per class
  enrollment: [
    { class: 'Class 1', students: 58, boys: 30, girls: 28 },
    { class: 'Class 2', students: 52, boys: 26, girls: 26 },
    { class: 'Class 3', students: 45, boys: 22, girls: 23 },
    { class: 'Class 4', students: 60, boys: 31, girls: 29 },
    { class: 'Class 5', students: 40, boys: 20, girls: 20 },
    { class: 'Class 6', students: 55, boys: 28, girls: 27 },
  ],

  // Gender distribution
  gender: [
    { name: 'Boys',  value: 157, fill: 'hsl(var(--chart-1))' },
    { name: 'Girls', value: 153, fill: 'hsl(var(--chart-2))' },
  ],

  // Fee status breakdown
  feeStatus: [
    { name: 'Paid',    value: 68, fill: 'hsl(var(--chart-1))' },
    { name: 'Pending', value: 20, fill: 'hsl(var(--chart-3))' },
    { name: 'Overdue', value: 8,  fill: 'hsl(var(--chart-4))' },
    { name: 'Partial', value: 4,  fill: 'hsl(var(--chart-2))' },
  ],

  // Recent activities
  recentActivity: [
    { id: 1, type: 'fee',        message: 'Ali Raza paid fee for February 2026',       time: '10 min ago',  icon: 'CreditCard' },
    { id: 2, type: 'student',    message: 'New student Hina Shah enrolled in Class 3',  time: '1 hour ago',  icon: 'UserPlus'   },
    { id: 3, type: 'exam',       message: 'Mid-term exam scheduled for Class 4',        time: '2 hours ago', icon: 'BookOpen'   },
    { id: 4, type: 'attendance', message: 'Attendance marked — 93% present today',      time: '3 hours ago', icon: 'CheckCircle'},
    { id: 5, type: 'teacher',    message: 'Hassan Mahmood updated Class 1 syllabus',    time: '4 hours ago', icon: 'GraduationCap'},
    { id: 6, type: 'fee',        message: 'Fee reminder sent to 12 overdue students',   time: 'Yesterday',   icon: 'Bell'       },
  ],
};

// ──────────────────────────────────────────────────────────────────────────────
// 11 ▸ HELPER — paginate array (for service fallback)
// ──────────────────────────────────────────────────────────────────────────────
export function paginate(arr, page = 1, limit = 20) {
  const total      = arr.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const rows       = arr.slice((page - 1) * limit, page * limit);
  return { data: { rows, total, page, totalPages } };
}

// ──────────────────────────────────────────────────────────────────────────────
// 12 ▸ DUMMY LOGIN — called by login page when API is not reachable
// ──────────────────────────────────────────────────────────────────────────────
/**
 * dummyLogin({ school_code, email, password })
 * Returns { user, access_token: 'dummy-token' }  or throws Error.
 */
export function dummyLogin({ school_code, email, password }) {
  const user = DUMMY_USERS.find(
    (u) =>
      u.school_code.toLowerCase() === school_code.trim().toLowerCase() &&
      u.email.toLowerCase()       === email.trim().toLowerCase() &&
      u.password                  === password,
  );
  if (!user) throw new Error('Invalid credentials');
  // Return a shape identical to what the real API returns
  return {
    user: {
      id:          user.id,
      first_name:  user.first_name,
      last_name:   user.last_name,
      email:       user.email,
      phone:       user.phone,
      role_code:   user.role_code,
      school_id:   user.school?.id ?? null,
      school:      user.school,
      role:        user.role,
      permissions: user.permissions,
    },
    access_token: `dummy-token-${user.id}`,
  };
}
