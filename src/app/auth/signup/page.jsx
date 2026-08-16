'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus, Home, ShoppingBag, Briefcase } from 'lucide-react';
import Link from 'next/link';

const roles = [
  { value: 'buyer', label: 'Buyer / Tenant', icon: ShoppingBag, description: 'Browse properties and make inquiries' },
  { value: 'seller', label: 'Seller / Landlord', icon: Home, description: 'List and manage your properties' },
  { value: 'agent', label: 'Agent', icon: Briefcase, description: 'Manage properties and facilitate transactions' },
];

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('buyer');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(email, password, fullName, selectedRole);
      toast({
        title: 'Account Created!',
        description: 'Welcome to Estate Agency. Your account is ready to use.',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Sign Up Failed',
        description: error.message || 'Could not create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Join Estate Agency to find, list, and manage properties in Nigeria.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-3">
              <Label>Account Type</Label>
              <div className="grid gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                        selectedRole === role.value
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className={`p-2 rounded-md ${selectedRole === role.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{role.label}</p>
                        <p className="text-xs text-muted-foreground">{role.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <Button type="submit" className="w-full py-3" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" /> Sign Up
                </>
              )}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
