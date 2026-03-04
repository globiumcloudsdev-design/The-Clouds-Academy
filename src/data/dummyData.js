/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   The Clouds Academy — Complete Dummy / Seed Data           ║
 * ║                                                              ║
 * ║  Used as fallback when backend API is unreachable.          ║
 * ║  Import DUMMY_USERS to show demo login credentials.          ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Demo Credentials
 * ──────────────────────────────────────────────────────────────────────────────────────
 *  Role / Type          │ Inst. Code │ Email                    │ Password
 * ─────────────────────┼────────────┼──────────────────────────┼───────────────
 *  Master Admin         │ MASTER     │ master@cloudsacademy.com │ master@123
 *  Academy Admin (TCA)  │ TCA-LHR    │ admin@tca.edu.pk         │ admin@123
 *  Fee Manager          │ TCA-LHR    │ fees@tca.edu.pk          │ fees@123
 *  Class Teacher        │ TCA-LHR    │ teacher@tca.edu.pk       │ teacher@123
 *  Receptionist         │ TCA-LHR    │ reception@tca.edu.pk     │ reception@123
 *  Branch Admin         │ TCA-LHR    │ branch@tca.edu.pk        │ branch@123
 *  Coaching Admin (SCC) │ SCC-LHR    │ admin@scc.edu.pk         │ coaching@123
 *  Academy Admin (HIA)  │ HIA-ISL    │ admin@hia.edu.pk         │ academy@123
 *  College Admin (PCC)  │ PCC-LHR    │ admin@pcc.edu.pk         │ college@123
 * ──────────────────────────────────────────────────────────────────────────────────────
 */

// ──────────────────────────────────────────────────────────────────────────────
// 0 ▸ INSTITUTE TYPES
// ──────────────────────────────────────────────────────────────────────────────
export const INSTITUTE_TYPES = [
  {
    value: 'school',
    label: 'School',
    icon: '🏫',
    description: 'K-12 / O-Level / A-Level institutions',
    extra_fields: [
      { name: 'affiliation_board', label: 'Affiliation Board', placeholder: 'e.g. Punjab Board, Cambridge', required: false },
      { name: 'grade_range',       label: 'Grade Range',        placeholder: 'e.g. Class 1 – 12',          required: false },
    ],
  },
  {
    value: 'coaching',
    label: 'Coaching Center',
    icon: '📚',
    description: 'Subject-specific or entrance-test coaching',
    extra_fields: [
      { name: 'subject_focus', label: 'Subject / Focus Area', placeholder: 'e.g. Mathematics, Physics, MDCAT', required: false },
      { name: 'target_exams', label: 'Target Exams',          placeholder: 'e.g. MDCAT, ECAT, CSS',            required: false },
    ],
  },
  {
    value: 'academy',
    label: 'Academy',
    icon: '🎓',
    description: 'Skill-based or specialized training academies',
    extra_fields: [
      { name: 'specialization', label: 'Specialization', placeholder: 'e.g. IT, Sports, Arts, Language', required: false },
    ],
  },
  {
    value: 'college',
    label: 'College',
    icon: '🏛️',
    description: 'Intermediate / Bachelors level colleges',
    extra_fields: [
      { name: 'affiliation_board',  label: 'Affiliation / University', placeholder: 'e.g. University of Punjab, HEC', required: false },
      { name: 'degree_programs',    label: 'Degree Programs',           placeholder: 'e.g. FSc, FA, B.Com, BS',        required: false },
    ],
  },
  {
    value: 'university',
    label: 'University',
    icon: '🏗️',
    description: 'Degree-awarding higher education institutes',
    extra_fields: [
      { name: 'hec_charter',  label: 'HEC Charter No.',  placeholder: 'e.g. HEC-2005-066', required: false },
      { name: 'faculties',    label: 'Faculties / Departments', placeholder: 'e.g. Engineering, Medicine, Law', required: false },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 0.1 ▸ INSTITUTE  (the currently logged-in school/institute)
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_SCHOOL = {
  id: 'school-001',
  name: 'The Clouds Academy',
  code: 'TCA-LHR',
  institute_type: 'academy',
  address: '12-B, Gulberg III, Lahore, Punjab',
  phone: '+92-42-35761234',
  email: 'info@tca.edu.pk',
  website: 'https://tca.edu.pk',
  logo_url: null,
  has_branches: true,
  is_active: true,
  created_at: '2023-04-01T08:00:00.000Z',
  // institute-type-specific
  specialization: 'General Education',
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
  'admission.create', 'admission.read', 'admission.update', 'admission.delete', 'admission.approve',
  'parent.create', 'parent.read', 'parent.update', 'parent.delete',
  'teacher.create', 'teacher.read', 'teacher.update', 'teacher.delete',
  'class.create',   'class.read',   'class.update',   'class.delete',
  'section.create', 'section.read', 'section.update', 'section.delete',
  'subject.create', 'subject.read', 'subject.update', 'subject.delete',
  'timetable.create', 'timetable.read', 'timetable.update', 'timetable.delete',
  'attendance.create', 'attendance.read', 'attendance.update', 'attendance.export',
  'fee.create', 'fee.read', 'fee.update', 'fee.delete', 'fee.collect', 'fee.refund', 'fee.export',
  'fee_template.create', 'fee_template.read', 'fee_template.update', 'fee_template.delete', 'fee_template.assign',
  'exam.create', 'exam.read', 'exam.update', 'exam.delete', 'exam.publish',
  'payroll.read', 'payroll.create', 'payroll.update', 'payroll.delete', 'payroll.generate', 'payroll.export',
  'leave.read', 'leave.create', 'leave.approve',
  'notice.create', 'notice.read', 'notice.update', 'notice.delete',
  'notification.send',
  'role.create', 'role.read', 'role.update', 'role.delete', 'role.assign',
  'user.create', 'user.read', 'user.update', 'user.delete',
  'academic_year.create', 'academic_year.read', 'academic_year.update', 'academic_year.delete',
  'school.update', 'school.settings', 'school.assign_role',
  'branch.create', 'branch.read', 'branch.update', 'branch.delete',
  'report.financial', 'report.attendance', 'report.student', 'report.exam', 'report.salary', 'report.export',
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
      'parent.read',
      'fee.create', 'fee.read', 'fee.update', 'fee.delete', 'fee.collect', 'fee.refund', 'fee.export',
      'fee_template.read',
      'report.financial', 'report.export',
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
      'timetable.read',
      'attendance.create', 'attendance.read', 'attendance.update', 'attendance.export',
      'exam.read', 'exam.create', 'exam.update',
      'notice.read',
      'report.attendance', 'report.student', 'report.exam', 'report.export',
    ],
  },
  {
    id: 'role-004',
    name: 'Receptionist',
    code: 'RECEPTIONIST',
    is_system: false,
    permissions: [
      'student.read', 'student.create',
      'admission.create', 'admission.read',
      'parent.create', 'parent.read',
      'fee.read', 'fee.collect',
      'attendance.read',
      'notice.read',
    ],
  },
  {
    id: 'role-005',
    name: 'Branch Admin',
    code: 'BRANCH_ADMIN',
    is_system: false,
    permissions: [
      'student.read', 'student.create', 'student.update', 'student.export',
      'admission.read', 'admission.create', 'admission.update', 'admission.approve',
      'parent.read', 'parent.create',
      'teacher.read',
      'class.read', 'class.create', 'class.update',
      'section.read', 'section.create', 'section.update',
      'timetable.read',
      'attendance.read', 'attendance.create',
      'fee.read', 'fee_template.read',
      'notice.read', 'notice.create',
      'user.read', 'user.create',
      'branch.create', 'branch.read', 'branch.update', 'branch.delete',
      'report.student', 'report.attendance', 'report.export',
    ],
  },
  {
    id: 'role-006',
    name: 'HR Manager',
    code: 'HR_MANAGER',
    is_system: false,
    permissions: [
      'teacher.read',
      'payroll.read', 'payroll.create', 'payroll.update', 'payroll.generate', 'payroll.export',
      'leave.read', 'leave.create', 'leave.approve',
      'attendance.read', 'attendance.export',
      'report.salary', 'report.attendance', 'report.export',
    ],
  },
  {
    id: 'role-007',
    name: 'Admission Officer',
    code: 'ADMISSION_OFFICER',
    is_system: false,
    permissions: [
      'admission.create', 'admission.read', 'admission.update', 'admission.approve',
      'student.create', 'student.read',
      'parent.create', 'parent.read',
      'class.read', 'section.read',
      'fee_template.read',
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

// ── 3 demo accounts for other institute types
export const DUMMY_COACHING_INSTITUTE = {
  id: 'inst-006', name: 'Star Coaching Center', code: 'SCC-LHR',
  institute_type: 'coaching', subject_focus: 'Mathematics, Physics, Chemistry',
  target_exams: 'MDCAT, ECAT', has_branches: false, is_active: true,
};
export const DUMMY_ACADEMY_INSTITUTE = {
  id: 'inst-007', name: 'Horizon IT Academy', code: 'HIA-ISL',
  institute_type: 'academy', specialization: 'Information Technology & Programming',
  has_branches: true, is_active: true,
};
export const DUMMY_COLLEGE_INSTITUTE = {
  id: 'inst-008', name: 'Punjab College of Commerce', code: 'PCC-LHR',
  institute_type: 'college', affiliation_board: 'University of Punjab',
  degree_programs: 'FSc, FA, ICS, I.Com, B.Com', has_branches: true, is_active: true,
};

DUMMY_USERS.push(
  {
    id: 'user-009',
    first_name: 'Khalid',
    last_name: 'Mehmood',
    email: 'admin@scc.edu.pk',
    password: 'coaching@123',
    phone: '+92-321-1230009',
    role_code: 'SCHOOL_ADMIN',
    is_active: true,
    school_code: 'SCC-LHR',
    school: DUMMY_COACHING_INSTITUTE,
    role: DUMMY_ROLES[0],
    permissions: ALL_PERMISSIONS,
    avatar: null,
    created_at: '2025-01-10T08:00:00.000Z',
  },
  {
    id: 'user-010',
    first_name: 'Zara',
    last_name: 'Hashmi',
    email: 'admin@hia.edu.pk',
    password: 'academy@123',
    phone: '+92-333-1230010',
    role_code: 'SCHOOL_ADMIN',
    is_active: true,
    school_code: 'HIA-ISL',
    school: DUMMY_ACADEMY_INSTITUTE,
    role: DUMMY_ROLES[0],
    permissions: ALL_PERMISSIONS,
    avatar: null,
    created_at: '2025-03-20T08:00:00.000Z',
  },
  {
    id: 'user-011',
    first_name: 'Naveed',
    last_name: 'Chaudhry',
    email: 'admin@pcc.edu.pk',
    password: 'college@123',
    phone: '+92-302-1230011',
    role_code: 'SCHOOL_ADMIN',
    is_active: true,
    school_code: 'PCC-LHR',
    school: DUMMY_COLLEGE_INSTITUTE,
    role: DUMMY_ROLES[0],
    permissions: ALL_PERMISSIONS,
    avatar: null,
    created_at: '2025-05-01T08:00:00.000Z',
  },
);

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
  { id: 'teacher-001', first_name: 'Hassan',   last_name: 'Mahmood',  email: 'teacher@tca.edu.pk',   phone: '+92-315-4443322', employee_id: 'EMP-001', qualification: 'M.Sc Mathematics',  designation: 'Senior Teacher',  branch_id: 'branch-001', is_active: true,  school_id: 'school-001', joined_date: '2023-04-01', salary_grade: 'G3', basic_salary: 55000, allowances: 8000, subjects: ['Mathematics', 'Statistics'],   cnic: '35202-1234567-1', address: 'House 3, Gulberg, Lahore' },
  { id: 'teacher-002', first_name: 'Sana',     last_name: 'Tariq',    email: 'sana@tca.edu.pk',      phone: '+92-322-8887766', employee_id: 'EMP-002', qualification: 'B.Ed English',       designation: 'Teacher',         branch_id: 'branch-001', is_active: true,  school_id: 'school-001', joined_date: '2023-06-01', salary_grade: 'G2', basic_salary: 40000, allowances: 5000, subjects: ['English', 'Literature'],      cnic: '35202-2345678-2', address: 'Flat 4, Garden Town, Lahore' },
  { id: 'teacher-003', first_name: 'Adnan',    last_name: 'Iqbal',    email: 'adnan@tca.edu.pk',     phone: '+92-345-6665544', employee_id: 'EMP-003', qualification: 'M.A Urdu',           designation: 'Teacher',         branch_id: 'branch-001', is_active: true,  school_id: 'school-001', joined_date: '2023-06-15', salary_grade: 'G2', basic_salary: 38000, allowances: 5000, subjects: ['Urdu', 'Islamiat'],           cnic: '35202-3456789-3', address: 'House 11, Model Town, Lahore' },
  { id: 'teacher-004', first_name: 'Rabia',    last_name: 'Nawaz',    email: 'rabia@tca.edu.pk',     phone: '+92-311-2223344', employee_id: 'EMP-004', qualification: 'B.Sc Computer Sci',  designation: 'Teacher',         branch_id: 'branch-002', is_active: true,  school_id: 'school-001', joined_date: '2024-01-15', salary_grade: 'G2', basic_salary: 42000, allowances: 5000, subjects: ['Computer Science', 'General Science'], cnic: '35202-4567890-4', address: 'Plot 8, DHA Phase 4, Lahore' },
  { id: 'teacher-005', first_name: 'Bilal',    last_name: 'Chaudhry', email: 'bilal@tca.edu.pk',     phone: '+92-302-9990011', employee_id: 'EMP-005', qualification: 'M.Sc Physics',       designation: 'Senior Teacher',  branch_id: 'branch-002', is_active: false, school_id: 'school-001', joined_date: '2023-08-01', salary_grade: 'G3', basic_salary: 52000, allowances: 7000, subjects: ['Physics'],                    cnic: '35202-5678901-5', address: 'House 20, Iqbal Town, Lahore' },
  { id: 'teacher-006', first_name: 'Nadia',    last_name: 'Rehman',   email: 'nadia@tca.edu.pk',     phone: '+92-333-1112233', employee_id: 'EMP-006', qualification: 'M.Ed Biology',       designation: 'Teacher',         branch_id: 'branch-001', is_active: true,  school_id: 'school-001', joined_date: '2023-04-01', salary_grade: 'G2', basic_salary: 40000, allowances: 5000, subjects: ['Biology', 'General Science'],  cnic: '35202-6789012-6', address: 'House 7, Cavalry Ground, Lahore' },
  { id: 'teacher-007', first_name: 'Kamran',   last_name: 'Shah',     email: 'kamran@tca.edu.pk',    phone: '+92-321-4445566', employee_id: 'EMP-007', qualification: 'B.Sc Chemistry',     designation: 'Teacher',         branch_id: 'branch-001', is_active: true,  school_id: 'school-001', joined_date: '2023-09-01', salary_grade: 'G2', basic_salary: 38000, allowances: 5000, subjects: ['Chemistry'],                   cnic: '35202-7890123-7', address: 'House 14, Johar Town, Lahore' },
  { id: 'teacher-008', first_name: 'Zobia',    last_name: 'Aslam',    email: 'zobia@tca.edu.pk',     phone: '+92-300-7778899', employee_id: 'EMP-008', qualification: 'M.A History',        designation: 'Teacher',         branch_id: 'branch-002', is_active: true,  school_id: 'school-001', joined_date: '2024-01-20', salary_grade: 'G2', basic_salary: 39000, allowances: 5000, subjects: ['History', 'Social Studies'],   cnic: '35202-8901234-8', address: 'House 3, Bahria Town, Lahore' },
  { id: 'teacher-009', first_name: 'Imran',    last_name: 'Baig',     email: 'imran@tca.edu.pk',     phone: '+92-313-6667788', employee_id: 'EMP-009', qualification: 'M.Sc Statistics',    designation: 'Senior Teacher',  branch_id: 'branch-002', is_active: true,  school_id: 'school-001', joined_date: '2023-04-01', salary_grade: 'G3', basic_salary: 53000, allowances: 8000, subjects: ['Mathematics', 'Statistics'],   cnic: '35202-9012345-9', address: 'House 6, Lake City, Lahore' },
  { id: 'teacher-010', first_name: 'Amna',     last_name: 'Farooq',   email: 'amna.t@tca.edu.pk',    phone: '+92-345-3334455', employee_id: 'EMP-010', qualification: 'B.Ed Islamiat',      designation: 'Teacher',         branch_id: 'branch-001', is_active: false, school_id: 'school-001', joined_date: '2023-11-01', salary_grade: 'G1', basic_salary: 32000, allowances: 4000, subjects: ['Islamiat', 'Pakistan Studies'], cnic: '35202-0123456-0', address: 'House 21, Valencia, Lahore' },
  { id: 'teacher-011', first_name: 'Tariq',    last_name: 'Aziz',     email: 'taziz@tca.edu.pk',     phone: '+92-302-2223344', employee_id: 'EMP-011', qualification: 'M.Phil Economics',   designation: 'HOD',             branch_id: 'branch-001', is_active: true,  school_id: 'school-001', joined_date: '2023-04-01', salary_grade: 'G4', basic_salary: 65000, allowances: 12000, subjects: ['Economics', 'Commerce'],      cnic: '35202-1122334-1', address: 'House 9, Cantt, Lahore' },
  { id: 'teacher-012', first_name: 'Farah',    last_name: 'Qureshi',  email: 'farah@tca.edu.pk',     phone: '+92-311-5556677', employee_id: 'EMP-012', qualification: 'B.Ed Arts',          designation: 'Teacher',         branch_id: 'branch-002', is_active: true,  school_id: 'school-001', joined_date: '2024-03-01', salary_grade: 'G2', basic_salary: 37000, allowances: 5000, subjects: ['Art & Drawing', 'Craft'],     cnic: '35202-2233445-2', address: 'House 16, Gulshan Ravi, Lahore' },
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
  { id: 'stu-001', first_name: 'Ali',       last_name: 'Raza',       roll_number: 'TCA-001', email: 'ali@student.tca',    phone: '+92-300-1110001', gender: 'male',   date_of_birth: '2014-03-15', class_id: 'class-001', class: DUMMY_CLASSES[0], section_id: 's-001', academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true, admission_date: '2023-04-05', student_id: 'STU-2023-001', guardian_name: 'Raza Ahmed',    guardian_phone: '+92-300-2220001', guardian_relation: 'father', blood_group: 'B+',  address: 'House 5, Street 3, Gulberg, Lahore' },
  { id: 'stu-002', first_name: 'Fatima',    last_name: 'Malik',      roll_number: 'TCA-002', email: 'fatima@student.tca', phone: '+92-300-1110002', gender: 'female', date_of_birth: '2014-07-22', class_id: 'class-001', class: DUMMY_CLASSES[0], section_id: 's-002', academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true, admission_date: '2023-04-05', student_id: 'STU-2023-002', guardian_name: 'Tariq Malik',   guardian_phone: '+92-300-2220002', guardian_relation: 'father', blood_group: 'A+',  address: 'Flat 12, Garden Town, Lahore' },
  { id: 'stu-003', first_name: 'Zaid',      last_name: 'Khan',       roll_number: 'TCA-003', email: 'zaid@student.tca',   phone: '+92-300-1110003', gender: 'male',   date_of_birth: '2013-11-05', class_id: 'class-002', class: DUMMY_CLASSES[1], section_id: 's-003', academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true, admission_date: '2023-04-10', student_id: 'STU-2023-003', guardian_name: 'Shahid Khan',   guardian_phone: '+92-300-2220003', guardian_relation: 'father', blood_group: 'O+',  address: 'House 8, Model Town, Lahore' },
  { id: 'stu-004', first_name: 'Mariam',    last_name: 'Hussain',    roll_number: 'TCA-004', email: null,                 phone: '+92-300-1110004', gender: 'female', date_of_birth: '2013-02-18', class_id: 'class-002', class: DUMMY_CLASSES[1], section_id: 's-004', academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true, admission_date: '2023-05-01', student_id: 'STU-2023-004', guardian_name: 'Nadia Hussain',  guardian_phone: '+92-300-2220004', guardian_relation: 'mother', blood_group: 'AB+', address: 'House 22, Iqbal Town, Lahore' },
  { id: 'stu-005', first_name: 'Omar',      last_name: 'Farooq',     roll_number: 'TCA-005', email: null,                 phone: '+92-300-1110005', gender: 'male',   date_of_birth: '2012-09-30', class_id: 'class-003', class: DUMMY_CLASSES[2], section_id: 's-005', academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true, admission_date: '2023-04-05', student_id: 'STU-2023-005', guardian_name: 'Farooq Ahmad',  guardian_phone: '+92-300-2220005', guardian_relation: 'father', blood_group: 'A-',  address: 'House 1, Cavalry Ground, Lahore' },
  { id: 'stu-006', first_name: 'Hina',      last_name: 'Butt',       roll_number: 'TCA-006', email: null,                 phone: '+92-300-1110006', gender: 'female', date_of_birth: '2012-06-12', class_id: 'class-003', class: DUMMY_CLASSES[2], section_id: 's-005', academic_year_id: 'year-001', branch_id: 'branch-001', is_active: true, admission_date: '2023-04-05', student_id: 'STU-2023-006', guardian_name: 'Asad Butt',     guardian_phone: '+92-300-2220006', guardian_relation: 'father', blood_group: 'O-',  address: 'House 9, Johar Town, Lahore' },
  { id: 'stu-007', first_name: 'Usman',     last_name: 'Sheikh',     roll_number: 'TCA-007', email: null,                 phone: '+92-300-1110007', gender: 'male',   date_of_birth: '2011-04-08', class_id: 'class-004', class: DUMMY_CLASSES[3], section_id: 's-006', academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true, admission_date: '2024-01-20', student_id: 'STU-2024-007', guardian_name: 'Imran Sheikh',  guardian_phone: '+92-300-2220007', guardian_relation: 'father', blood_group: 'B-',  address: 'Plot 4, DHA Phase 5, Lahore' },
  { id: 'stu-008', first_name: 'Noor',      last_name: 'Ahmed',      roll_number: 'TCA-008', email: null,                 phone: '+92-300-1110008', gender: 'female', date_of_birth: '2011-12-25', class_id: 'class-004', class: DUMMY_CLASSES[3], section_id: 's-007', academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true, admission_date: '2024-01-20', student_id: 'STU-2024-008', guardian_name: 'Saima Ahmed',   guardian_phone: '+92-300-2220008', guardian_relation: 'mother', blood_group: 'AB-', address: 'Plot 17, DHA Phase 6, Lahore' },
  { id: 'stu-009', first_name: 'Ibrahim',   last_name: 'Qureshi',    roll_number: 'TCA-009', email: null,                 phone: '+92-300-1110009', gender: 'male',   date_of_birth: '2010-08-14', class_id: 'class-005', class: DUMMY_CLASSES[4], section_id: 's-008', academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true, admission_date: '2024-01-20', student_id: 'STU-2024-009', guardian_name: 'Zulfiqar Qureshi', guardian_phone: '+92-300-2220009', guardian_relation: 'father', blood_group: 'O+', address: 'House 33, Canal Bank, Lahore' },
  { id: 'stu-010', first_name: 'Zainab',    last_name: 'Baig',       roll_number: 'TCA-010', email: null,                 phone: '+92-300-1110010', gender: 'female', date_of_birth: '2010-05-01', class_id: 'class-005', class: DUMMY_CLASSES[4], section_id: 's-008', academic_year_id: 'year-001', branch_id: 'branch-002', is_active: false, admission_date: '2024-01-20', student_id: 'STU-2024-010', guardian_name: 'Farid Baig',    guardian_phone: '+92-300-2220010', guardian_relation: 'father', blood_group: 'A+',  address: 'House 7, Valencia Town, Lahore' },
  { id: 'stu-011', first_name: 'Hamza',     last_name: 'Awan',       roll_number: 'TCA-011', email: null,                 phone: '+92-300-1110011', gender: 'male',   date_of_birth: '2009-01-20', class_id: 'class-006', class: DUMMY_CLASSES[5], section_id: 's-009', academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true, admission_date: '2024-01-20', student_id: 'STU-2024-011', guardian_name: 'Waqas Awan',    guardian_phone: '+92-300-2220011', guardian_relation: 'father', blood_group: 'B+',  address: 'House 11, Bahria Town, Lahore' },
  { id: 'stu-012', first_name: 'Amna',      last_name: 'Ijaz',       roll_number: 'TCA-012', email: null,                 phone: '+92-300-1110012', gender: 'female', date_of_birth: '2009-10-07', class_id: 'class-006', class: DUMMY_CLASSES[5], section_id: 's-010', academic_year_id: 'year-001', branch_id: 'branch-002', is_active: true, admission_date: '2024-01-20', student_id: 'STU-2024-012', guardian_name: 'Ijaz Ahmed',    guardian_phone: '+92-300-2220012', guardian_relation: 'father', blood_group: 'O-',  address: 'House 5, Lake City, Lahore' },
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
// 8.1 ▸ SECTIONS  (flat list — used by Sections management page)
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_SECTIONS = [
  { id: 's-001', name: 'A', class_id: 'class-001', class: DUMMY_CLASSES[0], class_teacher_id: 'teacher-001', class_teacher: DUMMY_TEACHERS[0], room_number: '101', student_count: 29, branch_id: 'branch-001', school_id: 'school-001', is_active: true },
  { id: 's-002', name: 'B', class_id: 'class-001', class: DUMMY_CLASSES[0], class_teacher_id: 'teacher-002', class_teacher: DUMMY_TEACHERS[1], room_number: '102', student_count: 29, branch_id: 'branch-001', school_id: 'school-001', is_active: true },
  { id: 's-003', name: 'A', class_id: 'class-002', class: DUMMY_CLASSES[1], class_teacher_id: 'teacher-002', class_teacher: DUMMY_TEACHERS[1], room_number: '103', student_count: 26, branch_id: 'branch-001', school_id: 'school-001', is_active: true },
  { id: 's-004', name: 'B', class_id: 'class-002', class: DUMMY_CLASSES[1], class_teacher_id: 'teacher-003', class_teacher: DUMMY_TEACHERS[2], room_number: '104', student_count: 26, branch_id: 'branch-001', school_id: 'school-001', is_active: true },
  { id: 's-005', name: 'A', class_id: 'class-003', class: DUMMY_CLASSES[2], class_teacher_id: 'teacher-003', class_teacher: DUMMY_TEACHERS[2], room_number: '105', student_count: 45, branch_id: 'branch-001', school_id: 'school-001', is_active: true },
  { id: 's-006', name: 'A', class_id: 'class-004', class: DUMMY_CLASSES[3], class_teacher_id: 'teacher-004', class_teacher: DUMMY_TEACHERS[3], room_number: '201', student_count: 30, branch_id: 'branch-002', school_id: 'school-001', is_active: true },
  { id: 's-007', name: 'B', class_id: 'class-004', class: DUMMY_CLASSES[3], class_teacher_id: 'teacher-008', class_teacher: DUMMY_TEACHERS[7], room_number: '202', student_count: 30, branch_id: 'branch-002', school_id: 'school-001', is_active: true },
  { id: 's-008', name: 'A', class_id: 'class-005', class: DUMMY_CLASSES[4], class_teacher_id: 'teacher-009', class_teacher: DUMMY_TEACHERS[8], room_number: '203', student_count: 40, branch_id: 'branch-002', school_id: 'school-001', is_active: true },
  { id: 's-009', name: 'A', class_id: 'class-006', class: DUMMY_CLASSES[5], class_teacher_id: 'teacher-011', class_teacher: DUMMY_TEACHERS[10], room_number: '204', student_count: 28, branch_id: 'branch-002', school_id: 'school-001', is_active: true },
  { id: 's-010', name: 'B', class_id: 'class-006', class: DUMMY_CLASSES[5], class_teacher_id: 'teacher-012', class_teacher: DUMMY_TEACHERS[11], room_number: '205', student_count: 27, branch_id: 'branch-002', school_id: 'school-001', is_active: true },
];

// ──────────────────────────────────────────────────────────────────────────────
// 8.1b ▸ SUBJECTS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_SUBJECTS = [
  // Class 1
  { id: 'sub-001', name: 'Mathematics',    code: 'MATH-1',  class_id: 'class-001', class: DUMMY_CLASSES[0], teacher_id: 'teacher-001', teacher: DUMMY_TEACHERS[0],  description: 'Number systems, basic arithmetic and geometry.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Numbers\nChapter 2: Addition & Subtraction\nChapter 3: Multiplication & Division\nChapter 4: Fractions\nChapter 5: Basic Geometry', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-002', name: 'English',         code: 'ENG-1',   class_id: 'class-001', class: DUMMY_CLASSES[0], teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1],  description: 'Reading, writing and grammar fundamentals.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Alphabets & Phonics\nChapter 2: Vocabulary\nChapter 3: Sentence Formation\nChapter 4: Reading Comprehension\nChapter 5: Creative Writing', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-003', name: 'Urdu',            code: 'URDU-1',  class_id: 'class-001', class: DUMMY_CLASSES[0], teacher_id: 'teacher-003', teacher: DUMMY_TEACHERS[2],  description: 'Urdu language and literature for beginners.', syllabus_type: 'text', syllabus_content: 'باب 1: حروف تہجی\nباب 2: الفاظ\nباب 3: جملے\nباب 4: نظم و نثر', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-004', name: 'General Science', code: 'SCI-1',   class_id: 'class-001', class: DUMMY_CLASSES[0], teacher_id: 'teacher-006', teacher: DUMMY_TEACHERS[5],  description: 'Introduction to science and the natural world.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Plants\nChapter 2: Animals\nChapter 3: Human Body\nChapter 4: Weather & Climate\nChapter 5: Simple Machines', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-005', name: 'Islamiat',        code: 'ISL-1',   class_id: 'class-001', class: DUMMY_CLASSES[0], teacher_id: 'teacher-010', teacher: DUMMY_TEACHERS[9],  description: 'Islamic studies — Quran and basic teachings.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Surah Al-Fatiha\nChapter 2: Arkan-e-Islam\nChapter 3: Arkan-e-Iman\nChapter 4: Stories of Prophets', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  // Class 2
  { id: 'sub-006', name: 'Mathematics',    code: 'MATH-2',  class_id: 'class-002', class: DUMMY_CLASSES[1], teacher_id: 'teacher-001', teacher: DUMMY_TEACHERS[0],  description: 'Advanced arithmetic, fractions and decimals.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Fractions\nChapter 2: Decimals\nChapter 3: LCM & HCF\nChapter 4: Basic Algebra\nChapter 5: Word Problems', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-007', name: 'English',         code: 'ENG-2',   class_id: 'class-002', class: DUMMY_CLASSES[1], teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1],  description: 'Grammar, composition and comprehension.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Parts of Speech\nChapter 2: Tenses\nChapter 3: Active & Passive Voice\nChapter 4: Essay Writing', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-008', name: 'Urdu',            code: 'URDU-2',  class_id: 'class-002', class: DUMMY_CLASSES[1], teacher_id: 'teacher-003', teacher: DUMMY_TEACHERS[2],  description: 'Urdu grammar and prose for class 2.', syllabus_type: 'text', syllabus_content: 'باب 1: اسم\nباب 2: فعل\nباب 3: صفت\nباب 4: انشاء پردازی', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-009', name: 'General Science', code: 'SCI-2',   class_id: 'class-002', class: DUMMY_CLASSES[1], teacher_id: 'teacher-006', teacher: DUMMY_TEACHERS[5],  description: 'Earth, space and living things.', syllabus_type: 'text', syllabus_content: 'Chapter 1: The Solar System\nChapter 2: Ecosystems\nChapter 3: Matter & Energy\nChapter 4: Forces & Motion', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  // Class 6
  { id: 'sub-010', name: 'Mathematics',    code: 'MATH-6',  class_id: 'class-006', class: DUMMY_CLASSES[5], teacher_id: 'teacher-009', teacher: DUMMY_TEACHERS[8],  description: 'Algebra, geometry and data handling.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Integers\nChapter 2: Algebra\nChapter 3: Geometry\nChapter 4: Data Handling\nChapter 5: Mensuration', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-011', name: 'Physics',         code: 'PHY-6',   class_id: 'class-006', class: DUMMY_CLASSES[5], teacher_id: 'teacher-005', teacher: DUMMY_TEACHERS[4],  description: 'Mechanics, waves and thermodynamics.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Measurements\nChapter 2: Kinematics\nChapter 3: Dynamics\nChapter 4: Waves\nChapter 5: Thermodynamics', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-012', name: 'Chemistry',       code: 'CHEM-6',  class_id: 'class-006', class: DUMMY_CLASSES[5], teacher_id: 'teacher-007', teacher: DUMMY_TEACHERS[6],  description: 'Atomic structure, bonding and chemical reactions.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Atomic Structure\nChapter 2: Chemical Bonding\nChapter 3: Stoichiometry\nChapter 4: Thermochemistry', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-013', name: 'Biology',         code: 'BIO-6',   class_id: 'class-006', class: DUMMY_CLASSES[5], teacher_id: 'teacher-006', teacher: DUMMY_TEACHERS[5],  description: 'Cell biology, genetics and ecology.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Introduction to Biology\nChapter 2: Cell Structure\nChapter 3: Genetics\nChapter 4: Ecology', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-014', name: 'English',         code: 'ENG-6',   class_id: 'class-006', class: DUMMY_CLASSES[5], teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1],  description: 'Advanced grammar, literature and essay writing.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Advanced Grammar\nChapter 2: Comprehension\nChapter 3: Literature Appreciation\nChapter 4: Essay & Report Writing', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
  { id: 'sub-015', name: 'Computer Science',code: 'CS-6',    class_id: 'class-006', class: DUMMY_CLASSES[5], teacher_id: 'teacher-004', teacher: DUMMY_TEACHERS[3],  description: 'Programming fundamentals and digital literacy.', syllabus_type: 'text', syllabus_content: 'Chapter 1: Introduction to Computing\nChapter 2: Programming Basics\nChapter 3: Database Fundamentals\nChapter 4: Networking', syllabus_file_url: null, is_active: true, school_id: 'school-001' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 8.2 ▸ PARENTS / GUARDIANS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_PARENTS = [
  { id: 'par-001', first_name: 'Raza',      last_name: 'Ahmed',    phone: '+92-300-2220001', email: 'raza.ahmed@gmail.com',    cnic: '35202-1111111-1', relation: 'father',   occupation: 'Engineer',       children: ['stu-001'], school_id: 'school-001', is_active: true, created_at: '2023-04-05T08:00:00.000Z' },
  { id: 'par-002', first_name: 'Tariq',     last_name: 'Malik',    phone: '+92-300-2220002', email: 'tariq.malik@gmail.com',   cnic: '35202-2222222-2', relation: 'father',   occupation: 'Businessman',    children: ['stu-002'], school_id: 'school-001', is_active: true, created_at: '2023-04-05T08:00:00.000Z' },
  { id: 'par-003', first_name: 'Shahid',    last_name: 'Khan',     phone: '+92-300-2220003', email: 'shahid.khan@gmail.com',   cnic: '35202-3333333-3', relation: 'father',   occupation: 'Doctor',         children: ['stu-003'], school_id: 'school-001', is_active: true, created_at: '2023-04-10T08:00:00.000Z' },
  { id: 'par-004', first_name: 'Nadia',     last_name: 'Hussain',  phone: '+92-300-2220004', email: null,                      cnic: '35202-4444444-4', relation: 'mother',   occupation: 'Teacher',        children: ['stu-004'], school_id: 'school-001', is_active: true, created_at: '2023-05-01T08:00:00.000Z' },
  { id: 'par-005', first_name: 'Farooq',    last_name: 'Ahmad',    phone: '+92-300-2220005', email: 'farooq.a@outlook.com',    cnic: '35202-5555555-5', relation: 'father',   occupation: 'Accountant',     children: ['stu-005'], school_id: 'school-001', is_active: true, created_at: '2023-04-05T08:00:00.000Z' },
  { id: 'par-006', first_name: 'Asad',      last_name: 'Butt',     phone: '+92-300-2220006', email: null,                      cnic: '35202-6666666-6', relation: 'father',   occupation: 'Shopkeeper',     children: ['stu-006'], school_id: 'school-001', is_active: true, created_at: '2023-04-05T08:00:00.000Z' },
  { id: 'par-007', first_name: 'Imran',     last_name: 'Sheikh',   phone: '+92-300-2220007', email: 'imran.sh@gmail.com',      cnic: '35202-7777777-7', relation: 'father',   occupation: 'Contractor',     children: ['stu-007'], school_id: 'school-001', is_active: true, created_at: '2024-01-20T08:00:00.000Z' },
  { id: 'par-008', first_name: 'Saima',     last_name: 'Ahmed',    phone: '+92-300-2220008', email: 'saima.a@yahoo.com',       cnic: '35202-8888888-8', relation: 'mother',   occupation: 'Housewife',      children: ['stu-008'], school_id: 'school-001', is_active: true, created_at: '2024-01-20T08:00:00.000Z' },
  { id: 'par-009', first_name: 'Zulfiqar',  last_name: 'Qureshi',  phone: '+92-300-2220009', email: null,                      cnic: '35202-9999999-9', relation: 'father',   occupation: 'Govt Employee',  children: ['stu-009'], school_id: 'school-001', is_active: true, created_at: '2024-01-20T08:00:00.000Z' },
  { id: 'par-010', first_name: 'Farid',     last_name: 'Baig',     phone: '+92-300-2220010', email: 'farid.baig@gmail.com',    cnic: '35202-1010101-0', relation: 'father',   occupation: 'Trader',         children: ['stu-010'], school_id: 'school-001', is_active: false,created_at: '2024-01-20T08:00:00.000Z' },
  { id: 'par-011', first_name: 'Waqas',     last_name: 'Awan',     phone: '+92-300-2220011', email: 'waqas.awan@gmail.com',    cnic: '35202-1122112-1', relation: 'father',   occupation: 'IT Professional',children: ['stu-011'], school_id: 'school-001', is_active: true, created_at: '2024-01-20T08:00:00.000Z' },
  { id: 'par-012', first_name: 'Ijaz',      last_name: 'Ahmed',    phone: '+92-300-2220012', email: null,                      cnic: '35202-1221221-2', relation: 'father',   occupation: 'Banker',         children: ['stu-012'], school_id: 'school-001', is_active: true, created_at: '2024-01-20T08:00:00.000Z' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 8.3 ▸ ADMISSIONS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_ADMISSIONS = [
  {
    id: 'adm-001', admission_no: 'ADM-2025-001', first_name: 'Bilal',    last_name: 'Asif',
    gender: 'male',   date_of_birth: '2014-05-12', class_id: 'class-001', applied_class: DUMMY_CLASSES[0],
    guardian_name: 'Asif Rahman',   guardian_phone: '+92-300-5550001', guardian_relation: 'father',
    status: 'approved', applied_date: '2025-03-10', approved_date: '2025-03-15',
    documents: ['birth_certificate', 'school_leaving'], school_id: 'school-001', academic_year_id: 'year-001',
    student_id: 'STU-2025-013', notes: 'Transfer from Allied School',
  },
  {
    id: 'adm-002', admission_no: 'ADM-2025-002', first_name: 'Sadia',    last_name: 'Nawaz',
    gender: 'female', date_of_birth: '2013-09-25', class_id: 'class-002', applied_class: DUMMY_CLASSES[1],
    guardian_name: 'Nawaz Sharif',   guardian_phone: '+92-300-5550002', guardian_relation: 'father',
    status: 'pending', applied_date: '2025-03-12', approved_date: null,
    documents: ['birth_certificate'], school_id: 'school-001', academic_year_id: 'year-001',
    student_id: null, notes: '',
  },
  {
    id: 'adm-003', admission_no: 'ADM-2025-003', first_name: 'Hamid',    last_name: 'Butt',
    gender: 'male',   date_of_birth: '2012-11-30', class_id: 'class-003', applied_class: DUMMY_CLASSES[2],
    guardian_name: 'Ghulam Butt',    guardian_phone: '+92-300-5550003', guardian_relation: 'father',
    status: 'pending', applied_date: '2025-03-14', approved_date: null,
    documents: ['birth_certificate', 'school_leaving', 'id_card'], school_id: 'school-001', academic_year_id: 'year-001',
    student_id: null, notes: 'Sibling already enrolled (stu-006)',
  },
  {
    id: 'adm-004', admission_no: 'ADM-2025-004', first_name: 'Rabia',    last_name: 'Iqbal',
    gender: 'female', date_of_birth: '2011-07-08', class_id: 'class-004', applied_class: DUMMY_CLASSES[3],
    guardian_name: 'Iqbal Hussain',  guardian_phone: '+92-300-5550004', guardian_relation: 'father',
    status: 'rejected', applied_date: '2025-02-20', approved_date: null,
    documents: ['birth_certificate'], school_id: 'school-001', academic_year_id: 'year-001',
    student_id: null, notes: 'Rejected — incomplete documents',
  },
  {
    id: 'adm-005', admission_no: 'ADM-2025-005', first_name: 'Farhan',   last_name: 'Zaman',
    gender: 'male',   date_of_birth: '2014-02-18', class_id: 'class-001', applied_class: DUMMY_CLASSES[0],
    guardian_name: 'Zaman Ali',      guardian_phone: '+92-300-5550005', guardian_relation: 'father',
    status: 'approved', applied_date: '2025-03-18', approved_date: '2025-03-20',
    documents: ['birth_certificate', 'school_leaving', 'id_card'], school_id: 'school-001', academic_year_id: 'year-001',
    student_id: 'STU-2025-014', notes: '',
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 8.4 ▸ FEE TEMPLATES
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_FEE_TEMPLATES = [
  {
    id: 'ft-001',
    name: 'Class 1 & 2 — Regular',
    description: 'Standard fee structure for lower primary',
    applicable_classes: ['class-001', 'class-002'],
    components: [
      { type: 'tuition',     label: 'Tuition Fee',    amount: 3500, is_monthly: true  },
      { type: 'transport',   label: 'Transport Fee',  amount: 1500, is_monthly: true  },
      { type: 'library',     label: 'Library Fee',    amount: 200,  is_monthly: false },
      { type: 'examination', label: 'Exam Fee',       amount: 500,  is_monthly: false },
    ],
    total_monthly: 5000,
    late_fine_per_day: 50,
    due_day: 10,
    school_id: 'school-001',
    is_active: true,
    created_at: '2023-04-01T08:00:00.000Z',
  },
  {
    id: 'ft-002',
    name: 'Class 3–5 — Regular',
    description: 'Standard fee structure for middle primary',
    applicable_classes: ['class-003', 'class-004', 'class-005'],
    components: [
      { type: 'tuition',     label: 'Tuition Fee',    amount: 4000, is_monthly: true  },
      { type: 'transport',   label: 'Transport Fee',  amount: 1500, is_monthly: true  },
      { type: 'lab',         label: 'Lab Fee',        amount: 300,  is_monthly: false },
      { type: 'examination', label: 'Exam Fee',       amount: 700,  is_monthly: false },
    ],
    total_monthly: 5500,
    late_fine_per_day: 50,
    due_day: 10,
    school_id: 'school-001',
    is_active: true,
    created_at: '2023-04-01T08:00:00.000Z',
  },
  {
    id: 'ft-003',
    name: 'Class 6 — Senior',
    description: 'Fee structure for upper primary / senior section',
    applicable_classes: ['class-006'],
    components: [
      { type: 'tuition',     label: 'Tuition Fee',    amount: 4500, is_monthly: true  },
      { type: 'transport',   label: 'Transport Fee',  amount: 1500, is_monthly: true  },
      { type: 'lab',         label: 'Lab Fee',        amount: 400,  is_monthly: false },
      { type: 'sports',      label: 'Sports Fee',     amount: 300,  is_monthly: false },
      { type: 'examination', label: 'Exam Fee',       amount: 800,  is_monthly: false },
    ],
    total_monthly: 6000,
    late_fine_per_day: 100,
    due_day: 10,
    school_id: 'school-001',
    is_active: true,
    created_at: '2023-04-01T08:00:00.000Z',
  },
  {
    id: 'ft-004',
    name: 'Sibling Discount — 10%',
    description: 'Discount template for families with 2+ children',
    applicable_classes: [],
    components: [
      { type: 'tuition', label: 'Tuition Discount (10%)', amount: -350, is_monthly: true },
    ],
    total_monthly: -350,
    late_fine_per_day: 0,
    due_day: 10,
    school_id: 'school-001',
    is_active: true,
    created_at: '2023-04-01T08:00:00.000Z',
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 8.5 ▸ TIMETABLE
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_TIMETABLE = [
  // Class 1 — Section A
  { id: 'tt-001', class_id: 'class-001', section_id: 's-001', day: 'monday',    period: 1, subject: 'Mathematics',   teacher_id: 'teacher-001', teacher: DUMMY_TEACHERS[0], room: '101', start_time: '08:00', end_time: '08:40', school_id: 'school-001' },
  { id: 'tt-002', class_id: 'class-001', section_id: 's-001', day: 'monday',    period: 2, subject: 'English',        teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1], room: '101', start_time: '08:40', end_time: '09:20', school_id: 'school-001' },
  { id: 'tt-003', class_id: 'class-001', section_id: 's-001', day: 'monday',    period: 3, subject: 'Urdu',           teacher_id: 'teacher-003', teacher: DUMMY_TEACHERS[2], room: '101', start_time: '09:20', end_time: '10:00', school_id: 'school-001' },
  { id: 'tt-004', class_id: 'class-001', section_id: 's-001', day: 'monday',    period: 4, subject: 'General Science',teacher_id: 'teacher-006', teacher: DUMMY_TEACHERS[5], room: '101', start_time: '10:30', end_time: '11:10', school_id: 'school-001' },
  { id: 'tt-005', class_id: 'class-001', section_id: 's-001', day: 'monday',    period: 5, subject: 'Islamiat',       teacher_id: 'teacher-010', teacher: DUMMY_TEACHERS[9], room: '101', start_time: '11:10', end_time: '11:50', school_id: 'school-001' },
  { id: 'tt-006', class_id: 'class-001', section_id: 's-001', day: 'tuesday',   period: 1, subject: 'Mathematics',   teacher_id: 'teacher-001', teacher: DUMMY_TEACHERS[0], room: '101', start_time: '08:00', end_time: '08:40', school_id: 'school-001' },
  { id: 'tt-007', class_id: 'class-001', section_id: 's-001', day: 'tuesday',   period: 2, subject: 'Computer Science',teacher_id: 'teacher-004', teacher: DUMMY_TEACHERS[3], room: '101', start_time: '08:40', end_time: '09:20', school_id: 'school-001' },
  { id: 'tt-008', class_id: 'class-001', section_id: 's-001', day: 'tuesday',   period: 3, subject: 'English',        teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1], room: '101', start_time: '09:20', end_time: '10:00', school_id: 'school-001' },
  // Class 2 — Section A
  { id: 'tt-009', class_id: 'class-002', section_id: 's-003', day: 'monday',    period: 1, subject: 'Mathematics',   teacher_id: 'teacher-001', teacher: DUMMY_TEACHERS[0], room: '103', start_time: '08:00', end_time: '08:40', school_id: 'school-001' },
  { id: 'tt-010', class_id: 'class-002', section_id: 's-003', day: 'monday',    period: 2, subject: 'Urdu',           teacher_id: 'teacher-003', teacher: DUMMY_TEACHERS[2], room: '103', start_time: '08:40', end_time: '09:20', school_id: 'school-001' },
  { id: 'tt-011', class_id: 'class-002', section_id: 's-003', day: 'monday',    period: 3, subject: 'English',        teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1], room: '103', start_time: '09:20', end_time: '10:00', school_id: 'school-001' },
  { id: 'tt-012', class_id: 'class-002', section_id: 's-003', day: 'wednesday', period: 1, subject: 'General Science',teacher_id: 'teacher-006', teacher: DUMMY_TEACHERS[5], room: '103', start_time: '08:00', end_time: '08:40', school_id: 'school-001' },
  // Class 6 — Section A
  { id: 'tt-013', class_id: 'class-006', section_id: 's-009', day: 'monday',    period: 1, subject: 'Mathematics',   teacher_id: 'teacher-009', teacher: DUMMY_TEACHERS[8], room: '204', start_time: '08:00', end_time: '08:40', school_id: 'school-001' },
  { id: 'tt-014', class_id: 'class-006', section_id: 's-009', day: 'monday',    period: 2, subject: 'Physics',        teacher_id: 'teacher-005', teacher: DUMMY_TEACHERS[4], room: '204', start_time: '08:40', end_time: '09:20', school_id: 'school-001' },
  { id: 'tt-015', class_id: 'class-006', section_id: 's-009', day: 'monday',    period: 3, subject: 'Chemistry',      teacher_id: 'teacher-007', teacher: DUMMY_TEACHERS[6], room: '204', start_time: '09:20', end_time: '10:00', school_id: 'school-001' },
  { id: 'tt-016', class_id: 'class-006', section_id: 's-009', day: 'monday',    period: 4, subject: 'English',        teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1], room: '204', start_time: '10:30', end_time: '11:10', school_id: 'school-001' },
  { id: 'tt-017', class_id: 'class-006', section_id: 's-009', day: 'monday',    period: 5, subject: 'Economics',      teacher_id: 'teacher-011', teacher: DUMMY_TEACHERS[10], room: '204', start_time: '11:10', end_time: '11:50', school_id: 'school-001' },
  { id: 'tt-018', class_id: 'class-006', section_id: 's-009', day: 'tuesday',   period: 1, subject: 'Biology',        teacher_id: 'teacher-006', teacher: DUMMY_TEACHERS[5], room: '204', start_time: '08:00', end_time: '08:40', school_id: 'school-001' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 8.6 ▸ STAFF ATTENDANCE
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_STAFF_ATTENDANCE = [
  { id: 'sa-001', teacher_id: 'teacher-001', teacher: DUMMY_TEACHERS[0], date: '2026-03-01', status: 'present', check_in: '07:52', check_out: '15:05', school_id: 'school-001' },
  { id: 'sa-002', teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1], date: '2026-03-01', status: 'present', check_in: '07:58', check_out: '15:00', school_id: 'school-001' },
  { id: 'sa-003', teacher_id: 'teacher-003', teacher: DUMMY_TEACHERS[2], date: '2026-03-01', status: 'absent',  check_in: null,    check_out: null,    school_id: 'school-001' },
  { id: 'sa-004', teacher_id: 'teacher-004', teacher: DUMMY_TEACHERS[3], date: '2026-03-01', status: 'present', check_in: '08:05', check_out: '15:10', school_id: 'school-001' },
  { id: 'sa-005', teacher_id: 'teacher-005', teacher: DUMMY_TEACHERS[4], date: '2026-03-01', status: 'leave',   check_in: null,    check_out: null,    school_id: 'school-001' },
  { id: 'sa-006', teacher_id: 'teacher-006', teacher: DUMMY_TEACHERS[5], date: '2026-03-01', status: 'present', check_in: '07:55', check_out: '15:00', school_id: 'school-001' },
  { id: 'sa-007', teacher_id: 'teacher-007', teacher: DUMMY_TEACHERS[6], date: '2026-03-01', status: 'late',    check_in: '08:35', check_out: '15:00', school_id: 'school-001' },
  { id: 'sa-008', teacher_id: 'teacher-008', teacher: DUMMY_TEACHERS[7], date: '2026-03-01', status: 'present', check_in: '07:50', check_out: '15:05', school_id: 'school-001' },
  { id: 'sa-009', teacher_id: 'teacher-009', teacher: DUMMY_TEACHERS[8], date: '2026-03-01', status: 'present', check_in: '07:48', check_out: '15:00', school_id: 'school-001' },
  { id: 'sa-010', teacher_id: 'teacher-010', teacher: DUMMY_TEACHERS[9], date: '2026-03-01', status: 'absent',  check_in: null,    check_out: null,    school_id: 'school-001' },
  { id: 'sa-011', teacher_id: 'teacher-011', teacher: DUMMY_TEACHERS[10], date: '2026-03-01', status: 'present', check_in: '07:45', check_out: '15:15', school_id: 'school-001' },
  { id: 'sa-012', teacher_id: 'teacher-012', teacher: DUMMY_TEACHERS[11], date: '2026-03-01', status: 'present', check_in: '08:00', check_out: '15:00', school_id: 'school-001' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 9 ▸ HR & PAYROLL
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_SALARY_GRADES = [
  { id: 'sg-001', grade: 'G1', title: 'Junior Staff',    basic_min: 25000, basic_max: 35000, house_rent_pct: 20, medical_pct: 10, transport: 2000, school_id: 'school-001' },
  { id: 'sg-002', grade: 'G2', title: 'Mid-Level Staff', basic_min: 36000, basic_max: 50000, house_rent_pct: 20, medical_pct: 10, transport: 2500, school_id: 'school-001' },
  { id: 'sg-003', grade: 'G3', title: 'Senior Staff',    basic_min: 51000, basic_max: 65000, house_rent_pct: 25, medical_pct: 10, transport: 3000, school_id: 'school-001' },
  { id: 'sg-004', grade: 'G4', title: 'Management',      basic_min: 66000, basic_max: 90000, house_rent_pct: 25, medical_pct: 15, transport: 4000, school_id: 'school-001' },
  { id: 'sg-005', grade: 'G5', title: 'Administration',  basic_min: 91000, basic_max: null,  house_rent_pct: 30, medical_pct: 15, transport: 5000, school_id: 'school-001' },
];

export const DUMMY_PAYSLIPS = [
  { id: 'pay-001', teacher_id: 'teacher-001', teacher: DUMMY_TEACHERS[0],  month: 2, year: 2026, basic_salary: 55000, house_rent: 11000, medical: 5500, transport: 3000, other_allowances: 2500, gross_salary: 77000, deductions: 3850, net_salary: 73150, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-002', teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1],  month: 2, year: 2026, basic_salary: 40000, house_rent: 8000,  medical: 4000, transport: 2500, other_allowances: 1500, gross_salary: 56000, deductions: 2800, net_salary: 53200, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-003', teacher_id: 'teacher-003', teacher: DUMMY_TEACHERS[2],  month: 2, year: 2026, basic_salary: 38000, house_rent: 7600,  medical: 3800, transport: 2500, other_allowances: 1500, gross_salary: 53400, deductions: 2670, net_salary: 50730, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-004', teacher_id: 'teacher-004', teacher: DUMMY_TEACHERS[3],  month: 2, year: 2026, basic_salary: 42000, house_rent: 8400,  medical: 4200, transport: 2500, other_allowances: 1500, gross_salary: 58600, deductions: 2930, net_salary: 55670, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-005', teacher_id: 'teacher-005', teacher: DUMMY_TEACHERS[4],  month: 2, year: 2026, basic_salary: 52000, house_rent: 13000, medical: 5200, transport: 3000, other_allowances: 2000, gross_salary: 75200, deductions: 3760, net_salary: 71440, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-006', teacher_id: 'teacher-006', teacher: DUMMY_TEACHERS[5],  month: 2, year: 2026, basic_salary: 40000, house_rent: 8000,  medical: 4000, transport: 2500, other_allowances: 1500, gross_salary: 56000, deductions: 2800, net_salary: 53200, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-007', teacher_id: 'teacher-007', teacher: DUMMY_TEACHERS[6],  month: 2, year: 2026, basic_salary: 38000, house_rent: 7600,  medical: 3800, transport: 2500, other_allowances: 1500, gross_salary: 53400, deductions: 2670, net_salary: 50730, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-008', teacher_id: 'teacher-008', teacher: DUMMY_TEACHERS[7],  month: 2, year: 2026, basic_salary: 39000, house_rent: 7800,  medical: 3900, transport: 2500, other_allowances: 1500, gross_salary: 54700, deductions: 2735, net_salary: 51965, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-009', teacher_id: 'teacher-009', teacher: DUMMY_TEACHERS[8],  month: 2, year: 2026, basic_salary: 53000, house_rent: 13250, medical: 5300, transport: 3000, other_allowances: 2750, gross_salary: 77300, deductions: 3865, net_salary: 73435, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-010', teacher_id: 'teacher-010', teacher: DUMMY_TEACHERS[9],  month: 2, year: 2026, basic_salary: 32000, house_rent: 6400,  medical: 3200, transport: 2000, other_allowances: 1000, gross_salary: 44600, deductions: 2230, net_salary: 42370, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-011', teacher_id: 'teacher-011', teacher: DUMMY_TEACHERS[10], month: 2, year: 2026, basic_salary: 65000, house_rent: 16250, medical: 9750, transport: 4000, other_allowances: 3000, gross_salary: 98000, deductions: 4900, net_salary: 93100, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  { id: 'pay-012', teacher_id: 'teacher-012', teacher: DUMMY_TEACHERS[11], month: 2, year: 2026, basic_salary: 37000, house_rent: 7400,  medical: 3700, transport: 2500, other_allowances: 1500, gross_salary: 52100, deductions: 2605, net_salary: 49495, status: 'paid',      paid_on: '2026-02-28', school_id: 'school-001' },
  // March (current — generated, not paid yet)
  { id: 'pay-013', teacher_id: 'teacher-001', teacher: DUMMY_TEACHERS[0],  month: 3, year: 2026, basic_salary: 55000, house_rent: 11000, medical: 5500, transport: 3000, other_allowances: 2500, gross_salary: 77000, deductions: 3850, net_salary: 73150, status: 'generated', paid_on: null,          school_id: 'school-001' },
  { id: 'pay-014', teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1],  month: 3, year: 2026, basic_salary: 40000, house_rent: 8000,  medical: 4000, transport: 2500, other_allowances: 1500, gross_salary: 56000, deductions: 2800, net_salary: 53200, status: 'generated', paid_on: null,          school_id: 'school-001' },
  { id: 'pay-015', teacher_id: 'teacher-003', teacher: DUMMY_TEACHERS[2],  month: 3, year: 2026, basic_salary: 38000, house_rent: 7600,  medical: 3800, transport: 2500, other_allowances: 1500, gross_salary: 53400, deductions: 2670, net_salary: 50730, status: 'generated', paid_on: null,          school_id: 'school-001' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 9.1 ▸ LEAVE REQUESTS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_LEAVE_REQUESTS = [
  { id: 'lv-001', teacher_id: 'teacher-003', teacher: DUMMY_TEACHERS[2],  leave_type: 'sick',     from_date: '2026-03-01', to_date: '2026-03-03', days: 3, reason: 'Fever and flu',           status: 'approved', approved_by: 'user-002', school_id: 'school-001', created_at: '2026-02-28T10:00:00.000Z' },
  { id: 'lv-002', teacher_id: 'teacher-005', teacher: DUMMY_TEACHERS[4],  leave_type: 'casual',   from_date: '2026-03-01', to_date: '2026-03-01', days: 1, reason: 'Personal work',            status: 'approved', approved_by: 'user-002', school_id: 'school-001', created_at: '2026-02-28T12:00:00.000Z' },
  { id: 'lv-003', teacher_id: 'teacher-010', teacher: DUMMY_TEACHERS[9],  leave_type: 'sick',     from_date: '2026-03-01', to_date: '2026-03-05', days: 5, reason: 'Medical procedure',        status: 'pending',  approved_by: null,       school_id: 'school-001', created_at: '2026-02-29T09:00:00.000Z' },
  { id: 'lv-004', teacher_id: 'teacher-007', teacher: DUMMY_TEACHERS[6],  leave_type: 'annual',   from_date: '2026-03-10', to_date: '2026-03-14', days: 5, reason: 'Family trip',             status: 'pending',  approved_by: null,       school_id: 'school-001', created_at: '2026-03-01T08:00:00.000Z' },
  { id: 'lv-005', teacher_id: 'teacher-002', teacher: DUMMY_TEACHERS[1],  leave_type: 'maternity', from_date: '2026-04-01', to_date: '2026-06-30', days: 90, reason: 'Maternity leave',        status: 'approved', approved_by: 'user-002', school_id: 'school-001', created_at: '2026-02-15T09:00:00.000Z' },
  { id: 'lv-006', teacher_id: 'teacher-009', teacher: DUMMY_TEACHERS[8],  leave_type: 'casual',   from_date: '2026-02-20', to_date: '2026-02-20', days: 1, reason: 'Urgent family matter',    status: 'rejected', approved_by: 'user-002', school_id: 'school-001', created_at: '2026-02-19T14:00:00.000Z' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 9.2 ▸ COMMUNICATION — NOTICES
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_NOTICES = [
  {
    id: 'ntc-001',
    title: 'Parent-Teacher Meeting — March 2026',
    content: 'Dear Parents, Please be informed that a Parent-Teacher Meeting (PTM) will be held on Saturday, March 14, 2026 from 10:00 AM to 1:00 PM. Kindly attend to discuss your child\'s academic progress. Your presence is highly encouraged.',
    audience: 'parents',
    priority: 'high',
    is_published: true,
    publish_date: '2026-03-03',
    expiry_date:  '2026-03-14',
    created_by:   'user-002',
    school_id:    'school-001',
    created_at:   '2026-03-03T09:00:00.000Z',
  },
  {
    id: 'ntc-002',
    title: 'Mid-Term Exam Schedule Released',
    content: 'The mid-term examination schedule for all classes has been published. Students are advised to collect their admit cards from the office. Examinations will commence from March 25, 2026.',
    audience: 'students',
    priority: 'high',
    is_published: true,
    publish_date: '2026-03-02',
    expiry_date:  '2026-03-25',
    created_by:   'user-002',
    school_id:    'school-001',
    created_at:   '2026-03-02T10:00:00.000Z',
  },
  {
    id: 'ntc-003',
    title: 'Fee Submission Deadline: March 10',
    content: 'All parents are reminded that the fee submission deadline for March 2026 is March 10, 2026. A late fine of Rs. 50 per day will be charged after the due date. Please submit fees on time to avoid penalty.',
    audience: 'parents',
    priority: 'medium',
    is_published: true,
    publish_date: '2026-03-01',
    expiry_date:  '2026-03-15',
    created_by:   'user-003',
    school_id:    'school-001',
    created_at:   '2026-03-01T11:00:00.000Z',
  },
  {
    id: 'ntc-004',
    title: 'Summer Vacation Announcement',
    content: 'Summer vacations will begin on May 30, 2026. The school will reopen on August 1, 2026. New academic year admissions will be open from July 1, 2026.',
    audience: 'all',
    priority: 'medium',
    is_published: true,
    publish_date: '2026-03-01',
    expiry_date:  '2026-06-01',
    created_by:   'user-002',
    school_id:    'school-001',
    created_at:   '2026-03-01T12:00:00.000Z',
  },
  {
    id: 'ntc-005',
    title: 'Staff Meeting — March 5, 2026',
    content: 'All teaching and administrative staff are required to attend a mandatory staff meeting on March 5, 2026 at 3:30 PM in the conference room. Agenda: Curriculum review, exam preparation strategy, and HR guidelines update.',
    audience: 'teachers',
    priority: 'urgent',
    is_published: true,
    publish_date: '2026-03-03',
    expiry_date:  '2026-03-05',
    created_by:   'user-002',
    school_id:    'school-001',
    created_at:   '2026-03-03T08:00:00.000Z',
  },
  {
    id: 'ntc-006',
    title: 'School Annual Sports Day — April 10',
    content: 'The Annual Sports Day will be held on April 10, 2026. Students are encouraged to participate in various events. Parents are cordially invited. Registration forms are available at the front desk.',
    audience: 'all',
    priority: 'low',
    is_published: false,
    publish_date: '2026-03-15',
    expiry_date:  '2026-04-10',
    created_by:   'user-002',
    school_id:    'school-001',
    created_at:   '2026-03-03T14:00:00.000Z',
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 9.3 ▸ IN-APP NOTIFICATIONS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_NOTIFICATIONS = [
  { id: 'nf-001', user_id: 'user-002', type: 'fee',        title: 'Fee Overdue — Zaid Khan',       message: 'Student Zaid Khan\'s February fee is overdue by 21 days.',                  is_read: false, created_at: '2026-03-03T09:15:00.000Z', link: '/fees' },
  { id: 'nf-002', user_id: 'user-002', type: 'admission',  title: 'New Admission Request',          message: 'Sadia Nawaz has applied for admission in Class 2.',                         is_read: false, created_at: '2026-03-12T11:30:00.000Z', link: '/admissions' },
  { id: 'nf-003', user_id: 'user-002', type: 'leave',      title: 'Leave Request — Amna Farooq',    message: 'Teacher Amna Farooq has requested 5 days sick leave. Please review.',        is_read: false, created_at: '2026-02-29T09:05:00.000Z', link: '/payroll' },
  { id: 'nf-004', user_id: 'user-002', type: 'payroll',    title: 'March Payroll Generated',        message: 'Salary slips for March 2026 have been generated for 12 employees.',         is_read: true,  created_at: '2026-03-01T08:00:00.000Z', link: '/payroll' },
  { id: 'nf-005', user_id: 'user-002', type: 'attendance', title: 'Low Attendance Alert',           message: '3 teachers were absent today. Review staff attendance report.',             is_read: true,  created_at: '2026-03-01T15:30:00.000Z', link: '/staff-attendance' },
  { id: 'nf-006', user_id: 'user-003', type: 'fee',        title: '5 Students — Overdue Fees',      message: '5 students have unpaid fees overdue by more than 15 days. Send reminders?',   is_read: false, created_at: '2026-03-03T10:00:00.000Z', link: '/fees' },
  { id: 'nf-007', user_id: 'user-004', type: 'exam',       title: 'Exam Results Pending',           message: 'Unit Test 1 results for Class 2 have not been entered yet.',                is_read: false, created_at: '2026-03-02T12:00:00.000Z', link: '/exams' },
  { id: 'nf-008', user_id: 'user-002', type: 'system',     title: 'Notice Published',               message: 'PTM notice has been successfully published to all parents.',                is_read: true,  created_at: '2026-03-03T09:01:00.000Z', link: '/notices' },
];

// ──────────────────────────────────────────────────────────────────────────────
// 10 ▸ REPORTS SUMMARY DATA
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_REPORTS = {
  student: {
    total: 12, active: 11, inactive: 1,
    by_class: DUMMY_CLASSES.map((c) => ({ class: c.name, count: c.student_count, boys: Math.floor(c.student_count * 0.52), girls: Math.ceil(c.student_count * 0.48) })),
    by_gender: { male: 7, female: 5 },
    new_admissions_this_month: 2,
  },
  attendance: {
    avg_present_pct: 89.4,
    avg_absent_pct:  7.8,
    avg_late_pct:    2.8,
    by_month: [
      { month: 'Oct', present: 85, absent: 10, late: 5 },
      { month: 'Nov', present: 87, absent: 9,  late: 4 },
      { month: 'Dec', present: 78, absent: 16, late: 6 },
      { month: 'Jan', present: 90, absent: 7,  late: 3 },
      { month: 'Feb', present: 93, absent: 5,  late: 2 },
    ],
    staff: { present: 9, absent: 2, late: 1, leave: 1 },
  },
  fee: {
    total_collected:  310000,
    total_pending:    45000,
    total_overdue:    19000,
    collection_rate:  73.2,
    by_month: [
      { month: 'Oct', collected: 290000, pending: 15000 },
      { month: 'Nov', collected: 275000, pending: 22000 },
      { month: 'Dec', collected: 230000, pending: 45000 },
      { month: 'Jan', collected: 285000, pending: 12000 },
      { month: 'Feb', collected: 310000, pending: 8000  },
    ],
  },
  salary: {
    total_payroll_feb_2026: 797640,
    paid_count: 12,
    pending_count: 0,
    by_grade: [
      { grade: 'G1', count: 1, total: 42370  },
      { grade: 'G2', count: 7, total: 414995 },
      { grade: 'G3', count: 3, total: 218025 },
      { grade: 'G4', count: 1, total: 93100  },
    ],
  },
};


export const DUMMY_MA_SCHOOLS = [
  {
    id: 'school-001', name: 'The Clouds Academy',           code: 'TCA-LHR',  institute_type: 'academy',  address: 'Gulberg III, Lahore',        has_branches: true,  is_active: true,  created_at: '2023-04-01T00:00:00.000Z',
    subscription: { plan: 'premium',  status: 'active', expires_at: '2026-12-31' },
    specialization: 'General Education',
  },
  {
    id: 'school-002', name: 'Beaconhouse School System',     code: 'BSS-KHI',  institute_type: 'school',   address: 'DHA Phase 5, Karachi',       has_branches: true,  is_active: true,  created_at: '2023-07-15T00:00:00.000Z',
    subscription: { plan: 'basic',    status: 'active', expires_at: '2026-07-14' },
    affiliation_board: 'Federal Board', grade_range: 'Class 1 – 12',
  },
  {
    id: 'school-003', name: 'Roots International Islamabad', code: 'RIS-ISL',  institute_type: 'school',   address: 'F-7/1, Islamabad',           has_branches: true,  is_active: true,  created_at: '2024-01-20T00:00:00.000Z',
    subscription: { plan: 'standard', status: 'active', expires_at: '2026-01-19' },
    affiliation_board: 'Cambridge CAIE', grade_range: 'O-Level / A-Level',
  },
  {
    id: 'school-004', name: 'City Grammar School',           code: 'CGS-MUL',  institute_type: 'school',   address: 'Model Town, Multan',         has_branches: false, is_active: false, created_at: '2024-03-10T00:00:00.000Z',
    subscription: { plan: 'basic',    status: 'expired', expires_at: '2025-03-09' },
    affiliation_board: 'Punjab Board', grade_range: 'Class 1 – 10',
  },
  {
    id: 'school-005', name: 'Allied School Faisalabad',      code: 'ASF-FSD',  institute_type: 'school',   address: 'Peoples Colony, Faisalabad', has_branches: false, is_active: true,  created_at: '2024-06-01T00:00:00.000Z',
    subscription: { plan: 'standard', status: 'active', expires_at: '2026-05-31' },
    affiliation_board: 'Punjab Board', grade_range: 'Class 1 – 12',
  },
  {
    id: 'inst-006',   name: 'Star Coaching Center',          code: 'SCC-LHR',  institute_type: 'coaching', address: 'Garden Town, Lahore',        has_branches: false, is_active: true,  created_at: '2025-01-10T00:00:00.000Z',
    subscription: { plan: 'basic',    status: 'active', expires_at: '2026-01-09' },
    subject_focus: 'Mathematics, Physics, Chemistry', target_exams: 'MDCAT, ECAT',
  },
  {
    id: 'inst-007',   name: 'Horizon IT Academy',            code: 'HIA-ISL',  institute_type: 'academy',  address: 'Blue Area, Islamabad',       has_branches: true,  is_active: true,  created_at: '2025-03-20T00:00:00.000Z',
    subscription: { plan: 'standard', status: 'active', expires_at: '2026-03-19' },
    specialization: 'Information Technology & Programming',
  },
  {
    id: 'inst-008',   name: 'Punjab College of Commerce',    code: 'PCC-LHR',  institute_type: 'college',  address: 'Johar Town, Lahore',         has_branches: true,  is_active: true,  created_at: '2025-05-01T00:00:00.000Z',
    subscription: { plan: 'premium',  status: 'active', expires_at: '2027-04-30' },
    affiliation_board: 'University of Punjab', degree_programs: 'FSc, FA, ICS, I.Com, B.Com',
  },
];

export const DUMMY_MA_SUBSCRIPTIONS = [
  { id: 'sub-001', school_id: 'school-001', school: DUMMY_MA_SCHOOLS[0], plan: 'premium',  status: 'active',    start_date: '2024-01-01', expires_at: '2026-12-31', amount: 120000 },
  { id: 'sub-002', school_id: 'school-002', school: DUMMY_MA_SCHOOLS[1], plan: 'basic',    status: 'active',    start_date: '2025-07-15', expires_at: '2026-07-14', amount: 24000  },
  { id: 'sub-003', school_id: 'school-003', school: DUMMY_MA_SCHOOLS[2], plan: 'standard', status: 'active',    start_date: '2025-01-20', expires_at: '2026-01-19', amount: 60000  },
  { id: 'sub-004', school_id: 'school-004', school: DUMMY_MA_SCHOOLS[3], plan: 'basic',    status: 'expired',   start_date: '2024-03-10', expires_at: '2025-03-09', amount: 24000  },
  { id: 'sub-005', school_id: 'school-005', school: DUMMY_MA_SCHOOLS[4], plan: 'standard', status: 'active',    start_date: '2024-06-01', expires_at: '2026-05-31', amount: 60000  },
  { id: 'sub-006', school_id: 'school-001', school: DUMMY_MA_SCHOOLS[0], plan: 'standard', status: 'cancelled', start_date: '2023-04-01', expires_at: '2024-03-31', amount: 60000  },
  { id: 'sub-007', school_id: 'inst-006',   school: DUMMY_MA_SCHOOLS[5], plan: 'basic',    status: 'active',    start_date: '2025-01-10', expires_at: '2026-01-09', amount: 24000  },
  { id: 'sub-008', school_id: 'inst-007',   school: DUMMY_MA_SCHOOLS[6], plan: 'standard', status: 'active',    start_date: '2025-03-20', expires_at: '2026-03-19', amount: 60000  },
  { id: 'sub-009', school_id: 'inst-008',   school: DUMMY_MA_SCHOOLS[7], plan: 'premium',  status: 'active',    start_date: '2025-05-01', expires_at: '2027-04-30', amount: 120000 },
];

export const DUMMY_MA_USERS = [
  { id: 'user-master-001', first_name: 'Zahid',     last_name: 'Ali Khan',  email: 'master@cloudsacademy.com',  role: { name: 'Master Admin'       }, school: null,               is_active: true,  created_at: '2023-01-01T00:00:00.000Z' },
  { id: 'user-002',        first_name: 'Muhammad',  last_name: 'Usman',     email: 'admin@tca.edu.pk',          role: { name: 'Institute Admin'    }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2023-04-01T00:00:00.000Z' },
  { id: 'user-003',        first_name: 'Ayesha',    last_name: 'Siddiqui',  email: 'fees@tca.edu.pk',           role: { name: 'Fee Manager'        }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2023-06-15T00:00:00.000Z' },
  { id: 'user-004',        first_name: 'Hassan',    last_name: 'Mahmood',   email: 'teacher@tca.edu.pk',        role: { name: 'Class Teacher'      }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2023-08-01T00:00:00.000Z' },
  { id: 'user-005',        first_name: 'Sarah',     last_name: 'Noor',      email: 'reception@tca.edu.pk',      role: { name: 'Receptionist'       }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2024-01-10T00:00:00.000Z' },
  { id: 'user-006',        first_name: 'Tariq',     last_name: 'Jamil',     email: 'branch@tca.edu.pk',         role: { name: 'Branch Admin'       }, school: DUMMY_MA_SCHOOLS[0], is_active: true,  created_at: '2024-03-05T00:00:00.000Z' },
  { id: 'user-007',        first_name: 'Imran',     last_name: 'Akhtar',    email: 'principal@bss.edu.pk',      role: { name: 'Institute Admin'    }, school: DUMMY_MA_SCHOOLS[1], is_active: true,  created_at: '2023-07-15T00:00:00.000Z' },
  { id: 'user-008',        first_name: 'Samina',    last_name: 'Murtaza',   email: 'admin@ris.edu.pk',          role: { name: 'Institute Admin'    }, school: DUMMY_MA_SCHOOLS[2], is_active: false, created_at: '2024-01-20T00:00:00.000Z' },
  { id: 'user-009',        first_name: 'Khalid',    last_name: 'Mehmood',   email: 'admin@scc.edu.pk',          role: { name: 'Institute Admin'    }, school: DUMMY_MA_SCHOOLS[5], is_active: true,  created_at: '2025-01-10T00:00:00.000Z' },
  { id: 'user-010',        first_name: 'Zara',      last_name: 'Hashmi',    email: 'admin@hia.edu.pk',          role: { name: 'Institute Admin'    }, school: DUMMY_MA_SCHOOLS[6], is_active: true,  created_at: '2025-03-20T00:00:00.000Z' },
  { id: 'user-011',        first_name: 'Naveed',    last_name: 'Chaudhry',  email: 'admin@pcc.edu.pk',          role: { name: 'Institute Admin'    }, school: DUMMY_MA_SCHOOLS[7], is_active: true,  created_at: '2025-05-01T00:00:00.000Z' },
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
  total_students:        DUMMY_STUDENTS.length,
  active_students:       DUMMY_STUDENTS.filter((s) => s.is_active).length,
  total_teachers:        DUMMY_TEACHERS.length,
  active_teachers:       DUMMY_TEACHERS.filter((t) => t.is_active).length,
  total_classes:         DUMMY_CLASSES.length,
  total_sections:        DUMMY_SECTIONS.length,
  total_parents:         DUMMY_PARENTS.length,
  pending_admissions:    DUMMY_ADMISSIONS.filter((a) => a.status === 'pending').length,
  fees_collected:        DUMMY_FEES.filter((f) => f.status === 'paid').reduce((sum, f) => sum + (f.amount - (f.discount ?? 0)), 0),
  fees_pending:          DUMMY_FEES.filter((f) => ['pending', 'overdue', 'partial'].includes(f.status)).reduce((sum, f) => sum + f.amount, 0),
  upcoming_exams:        DUMMY_EXAMS.filter((e) => !e.is_published).length,
  payroll_this_month:    DUMMY_PAYSLIPS.filter((p) => p.month === 2 && p.year === 2026).reduce((sum, p) => sum + p.net_salary, 0),
  pending_leave_requests:DUMMY_LEAVE_REQUESTS.filter((l) => l.status === 'pending').length,
  unread_notifications:  DUMMY_NOTIFICATIONS.filter((n) => !n.is_read).length,
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
    { id: 1, type: 'fee',        message: 'Ali Raza paid Feb 2026 fee — Rs. 3,500',             time: '10 min ago',  icon: 'CreditCard'    },
    { id: 2, type: 'admission',  message: 'New admission request: Sadia Nawaz (Class 2)',        time: '2 hours ago', icon: 'ClipboardList' },
    { id: 3, type: 'leave',      message: 'Leave approved for Hassan Mahmood (3 days)',          time: '3 hours ago', icon: 'CalendarCheck' },
    { id: 4, type: 'notice',     message: 'PTM notice published for all parents',                time: '4 hours ago', icon: 'Bell'          },
    { id: 5, type: 'payroll',    message: 'March 2026 payroll generated for 12 staff',           time: 'Yesterday',   icon: 'DollarSign'    },
    { id: 6, type: 'student',    message: 'New student Bilal Asif enrolled in Class 1',          time: 'Yesterday',   icon: 'UserPlus'      },
    { id: 7, type: 'attendance', message: 'Attendance marked — 89% present today',               time: 'Yesterday',   icon: 'CheckCircle'   },
    { id: 8, type: 'exam',       message: 'Mid-term exam schedule released for March 25',        time: '2 days ago',  icon: 'BookOpen'      },
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
