import React from 'react';
import App from './App';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import { CircularProgress, Box } from '@mui/material';

// Component that checks auth state
const AuthChecker = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If user is not logged in, show login screen
  if (!user) {
    return <Login />;
  }

  // If user is logged in, show the main app
  return <App />;
};

// Main component with auth provider
const AppWithAuth = () => {
  return (
    <AuthProvider>
      <AuthChecker />
    </AuthProvider>
  );
};

export default AppWithAuth;
