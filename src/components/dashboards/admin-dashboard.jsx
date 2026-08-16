'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, TrendingUp, CheckCircle } from 'lucide-react';

export function AdminDashboard({ profile }) {
  const [stats, setStats] = useState({ users: 0, properties: 0, agreements: 0, inquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [{ count: users }, { count: properties }, { count: buyingAgreements }, { count: rentalAgreements }, { count: inquiries }] = await Promise.all([
          supabase.from('user_profiles').select('*', { count: 'exact', head: true }),
          supabase.from('properties').select('*', { count: 'exact', head: true }),
          supabase.from('buying_agreements').select('*', { count: 'exact', head: true }),
          supabase.from('rental_agreements').select('*', { count: 'exact', head: true }),
          supabase.from('property_inquiries').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          users: users || 0,
          properties: properties || 0,
          agreements: (buyingAgreements || 0) + (rentalAgreements || 0),
          inquiries: inquiries || 0,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.users, icon: Users },
    { label: 'Total Properties', value: stats.properties, icon: Building },
    { label: 'Active Agreements', value: stats.agreements, icon: TrendingUp },
    { label: 'Total Inquiries', value: stats.inquiries, icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{loading ? '...' : stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Platform Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            As an administrator, you have full control over the platform. You can manage users, properties, and monitor all transactions.
            Use the database tools to review user profiles, verify agents, and oversee property listings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
