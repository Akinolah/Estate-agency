'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Home, MessageSquare, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

export function SellerDashboard({ profile }) {
  const [stats, setStats] = useState({ properties: 0, inquiries: 0, agreements: 0 });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.id) return;
      try {
        const [{ count: propertiesCount }, { data: props }, { count: inquiries }] = await Promise.all([
          supabase.from('properties').select('*', { count: 'exact', head: true }).eq('seller_id', profile.id),
          supabase.from('properties').select('id, title, address, city, state, price, status, is_rental').eq('seller_id', profile.id).order('created_at', { ascending: false }),
          supabase.from('property_inquiries').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          properties: propertiesCount || 0,
          inquiries: inquiries || 0,
          agreements: 0,
        });
        setProperties(props || []);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [profile]);

  const statCards = [
    { label: 'My Properties', value: stats.properties, icon: Home },
    { label: 'Active Inquiries', value: stats.inquiries, icon: MessageSquare },
    { label: 'Agreements', value: stats.agreements, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Seller Dashboard</h2>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Button asChild>
          <Link href="/listings">
            <Plus className="mr-2 h-4 w-4" /> List Property
          </Link>
        </Button>
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
          <CardTitle>My Properties</CardTitle>
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
                    {prop.is_rental && <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">For Rent</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Building className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">You haven&apos;t listed any properties yet.</p>
              <Button asChild className="mt-4">
                <Link href="/listings">Browse Listings</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
