import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
const Dashboard: React.FC = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Organizer Dashboard</h1>
        
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;