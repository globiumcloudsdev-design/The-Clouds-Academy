'use client';

import { useQuery } from '@tanstack/react-query';
import { Building2, CreditCard, Users, TrendingUp } from 'lucide-react';
import { masterAdminService } from '@/services';
import { PageHeader, StatsCard } from '@/components/common';

const fetchStats = () => masterAdminService.getStats();

export default function MasterAdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['master-stats'],
    queryFn:  fetchStats,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Overview"
        description="Dashboard for all schools across The Clouds Academy network"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Total Schools"
          value={stats?.total_schools ?? '—'}
          icon={<Building2 size={18} />}
          loading={isLoading}
        />
        <StatsCard
          label="Active Subscriptions"
          value={stats?.active_subscriptions ?? '—'}
          icon={<CreditCard size={18} />}
          loading={isLoading}
        />
        <StatsCard
          label="Total Users"
          value={stats?.total_users ?? '—'}
          icon={<Users size={18} />}
          loading={isLoading}
        />
        <StatsCard
          label="Total Students"
          value={stats?.total_students ?? '—'}
          icon={<TrendingUp size={18} />}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
