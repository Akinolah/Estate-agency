'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, MessageSquare, Search } from 'lucide-react';
import Link from 'next/link';

export function BuyerDashboard({ profile }) {
  const [stats, setStats] = useState({ inquiries: 0, savedProperties: 0 });
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.id) return;
      try {
        const { data: inqData, count: inqCount } = await supabase
          .from('property_inquiries')
          .select('id, property_id, inquiry_type, message, created_at, properties(id, title, address, city, state, price)', { count: 'exact' })
          .eq('buyer_id', profile.id)
          .order('created_at', { ascending: false });

        setStats({
          inquiries: inqCount || 0,
          savedProperties: 0,
        });
        setInquiries(inqData || []);
      } catch (error) {
        console.error('Error fetching buyer data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [profile]);

  const statCards = [
    { label: 'My Inquiries', value: stats.inquiries, icon: MessageSquare },
    { label: 'Saved Properties', value: stats.savedProperties, icon: Home },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Buyer Dashboard</h2>
          <p className="text-muted-foreground">Browse properties and track your inquiries</p>
        </div>
        <Button asChild>
          <Link href="/listings">
            <Search className="mr-2 h-4 w-4" /> Browse Properties
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <CardTitle>My Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : inquiries.length > 0 ? (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{inq.properties?.title || 'Property removed'}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">{inq.inquiry_type}</span>
                  </div>
                  {inq.properties && (
                    <p className="text-sm text-muted-foreground">{inq.properties.address}, {inq.properties.city}, {inq.properties.state}</p>
                  )}
                  {inq.message && <p className="text-sm text-muted-foreground mt-1 italic">&ldquo;{inq.message}&rdquo;</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">You haven&apos;t made any inquiries yet.</p>
              <Button asChild className="mt-4">
                <Link href="/listings">Start Browsing</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
