import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/stores/authStore';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    // Bisa redirect ke halaman 'Unauthorized'
    return <Navigate to="/dashboard" replace />; 
  }

  return children;
};

export default ProtectedRoute;