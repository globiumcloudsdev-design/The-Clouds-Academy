'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { Sparkles, Eye, EyeOff, Users, GraduationCap, BookOpen, Briefcase, Shield, Building2 } from 'lucide-react';

import { authService } from '@/services';
import useAuthStore from '@/store/authStore';
import usePortalStore from '@/store/portalStore';
import { DUMMY_USERS, INSTITUTE_TYPES } from '@/data/dummyData';
import { dummyPortalLogin, PORTAL_DEMO_ACCOUNTS } from '@/data/portalDummyData';

// Login types
const LOGIN_TYPES = {
  STAFF: 'staff',
  PORTAL: 'portal',
};

// Staff login — school_code required
const staffSchema = z.object({
  school_code: z.string().min(2, 'Institute code is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

// Portal login — email + password only
const portalSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(4, 'Minimum 4 characters'),
});

// Role colour mapping for staff
const ROLE_COLORS = {
  MASTER_ADMIN: { bg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300', dot: 'bg-purple-500' },
  INSTITUTE_ADMIN: { bg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300', dot: 'bg-blue-500' },
  SCHOOL_ADMIN: { bg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300', dot: 'bg-blue-500' },
  FEE_MANAGER: { bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300', dot: 'bg-emerald-500' },
  CLASS_TEACHER: { bg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300', dot: 'bg-amber-500' },
  RECEPTIONIST: { bg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300', dot: 'bg-rose-500' },
  BRANCH_ADMIN: { bg: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300', dot: 'bg-teal-500' },
};

// Portal type styling
const PORTAL_TYPE_STYLES = {
  PARENT: { icon: Users, color: 'indigo', gradient: 'from-indigo-600 to-violet-600' },
  STUDENT: { icon: BookOpen, color: 'emerald', gradient: 'from-emerald-600 to-teal-600' },
  TEACHER: { icon: Briefcase, color: 'blue', gradient: 'from-blue-600 to-sky-600' },
};

// Institute type colors for staff
const INST_TYPE_COLORS = {
  school: { bg: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  coaching: { bg: 'bg-orange-100 text-orange-800', dot: 'bg-orange-500' },
  academy: { bg: 'bg-indigo-100 text-indigo-800', dot: 'bg-indigo-500' },
  college: { bg: 'bg-cyan-100 text-cyan-800', dot: 'bg-cyan-500' },
  university: { bg: 'bg-violet-100 text-violet-800', dot: 'bg-violet-500' },
};

const ACCESS_LABELS = {
  MASTER_ADMIN: 'All Institutes',
  INSTITUTE_ADMIN: 'Full Access',
  SCHOOL_ADMIN: 'Full Access',
  FEE_MANAGER: 'Fees only',
  CLASS_TEACHER: 'Class + Exams',
  RECEPTIONIST: 'Limited',
  BRANCH_ADMIN: 'Branch Mgmt',
  PARENT: 'Parent Portal',
  STUDENT: 'Student Portal',
  TEACHER: 'Teacher Portal',
};

function resolveUserMeta(user, isPortal = false) {
  if (isPortal) {
    const style = PORTAL_TYPE_STYLES[user.portal_type] || PORTAL_TYPE_STYLES.STUDENT;
    return {
      colors: { bg: `bg-${style.color}-100 text-${style.color}-800`, dot: `bg-${style.color}-500` },
      badge: `${user.portal_type} Portal`,
    };
  }
  
  const instType = user.school?.institute_type;
  const colors = (user.role_code === 'SCHOOL_ADMIN' && instType && INST_TYPE_COLORS[instType])
    ? INST_TYPE_COLORS[instType]
    : (ROLE_COLORS[user.role_code] ?? { bg: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400' });
  
  const typeDef = instType ? INSTITUTE_TYPES.find((t) => t.value === instType) : null;
  const badge = typeDef ? `${typeDef.icon} ${typeDef.label} Admin` : (user.role?.name ?? user.role_code);
  
  return { colors, badge, typeDef };
}

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setPortalUser = usePortalStore((s) => s.setPortalUser);
  
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loginType, setLoginType] = useState(LOGIN_TYPES.STAFF); // 'staff' | 'portal'
  
  const isPortal = loginType === LOGIN_TYPES.PORTAL;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isPortal ? portalSchema : staffSchema),
  });

  const switchLoginType = (type) => {
    setLoginType(type);
    reset();
  };

  // Get dashboard path based on user role
  const getDashboardPath = (user, portalType = null) => {
    // Portal users
    if (portalType === 'PARENT') return '/parent';
    if (portalType === 'STUDENT') return '/student';
    if (portalType === 'TEACHER') return '/teacher';
    
    // Staff users
    if (user.role_code === 'MASTER_ADMIN') return '/master-admin';
    
    const instType = user.institute_type || user.school?.institute_type || user.institute?.institute_type;
    const DASHBOARD_PATHS = {
      school: '/school/dashboard',
      coaching: '/coaching/dashboard',
      academy: '/academy/dashboard',
      college: '/college/dashboard',
      university: '/university/dashboard',
    };
    return DASHBOARD_PATHS[instType] ?? '/dashboard';
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      if (isPortal) {
        // Portal login
        const result = dummyPortalLogin({ ...data, type: data.portalType || 'PARENT' });
        setPortalUser(result.user, result.portal_type, result.institute_type);
        Cookies.set('portal_token', result.token, { expires: 1 });
        Cookies.set('portal_type', result.portal_type, { expires: 1 });
        toast.success(`Welcome, ${result.user.name || result.user.first_name}!`);
        router.replace(getDashboardPath(null, result.portal_type));
      } else {
        // Staff login
        const res = await authService.login(data);
        setUser(res.user, res.access_token);
        Cookies.set('role_code', res.user.role_code, { expires: 7 });

        const instType = res.user.institute_type || res.user.school?.institute_type || res.user.institute?.institute_type;
        if (instType) Cookies.set('institute_type', instType, { expires: 7 });

        toast.success(`Welcome back, ${res.user.first_name}!`);
        router.replace(getDashboardPath(res.user));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (user, isPortalUser = false) => {
    if (isPortalUser) {
      // Portal user
      if (loginType !== LOGIN_TYPES.PORTAL) switchLoginType(LOGIN_TYPES.PORTAL);
      setTimeout(() => {
        setValue('email', user.email);
        setValue('password', user.password);
        setValue('portalType', user.role);
        toast.info(`Filled: ${user.name} (${user.role} Portal)`);
      }, 0);
    } else {
      // Staff user
      if (loginType !== LOGIN_TYPES.STAFF) switchLoginType(LOGIN_TYPES.STAFF);
      setTimeout(() => {
        setValue('school_code', user.institute_code ?? '');
        setValue('email', user.email);
        setValue('password', user.password);
        toast.info(`Filled: ${user.first_name} (${user.role_code})`);
      }, 0);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

      {/* ════════════════════════ LOGIN FORM ════════════════════════ */}
      <div className="lg:col-span-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="mb-1 text-xl font-semibold">Sign in</h2>
          <p className="mb-6 text-sm text-muted-foreground">Enter your credentials to continue</p>

          {/* ── Login type toggle ── */}
          <div className="mb-5 flex rounded-lg border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => switchLoginType(LOGIN_TYPES.STAFF)}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                !isPortal
                  ? 'bg-background shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Shield className="w-4 h-4" />
              Staff Login
            </button>
            <button
              type="button"
              onClick={() => switchLoginType(LOGIN_TYPES.PORTAL)}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                isPortal
                  ? 'bg-background shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Portal Login
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Institute Code — only for Staff login */}
            {!isPortal && (
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Institute Code <span className="text-destructive">*</span>
                </label>
                <input
                  {...register('school_code')}
                  placeholder="e.g. TCA-SCH"
                  autoComplete="organization"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
                />
                {errors.school_code && (
                  <p className="mt-1 text-xs text-destructive">{errors.school_code.message}</p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder={isPortal ? 'parent@tca.edu.pk' : 'you@school.com'}
                autoComplete="email"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-md border bg-background px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Portal Type Selector */}
            {isPortal && (
              <div>
                <label className="mb-1 block text-sm font-medium">Login as</label>
                <select
                  {...register('portalType')}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="PARENT">Parent</option>
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-end">
              <a href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Signing in…' : `Sign in to ${isPortal ? 'Portal' : 'Dashboard'}`}
            </button>
          </form>
        </div>
      </div>

      {/* ════════════════════════ DEMO CREDENTIALS ════════════════════════ */}
      <div className="lg:col-span-3">
        <div className="rounded-xl border border-dashed bg-muted/40 p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={15} className="text-primary" />
            <span className="text-sm font-semibold">Demo Accounts</span>
            <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
              Click to auto-fill
            </span>
          </div>

          {/* Staff Demo Credentials */}
          {!isPortal && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">STAFF ACCOUNTS</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {DUMMY_USERS.slice(0, 6).map((user) => {
                  const { colors, badge } = resolveUserMeta(user, false);
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => fillDemo(user, false)}
                      className="group flex flex-col items-start rounded-lg border bg-background px-3 py-3 text-left shadow-sm transition-all hover:border-primary hover:shadow-md active:scale-[0.98]"
                    >
                      <div className="mb-2 flex w-full items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                          <span className="truncate text-sm font-semibold leading-tight">
                            {user.first_name} {user.last_name}
                          </span>
                        </div>
                      </div>
                      <div className="w-full space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="w-10 shrink-0 text-[10px] text-muted-foreground">Email</span>
                          <span className="truncate font-mono text-[11px] text-foreground/80">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-10 shrink-0 text-[10px] text-muted-foreground">Pass</span>
                          <span className="font-mono text-[11px] text-foreground/80">{user.password}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-10 shrink-0 text-[10px] text-muted-foreground">Code</span>
                          <span className="font-mono text-[11px] text-foreground/80">{user.institute_code}</span>
                        </div>
                      </div>
                      <div className="mt-2 w-full border-t pt-1.5">
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.bg}`}>
                          {badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Portal Demo Credentials */}
          {isPortal && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">PORTAL ACCOUNTS</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {PORTAL_DEMO_ACCOUNTS.slice(0, 6).map((user) => {
                  const { colors, badge } = resolveUserMeta({ portal_type: user.role }, true);
                  return (
                    <button
                      key={user.email}
                      type="button"
                      onClick={() => fillDemo(user, true)}
                      className="group flex flex-col items-start rounded-lg border bg-background px-3 py-3 text-left shadow-sm transition-all hover:border-primary hover:shadow-md active:scale-[0.98]"
                    >
                      <div className="mb-2 flex w-full items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                          <span className="truncate text-sm font-semibold leading-tight">
                            {user.name}
                          </span>
                        </div>
                      </div>
                      <div className="w-full space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="w-10 shrink-0 text-[10px] text-muted-foreground">Email</span>
                          <span className="truncate font-mono text-[11px] text-foreground/80">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-10 shrink-0 text-[10px] text-muted-foreground">Pass</span>
                          <span className="font-mono text-[11px] text-foreground/80">{user.password}</span>
                        </div>
                      </div>
                      <div className="mt-2 w-full border-t pt-1.5">
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.bg}`}>
                          {badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Works even when backend is offline (demo mode)
          </p>
        </div>
      </div>

    </div>
  );
}
