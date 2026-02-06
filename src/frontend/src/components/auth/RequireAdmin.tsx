import { ReactNode } from 'react';
import RequireAuth from './RequireAuth';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface RequireAdminProps {
  children: ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const { data: isAdmin, isLoading, error } = useIsCallerAdmin();

  return (
    <RequireAuth>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error || !isAdmin ? (
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto text-center border-destructive">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10 w-fit">
                <ShieldAlert className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-display">Access Denied</CardTitle>
              <CardDescription>
                You do not have permission to access this page. Admin privileges are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : 'Insufficient permissions'}
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>{children}</>
      )}
    </RequireAuth>
  );
}

