import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome, {user}!</h1>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard; 