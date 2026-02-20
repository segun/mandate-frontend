import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const requirePasswordChange = useAuthStore((state) => state.user?.requirePasswordChange);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requirePasswordChange && window.location.pathname !== '/force-password-change') {
    return <Navigate to="/force-password-change" replace />;
  }

  return <Outlet />;
}
