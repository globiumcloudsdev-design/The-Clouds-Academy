# Unified Login Implementation - TODO List

## Task: Create unified login for all user types (Super Admin, Branch Admin, Teacher, Parent, Student)

### Steps to Complete:

1. [ ] **Update DUMMY_USERS in dummyData.js**
   - Add portal users (Parent, Student, Teacher from portal data) to DUMMY_USERS
   - Ensure all user types have proper role_code and credentials

2. [ ] **Update authService.js**
   - Modify login function to handle both staff and portal users
   - Return appropriate user object with portal_type for portal users

3. [ ] **Update authStore.js**
   - Add portal user handling support
   - Update redirect logic for portal users

4. [ ] **Create Unified Login Page (/login)**
   - Merge staff and portal login into single interface
   - Add role type selector (Staff vs Portal)
   - Update demo accounts section
   - Implement proper redirect logic

5. [ ] **Test and Verify**
   - Verify all user types can log in
   - Verify redirects work correctly

### Role to Dashboard Mapping:
- MASTER_ADMIN → /master-admin
- SCHOOL_ADMIN / INSTITUTE_ADMIN → /academy/dashboard (or institute-type specific)
- BRANCH_ADMIN → /academy/dashboard (branch-specific)
- CLASS_TEACHER / TEACHER → /teacher
- PARENT → /parent
- STUDENT → /student
- FEE_MANAGER → /academy/dashboard
- RECEPTIONIST → /academy/dashboard

