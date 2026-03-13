'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { Sparkles, Eye, EyeOff, Users, GraduationCap, BookOpen, Briefcase, Shield, Building2, Mail, Lock, Building, ArrowRight, CheckCircle2 } from 'lucide-react';

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
  PARENT: {
    icon: Users,
    bg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
    dot: 'bg-indigo-500',
    cardBg: 'bg-indigo-50 dark:bg-indigo-950/30',
  },
  STUDENT: {
    icon: BookOpen,
    bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    cardBg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  TEACHER: {
    icon: Briefcase,
    bg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    dot: 'bg-blue-500',
    cardBg: 'bg-blue-50 dark:bg-blue-950/30',
  },
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
      colors: { bg: style.bg, dot: style.dot, cardBg: style.cardBg },
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

  // Animated background for hero section
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#ffffff_48%,_#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.16),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_52%,_#111827_100%)]">
      {/* ════════════════════════ LEFT SIDE - HERO SECTION ════════════════════════ */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2 xl:w-[55%]">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800"
          // style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute top-10 left-1/3 h-64 w-64 rounded-full bg-violet-400/15 blur-3xl" />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        </div>

        {/* Content */}
        <div className="relative z-10 mt-0 mx-auto flex h-full w-full max-w-2xl flex-col justify-center px-10 py-12 lg:py-20 text-white xl:px-14">
          {/* Logo & Brand */}
          <div className="flex gap-0">
            <div className="mb-10 flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="leading-tight mb-0">
                <h1 className="text-2xl font-bold tracking-tight">The Clouds Academy</h1>
                <p className="text-blue-200 text-sm">Education Management System</p>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="mb-4 max-w-xl">
              <h2 className="mb-14 text-3xl font-bold leading-tight xl:text-3xl">
              Welcome to your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-indigo-200">
                Learning Hub
              </span>
            
            </h2>
            
            <p className="max-w-lg text-lg leading-relaxed text-blue-100/80">
              Manage your institution, track student progress, and streamline academic operations — all in one powerful platform.
            </p>
                 <div className="mt-0 flex items-center gap-3">
            <div className="flex -space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center text-xs font-medium">
                  {i}
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-100">
              <span className="font-semibold">500+</span> institutions trust us
            </p>
          </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-60">
            {[
              { icon: Users, title: 'Unified Access', desc: 'Staff, students, parents and master admins in one place.' },
              { icon: BookOpen, title: 'Academic Control', desc: 'Classes, sections, exams and results from one dashboard.' },
              { icon: Building2, title: 'Multi-Institute Ready', desc: 'School, academy, college and coaching workflows.' },
              { icon: Shield, title: 'Secure Roles', desc: 'Permission-based access for every operational team.' },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <feature.icon className="mb-3 h-5 w-5 text-blue-100" />
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="mt-1 text-xs leading-5 text-blue-100/75">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
     
        </div>
      </div>

      {/* ════════════════════════ RIGHT SIDE - LOGIN FORM ════════════════════════ */}
      <div className="relative flex w-full items-start justify-center p-6 sm:p-8 lg:w-1/2 lg:p-12 xl:w-[45%]">
        <div className="w-full max-w-lg pt-16 sm:pt-20 lg:pt-0">
          {/* Mobile Logo */}
          <div className="absolute top-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 lg:hidden sm:top-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">The Clouds Academy</h1>
              <p className="text-xs text-muted-foreground">Education Management System</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-900/85 dark:shadow-slate-950/40 sm:p-8">
            {/* Header */}
            <div className="mb-6 text-center">
              {/* <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
                <Sparkles className="h-3.5 w-3.5" />
              </div> */}
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {isPortal ? 'Portal Login' : 'Staff Login'}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {isPortal
                  ? 'Access your parent, student, or teacher portal'
                  : 'Sign in to your institute dashboard'}
              </p>
            </div>

       

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Institute Code - Staff only */}
              {!isPortal && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Institute Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Building className="w-5 h-5" />
                    </div>
                    <input
                      {...register('school_code')}
                      placeholder="e.g. TCA-SCH"
                      autoComplete="organization"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                  </div>
                  {errors.school_code && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {errors.school_code.message}
                    </p>
                  )}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder={isPortal ? 'parent@tca.edu.pk' : 'admin@school.edu.pk'}
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    {...register('password')}
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Portal Type Selector */}
              {isPortal && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Login as
                  </label>
                  <div className="relative">
                    <select
                      {...register('portalType')}
                      className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="PARENT">👨‍👩‍👧 Parent</option>
                      <option value="STUDENT">🎓 Student</option>
                      <option value="TEACHER">👨‍🏫 Teacher</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <a href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to {isPortal ? 'Portal' : 'Dashboard'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-lg shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-900/70 dark:shadow-slate-950/20 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Demo Accounts</span>
              </div>
              <span className="text-[11px] font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                Click to auto-fill
              </span>
            </div>

            {/* Staff Demo Credentials */}
            {!isPortal && (
              <div>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">STAFF ACCOUNTS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DUMMY_USERS.slice(0, 4).map((user) => {
                    const { colors, badge } = resolveUserMeta(user, false);
                    return (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => fillDemo(user, false)}
                        className="group flex flex-col items-start p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-left transition-all duration-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
                      >
                        <div className="flex w-full items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                            <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {user.first_name} {user.last_name}
                            </span>
                          </div>
                        </div>
                        <div className="w-full space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate font-mono text-[11px] text-slate-600 dark:text-slate-400">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">{user.password}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">{user.institute_code}</span>
                          </div>
                        </div>
                        <div className="mt-2 w-full border-t border-slate-200 dark:border-slate-700 pt-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.bg}`}>
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
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">PORTAL ACCOUNTS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PORTAL_DEMO_ACCOUNTS.slice(0, 4).map((user) => {
                    const { colors, badge } = resolveUserMeta({ portal_type: user.role }, true);
                    return (
                      <button
                        key={user.email}
                        type="button"
                        onClick={() => fillDemo(user, true)}
                        className={`group flex flex-col items-start p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-left transition-all duration-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 ${colors.cardBg}`}
                      >
                        <div className="flex w-full items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                            <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {user.name}
                            </span>
                          </div>
                        </div>
                        <div className="w-full space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate font-mono text-[11px] text-slate-600 dark:text-slate-400">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">{user.password}</span>
                          </div>
                        </div>
                        <div className="mt-2 w-full border-t border-slate-200 dark:border-slate-700 pt-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.bg}`}>
                            {badge}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Works even when backend is offline (demo mode)
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
