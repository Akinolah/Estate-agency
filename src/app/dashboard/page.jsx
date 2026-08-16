'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { AdminDashboard } from '@/components/dashboards/admin-dashboard';
import { SellerDashboard } from '@/components/dashboards/seller-dashboard';
import { BuyerDashboard } from '@/components/dashboards/buyer-dashboard';
import { AgentDashboard } from '@/components/dashboards/agent-dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, LogOut, Home } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, userProfile, loading, isAuthenticated, isAdmin, isSeller, isBuyer, isAgent, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const roleName = userProfile?.user_roles?.role_name;

  return (
    <div className="container py-8 md:py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {userProfile?.full_name || user?.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </div>

      {!userProfile && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <p className="text-sm text-yellow-800">
              Your profile is not fully set up yet. Some features may be limited. Please contact support if this persists.
            </p>
          </CardContent>
        </Card>
      )}

      {roleName === 'admin' && <AdminDashboard profile={userProfile} />}
      {roleName === 'seller' && <SellerDashboard profile={userProfile} />}
      {roleName === 'buyer' && <BuyerDashboard profile={userProfile} />}
      {roleName === 'agent' && <AgentDashboard profile={userProfile} />}
      {!roleName && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Your account role could not be determined. Please contact support.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
