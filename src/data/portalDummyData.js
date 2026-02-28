/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   Portal Dummy Data — Parent Portal + Student Portal         ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  Parent Login  │ parent@tca.edu.pk   │ parent@123
 *  Student Login │ ali@student.tca     │ student@123
 */

import { DUMMY_STUDENTS, DUMMY_CLASSES, DUMMY_FEES, DUMMY_EXAMS } from './dummyData';

// ──────────────────────────────────────────────────────────────────────────────
// 1 ▸ ANNOUNCEMENTS  (shared for both portals)
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_ANNOUNCEMENTS = [
  {
    id: 'ann-001',
    title: 'Mid-Term Exam Schedule Released',
    body: 'The mid-term examination schedule for all classes has been released. Students are advised to prepare thoroughly. Exams will start from 10th March 2026. Hall tickets will be distributed by teachers.',
    category: 'Exam',
    priority: 'high',
    date: '2026-02-25',
    author: 'Principal Office',
  },
  {
    id: 'ann-002',
    title: 'Fee Submission Last Date Extended',
    body: 'Due to multiple requests, the last date for February fee submission has been extended to 15th February 2026. Students with outstanding fees must clear them before the extended date to avoid late fee charges.',
    category: 'Fee',
    priority: 'high',
    date: '2026-02-18',
    author: 'Accounts Department',
  },
  {
    id: 'ann-003',
    title: 'Annual Sports Day Celebration',
    body: 'The Annual Sports Day will be held on 5th March 2026. All students are encouraged to participate in various sports events. Parents are cordially invited to attend and support our students.',
    category: 'Event',
    priority: 'medium',
    date: '2026-02-15',
    author: 'Sports Committee',
  },
  {
    id: 'ann-004',
    title: 'Parent-Teacher Meeting',
    body: 'A Parent-Teacher Meeting (PTM) is scheduled for 20th February 2026 from 9:00 AM to 1:00 PM. All parents are requested to attend to discuss the academic progress of their child.',
    category: 'Meeting',
    priority: 'high',
    date: '2026-02-10',
    author: 'Administration',
  },
  {
    id: 'ann-005',
    title: 'Winter Uniform Mandatory from March',
    body: 'All students must wear complete winter uniform from 1st March 2026 onwards. Students without proper uniform will not be allowed in class. Summer uniform will resume from 1st April 2026.',
    category: 'General',
    priority: 'medium',
    date: '2026-02-08',
    author: 'Administration',
  },
  {
    id: 'ann-006',
    title: 'Public Holiday — Pakistan Day',
    body: 'School will remain closed on 23rd March 2026 in observance of Pakistan Day. Normal school activities will resume on 24th March 2026 (Tuesday).',
    category: 'Holiday',
    priority: 'low',
    date: '2026-02-05',
    author: 'Principal Office',
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 2 ▸ EXAM RESULTS  (subject-wise marks for each student)
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_EXAM_RESULTS = [
  /* Ali Raza – stu-001 – Class 1 */
  {
    exam_id: 'exam-001',
    student_id: 'stu-001',
    exam: DUMMY_EXAMS[0], // Mid Term
    subjects: [
      { name: 'Mathematics',  marks: 88, total: 100, grade: 'A' },
      { name: 'English',      marks: 75, total: 100, grade: 'B' },
      { name: 'Urdu',         marks: 82, total: 100, grade: 'A' },
      { name: 'Science',      marks: 91, total: 100, grade: 'A+' },
      { name: 'Islamiat',     marks: 78, total: 100, grade: 'B+' },
    ],
    total_marks:   414,
    total_full:    500,
    percentage:    82.8,
    grade:         'A',
    position:      3,
    class_total:   58,
    remarks:       'Excellent performance. Keep it up!',
    published:     true,
  },
  /* Fatima Malik – stu-002 – Class 1 */
  {
    exam_id: 'exam-001',
    student_id: 'stu-002',
    exam: DUMMY_EXAMS[0],
    subjects: [
      { name: 'Mathematics',  marks: 95, total: 100, grade: 'A+' },
      { name: 'English',      marks: 92, total: 100, grade: 'A+' },
      { name: 'Urdu',         marks: 88, total: 100, grade: 'A' },
      { name: 'Science',      marks: 97, total: 100, grade: 'A+' },
      { name: 'Islamiat',     marks: 90, total: 100, grade: 'A+' },
    ],
    total_marks:   462,
    total_full:    500,
    percentage:    92.4,
    grade:         'A+',
    position:      1,
    class_total:   58,
    remarks:       'Outstanding! Class topper. Excellent in all subjects.',
    published:     true,
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 3 ▸ PORTAL ATTENDANCE  (per-student, per-month data)
// ──────────────────────────────────────────────────────────────────────────────
function buildAttendance(studentId, presentDays, absentDays, lateDays = []) {
  const days = [];
  // Feb 2026 working days: 2-6, 9-13, 16-20, 23-27
  const workingDays = [2,3,4,5,6,9,10,11,12,13,16,17,18,19,20,23,24,25,26,27];
  workingDays.forEach((d) => {
    let status = 'present';
    if (absentDays.includes(d)) status = 'absent';
    else if (lateDays.includes(d)) status = 'late';
    days.push({ date: `2026-02-${String(d).padStart(2,'0')}`, status });
  });
  return {
    student_id:   studentId,
    month:        'February 2026',
    total_days:   workingDays.length,
    present:      days.filter((d) => d.status === 'present').length,
    absent:       days.filter((d) => d.status === 'absent').length,
    late:         days.filter((d) => d.status === 'late').length,
    percentage:   Math.round((days.filter((d) => d.status === 'present').length / workingDays.length) * 100),
    days,
    monthly_history: [
      { month: 'Sep 2025', present: 22, total: 24, percentage: 92 },
      { month: 'Oct 2025', present: 21, total: 25, percentage: 84 },
      { month: 'Nov 2025', present: 23, total: 24, percentage: 96 },
      { month: 'Dec 2025', present: 18, total: 22, percentage: 82 },
      { month: 'Jan 2026', present: 24, total: 25, percentage: 96 },
      { month: 'Feb 2026', present: days.filter((d) => d.status === 'present').length, total: workingDays.length, percentage: Math.round((days.filter((d) => d.status === 'present').length / workingDays.length) * 100) },
    ],
  };
}

export const DUMMY_PORTAL_ATTENDANCE = {
  'stu-001': buildAttendance('stu-001', null, [10, 18], [3]),
  'stu-002': buildAttendance('stu-002', null, [24], []),
};

// ──────────────────────────────────────────────────────────────────────────────
// 4 ▸ TIMETABLE  (Class 1 — used by ali raza & fatima malik)
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_TIMETABLE = {
  'class-001': {
    class: 'Class 1',
    section: 'A',
    schedule: [
      {
        day: 'Monday',
        periods: [
          { time: '08:00–08:45', subject: 'Mathematics',  teacher: 'Hassan Mahmood',  room: 'Room 101' },
          { time: '08:45–09:30', subject: 'English',       teacher: 'Sana Tariq',      room: 'Room 101' },
          { time: '09:30–10:15', subject: 'Urdu',          teacher: 'Adnan Iqbal',     room: 'Room 101' },
          { time: '10:15–10:30', subject: 'Break',         teacher: '',                room: '' },
          { time: '10:30–11:15', subject: 'Science',       teacher: 'Hassan Mahmood',  room: 'Lab 1' },
          { time: '11:15–12:00', subject: 'Islamiat',      teacher: 'Adnan Iqbal',     room: 'Room 101' },
          { time: '12:00–12:45', subject: 'General Knowledge', teacher: 'Sana Tariq', room: 'Room 101' },
        ],
      },
      {
        day: 'Tuesday',
        periods: [
          { time: '08:00–08:45', subject: 'English',       teacher: 'Sana Tariq',      room: 'Room 101' },
          { time: '08:45–09:30', subject: 'Mathematics',   teacher: 'Hassan Mahmood',  room: 'Room 101' },
          { time: '09:30–10:15', subject: 'Computer',      teacher: 'Rabia Nawaz',     room: 'Computer Lab' },
          { time: '10:15–10:30', subject: 'Break',         teacher: '',                room: '' },
          { time: '10:30–11:15', subject: 'Urdu',          teacher: 'Adnan Iqbal',     room: 'Room 101' },
          { time: '11:15–12:00', subject: 'Arts & Crafts', teacher: 'Sana Tariq',      room: 'Room 101' },
          { time: '12:00–12:45', subject: 'Physical Education', teacher: 'Hassan Mahmood', room: 'Ground' },
        ],
      },
      {
        day: 'Wednesday',
        periods: [
          { time: '08:00–08:45', subject: 'Science',       teacher: 'Hassan Mahmood',  room: 'Lab 1' },
          { time: '08:45–09:30', subject: 'Mathematics',   teacher: 'Hassan Mahmood',  room: 'Room 101' },
          { time: '09:30–10:15', subject: 'English',       teacher: 'Sana Tariq',      room: 'Room 101' },
          { time: '10:15–10:30', subject: 'Break',         teacher: '',                room: '' },
          { time: '10:30–11:15', subject: 'Islamiat',      teacher: 'Adnan Iqbal',     room: 'Room 101' },
          { time: '11:15–12:00', subject: 'Urdu',          teacher: 'Adnan Iqbal',     room: 'Room 101' },
          { time: '12:00–12:45', subject: 'General Knowledge', teacher: 'Sana Tariq', room: 'Room 101' },
        ],
      },
      {
        day: 'Thursday',
        periods: [
          { time: '08:00–08:45', subject: 'Mathematics',   teacher: 'Hassan Mahmood',  room: 'Room 101' },
          { time: '08:45–09:30', subject: 'Computer',      teacher: 'Rabia Nawaz',     room: 'Computer Lab' },
          { time: '09:30–10:15', subject: 'Urdu',          teacher: 'Adnan Iqbal',     room: 'Room 101' },
          { time: '10:15–10:30', subject: 'Break',         teacher: '',                room: '' },
          { time: '10:30–11:15', subject: 'Science',       teacher: 'Hassan Mahmood',  room: 'Lab 1' },
          { time: '11:15–12:00', subject: 'English',       teacher: 'Sana Tariq',      room: 'Room 101' },
          { time: '12:00–12:45', subject: 'Arts & Crafts', teacher: 'Sana Tariq',      room: 'Room 101' },
        ],
      },
      {
        day: 'Friday',
        periods: [
          { time: '08:00–08:45', subject: 'Islamiat',      teacher: 'Adnan Iqbal',     room: 'Room 101' },
          { time: '08:45–09:30', subject: 'Mathematics',   teacher: 'Hassan Mahmood',  room: 'Room 101' },
          { time: '09:30–10:15', subject: 'English',       teacher: 'Sana Tariq',      room: 'Room 101' },
          { time: '10:15–10:30', subject: 'Break',         teacher: '',                room: '' },
          { time: '10:30–11:15', subject: 'Science',       teacher: 'Hassan Mahmood',  room: 'Lab 1' },
          { time: '11:15–12:00', subject: 'Physical Education', teacher: 'Hassan Mahmood', room: 'Ground' },
          { time: '12:00–12:30', subject: 'Assembly',      teacher: '',                room: 'Ground' },
        ],
      },
    ],
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// 5 ▸ PARENT ACCOUNTS
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_PARENTS = [
  {
    id: 'parent-001',
    name: 'Muhammad Raza',
    email: 'parent@tca.edu.pk',
    password: 'parent@123',
    phone: '+92-300-9876543',
    occupation: 'Software Engineer',
    address: '12 Main Boulevard, Gulberg, Lahore',
    relation: 'Father',
    portal_type: 'PARENT',
    children: [
      {
        ...DUMMY_STUDENTS[0],
        class_name: 'Class 1 – Section A',
        roll_no: 'TCA-001',
        attendance: DUMMY_PORTAL_ATTENDANCE['stu-001'],
        fees: DUMMY_FEES.filter((f) => f.student_id === 'stu-001'),
        results: DUMMY_EXAM_RESULTS.filter((r) => r.student_id === 'stu-001'),
        timetable: DUMMY_TIMETABLE['class-001'],
      },
      {
        ...DUMMY_STUDENTS[1],
        class_name: 'Class 1 – Section B',
        roll_no: 'TCA-002',
        attendance: DUMMY_PORTAL_ATTENDANCE['stu-002'],
        fees: DUMMY_FEES.filter((f) => f.student_id === 'stu-002'),
        results: DUMMY_EXAM_RESULTS.filter((r) => r.student_id === 'stu-002'),
        timetable: DUMMY_TIMETABLE['class-001'],
      },
    ],
  },
  {
    id: 'parent-002',
    name: 'Rabia Khan',
    email: 'parent2@tca.edu.pk',
    password: 'parent@123',
    phone: '+92-321-5544332',
    occupation: 'Doctor',
    address: '45 DHA Phase 5, Lahore',
    relation: 'Mother',
    portal_type: 'PARENT',
    children: [
      {
        ...DUMMY_STUDENTS[2],
        class_name: 'Class 2 – Section A',
        roll_no: 'TCA-003',
        attendance: DUMMY_PORTAL_ATTENDANCE['stu-001'], // reuse
        fees: DUMMY_FEES.filter((f) => f.student_id === 'stu-003'),
        results: [],
        timetable: DUMMY_TIMETABLE['class-001'],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 6 ▸ STUDENT PORTAL USERS  (students who can login to the portal)
// ──────────────────────────────────────────────────────────────────────────────
export const DUMMY_STUDENT_PORTAL_USERS = [
  {
    id: 'stu-001',
    first_name: 'Ali',
    last_name: 'Raza',
    email: 'ali@student.tca',
    password: 'student@123',
    roll_number: 'TCA-001',
    class_name: 'Class 1 – Section A',
    class_id: 'class-001',
    branch: 'Main Campus',
    gender: 'male',
    date_of_birth: '2014-03-15',
    guardian_name: 'Muhammad Raza',
    guardian_phone: '+92-300-9876543',
    portal_type: 'STUDENT',
    attendance: DUMMY_PORTAL_ATTENDANCE['stu-001'],
    fees: DUMMY_FEES.filter((f) => f.student_id === 'stu-001'),
    results: DUMMY_EXAM_RESULTS.filter((r) => r.student_id === 'stu-001'),
    timetable: DUMMY_TIMETABLE['class-001'],
  },
  {
    id: 'stu-002',
    first_name: 'Fatima',
    last_name: 'Malik',
    email: 'fatima@student.tca',
    password: 'student@123',
    roll_number: 'TCA-002',
    class_name: 'Class 1 – Section B',
    class_id: 'class-001',
    branch: 'Main Campus',
    gender: 'female',
    date_of_birth: '2014-07-22',
    guardian_name: 'Muhammad Raza',
    guardian_phone: '+92-300-9876543',
    portal_type: 'STUDENT',
    attendance: DUMMY_PORTAL_ATTENDANCE['stu-002'],
    fees: DUMMY_FEES.filter((f) => f.student_id === 'stu-002'),
    results: DUMMY_EXAM_RESULTS.filter((r) => r.student_id === 'stu-002'),
    timetable: DUMMY_TIMETABLE['class-001'],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// 7 ▸ TEACHER PORTAL DATA
// ──────────────────────────────────────────────────────────────────────────────

export const DUMMY_TEACHER_NOTES = [
  { id: 'note-001', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'Mathematics', title: 'Chapter 3: Multiplication Tables', description: 'Complete notes on multiplication tables from 1 to 20 with practice exercises.', file_type: 'PDF', file_size: '1.2 MB', uploaded_on: '2026-02-20', teacher_id: 'teacher-001', downloads: 45 },
  { id: 'note-002', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'Science',     title: 'Plants and Their Parts',          description: 'Detailed notes on plant anatomy: roots, stem, leaves, flowers with diagrams.', file_type: 'PDF', file_size: '2.1 MB', uploaded_on: '2026-02-18', teacher_id: 'teacher-001', downloads: 38 },
  { id: 'note-003', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'Mathematics', title: 'Chapter 4: Division Basics',         description: 'Introduction to division, equal sharing concept with worked examples.', file_type: 'PDF', file_size: '980 KB', uploaded_on: '2026-02-14', teacher_id: 'teacher-001', downloads: 52 },
  { id: 'note-004', class_id: 'class-001', class_name: 'Class 1 – Section B', subject: 'Science',     title: 'Water Cycle Explained',             description: 'The water cycle — evaporation, condensation, precipitation with illustrations.', file_type: 'PDF', file_size: '1.7 MB', uploaded_on: '2026-02-10', teacher_id: 'teacher-001', downloads: 29 },
];

export const DUMMY_TEACHER_ASSIGNMENTS = [
  {
    id: 'asgn-001', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'Mathematics',
    title: 'Multiplication Practice — Tables 6 to 10',
    description: 'Complete the worksheet: write multiplication tables 6–10 three times each and solve 20 word problems from the textbook page 45–47.',
    due_date: '2026-03-05', assigned_on: '2026-02-25', total_marks: 20, status: 'active',
    submissions: 32, total_students: 40, teacher_id: 'teacher-001',
  },
  {
    id: 'asgn-002', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'Science',
    title: 'Draw & Label: Parts of a Plant',
    description: 'Draw a flowering plant and label all major parts (root, stem, leaf, flower, fruit, seed). Use color pencils and write one line about each part.',
    due_date: '2026-03-03', assigned_on: '2026-02-22', total_marks: 15, status: 'active',
    submissions: 28, total_students: 40, teacher_id: 'teacher-001',
  },
  {
    id: 'asgn-003', class_id: 'class-001', class_name: 'Class 1 – Section B', subject: 'Science',
    title: 'Water Cycle Poster',
    description: 'Create an A4 poster showing the water cycle with all four stages labeled. Write 2 sentences about each stage.',
    due_date: '2026-02-28', assigned_on: '2026-02-18', total_marks: 25, status: 'submitted',
    submissions: 35, total_students: 38, teacher_id: 'teacher-001',
  },
  {
    id: 'asgn-004', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'Mathematics',
    title: 'Division Word Problems',
    description: 'Solve 15 division word problems from the worksheet provided in class. Show all working.',
    due_date: '2026-02-20', assigned_on: '2026-02-12', total_marks: 20, status: 'graded',
    submissions: 40, total_students: 40, teacher_id: 'teacher-001',
  },
];

export const DUMMY_TEACHER_HOMEWORK = [
  { id: 'hw-001', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'Mathematics', date: '2026-02-27', title: 'Tables Revision',     description: 'Revise tables 1–10 and write each table once in the homework notebook.', due_date: '2026-02-28', teacher_id: 'teacher-001' },
  { id: 'hw-002', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'English',     date: '2026-02-27', title: 'Write 5 Sentences',   description: 'Write 5 meaningful sentences using the new vocabulary words from today\'s lesson.', due_date: '2026-02-28', teacher_id: 'teacher-001' },
  { id: 'hw-003', class_id: 'class-001', class_name: 'Class 1 – Section B', subject: 'Science',     date: '2026-02-26', title: 'Read Chapter 5',      description: 'Read Chapter 5 (Animals and Their Habitats) and answer the review questions at the end.', due_date: '2026-02-27', teacher_id: 'teacher-001' },
  { id: 'hw-004', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'Urdu',        date: '2026-02-26', title: 'اسباق کی نظم یاد کریں', description: 'درسی کتاب کی نظم "پھول" صفحہ 38 یاد کریں اور کاپی میں لکھیں۔', due_date: '2026-02-27', teacher_id: 'teacher-001' },
  { id: 'hw-005', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'Mathematics', date: '2026-02-25', title: 'Division Practice',   description: 'Complete page 52 exercises 1 to 10 from the textbook.', due_date: '2026-02-26', teacher_id: 'teacher-001' },
  { id: 'hw-006', class_id: 'class-001', class_name: 'Class 1 – Section A', subject: 'English',     date: '2026-02-24', title: 'Reading Comprehension', description: 'Read the passage on page 67 and answer all comprehension questions.', due_date: '2026-02-25', teacher_id: 'teacher-001' },
];

export const DUMMY_TEACHER_PORTAL_USERS = [
  {
    id: 'teacher-001',
    first_name: 'Hassan',
    last_name: 'Mahmood',
    email: 'hassan@teacher.tca',
    password: 'teacher@123',
    phone: '+92-333-1234567',
    branch: 'Main Campus',
    designation: 'Senior Teacher',
    department: 'Mathematics & Science',
    joining_date: '2020-04-01',
    portal_type: 'TEACHER',
    assigned_classes: [
      { class_id: 'class-001', class_name: 'Class 1 – Section A', subjects: ['Mathematics', 'Science'], total_students: 40 },
      { class_id: 'class-002', class_name: 'Class 1 – Section B', subjects: ['Science'],                 total_students: 38 },
    ],
    notes:       DUMMY_TEACHER_NOTES.filter((n) => n.teacher_id === 'teacher-001'),
    assignments: DUMMY_TEACHER_ASSIGNMENTS.filter((a) => a.teacher_id === 'teacher-001'),
    homework:    DUMMY_TEACHER_HOMEWORK.filter((h) => h.teacher_id === 'teacher-001'),
    attendance_marked_today: false,
    stats: { total_students: 78, notes_uploaded: 4, assignments_active: 2, classes: 2 },
  },
  {
    id: 'teacher-002',
    first_name: 'Sana',
    last_name: 'Tariq',
    email: 'sana@teacher.tca',
    password: 'teacher@123',
    phone: '+92-321-9876543',
    branch: 'Main Campus',
    designation: 'Teacher',
    department: 'English & Languages',
    joining_date: '2021-08-15',
    portal_type: 'TEACHER',
    assigned_classes: [
      { class_id: 'class-001', class_name: 'Class 1 – Section A', subjects: ['English', 'Art & Craft', 'General Knowledge'], total_students: 40 },
    ],
    notes:       [],
    assignments: [],
    homework:    DUMMY_TEACHER_HOMEWORK.filter((h) => h.subject === 'English'),
    attendance_marked_today: true,
    stats: { total_students: 40, notes_uploaded: 0, assignments_active: 0, classes: 1 },
  },
];

// Student list for teacher's classes (reuse from main dummyData)
export const getTeacherStudents = (teacher) => {
  const classIds = teacher.assigned_classes?.map((c) => c.class_id) || [];
  // Return dummy students — in real app filter by classIds
  return DUMMY_STUDENTS.slice(0, 8).map((s, i) => ({
    ...s,
    class_name: i < 4 ? 'Class 1 – Section A' : 'Class 1 – Section B',
    attendance_today: ['present', 'present', 'late', 'present', 'absent', 'present', 'present', 'present'][i] || 'present',
  }));
};

// ──────────────────────────────────────────────────────────────────────────────
// 8 ▸ PORTAL LOGIN HELPER
// ──────────────────────────────────────────────────────────────────────────────
export function dummyPortalLogin({ email, password, type }) {
  if (type === 'PARENT') {
    const parent = DUMMY_PARENTS.find(
      (p) => p.email.toLowerCase() === email.trim().toLowerCase() && p.password === password,
    );
    if (!parent) throw new Error('Invalid parent credentials');
    return { user: parent, portal_type: 'PARENT', token: `portal-parent-${parent.id}` };
  }
  if (type === 'STUDENT') {
    const student = DUMMY_STUDENT_PORTAL_USERS.find(
      (s) => s.email.toLowerCase() === email.trim().toLowerCase() && s.password === password,
    );
    if (!student) throw new Error('Invalid student credentials');
    return { user: student, portal_type: 'STUDENT', token: `portal-student-${student.id}` };
  }
  if (type === 'TEACHER') {
    const teacher = DUMMY_TEACHER_PORTAL_USERS.find(
      (t) => t.email.toLowerCase() === email.trim().toLowerCase() && t.password === password,
    );
    if (!teacher) throw new Error('Invalid teacher credentials');
    return { user: teacher, portal_type: 'TEACHER', token: `portal-teacher-${teacher.id}` };
  }
  throw new Error('Unknown portal type');
}
