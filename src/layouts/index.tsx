import { ReactNode } from 'react';
// guards
import AuthGuard from '../guards/AuthGuard';
// components
import DashboardLayout from './dashboard';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  variant?: 'default' | 'secondary';
};

export default function Layout({ variant = 'default', children }: Props) {
  if (variant === 'secondary') {
    // secondary layout optional
  }

  return (
    <AuthGuard>
      <DashboardLayout> {children} </DashboardLayout>
    </AuthGuard>
  );
}
