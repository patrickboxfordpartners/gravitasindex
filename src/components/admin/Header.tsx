'use client';

import { useUser, signOut } from '@/lib/supabase/client-auth';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-panel border-b border-border px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-medium text-text-main">Admin Dashboard</h1>
        <p className="text-sm text-text-muted">Manage leads, content, and analytics</p>
      </div>

      {!loading && user && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-text-main">{user.email}</p>
            <p className="text-xs text-text-muted">Administrator</p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="default"
            className="text-sm"
          >
            Sign Out
          </Button>
        </div>
      )}
    </header>
  );
}
