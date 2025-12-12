// Protected Route Component
// Handles authentication and role-based access control

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { UserRole } from '@/types/user.types';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const roleRoutes: Record<UserRole, string> = {
      [UserRole.SUPER_ADMIN]: '/super-admin',
      [UserRole.ADMIN]: '/admin',
      [UserRole.DOCTOR]: '/doctor',
      [UserRole.NURSE]: '/nurse',
      [UserRole.RECEPTIONIST]: '/receptionist',
      [UserRole.LAB_TECHNICIAN]: '/lab-tech',
      [UserRole.PHARMACIST]: '/pharmacist',
      [UserRole.PATIENT]: '/patient',
    };

    return <Navigate to={roleRoutes[user.role]} replace />;
  }

  // User is authenticated and has correct role
  return <>{children}</>;
};

export default ProtectedRoute;
