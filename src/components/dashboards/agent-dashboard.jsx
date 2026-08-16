'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, TrendingUp, Users } from 'lucide-react';

export function AgentDashboard({ profile }) {
  const [stats, setStats] = useState({ managedProperties: 0, sales: 0, rentals: 0 });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.id) return;
      try {
        const [{ count: managedCount }, { data: props }, { count: salesCount }, { count: rentalsCount }] = await Promise.all([
          supabase.from('properties').select('*', { count: 'exact', head: true }).eq('agent_id', profile.id),
          supabase.from('properties').select('id, title, address, city, state, price, status').eq('agent_id', profile.id).order('created_at', { ascending: false }),
          supabase.from('buying_agreements').select('*', { count: 'exact', head: true }).eq('agent_id', profile.id),
          supabase.from('rental_agreements').select('*', { count: 'exact', head: true }).eq('agent_id', profile.id),
        ]);

        setStats({
          managedProperties: managedCount || 0,
          sales: salesCount || 0,
          rentals: rentalsCount || 0,
        });
        setProperties(props || []);
      } catch (error) {
        console.error('Error fetching agent data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [profile]);

  const statCards = [
    { label: 'Managed Properties', value: stats.managedProperties, icon: Building },
    { label: 'Sales Deals', value: stats.sales, icon: TrendingUp },
    { label: 'Rental Deals', value: stats.rentals, icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Agent Dashboard</h2>
        <p className="text-muted-foreground">Manage your clients and transactions</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          <CardTitle>Managed Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : properties.length > 0 ? (
            <div className="space-y-3">
              {properties.map((prop) => (
                <div key={prop.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{prop.title}</p>
                    <p className="text-sm text-muted-foreground">{prop.address}, {prop.city}, {prop.state}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${prop.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {prop.status}
                    </span>
                    <span className="text-sm font-semibold">${Number(prop.price).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Briefcase className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">You are not currently managing any properties.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
