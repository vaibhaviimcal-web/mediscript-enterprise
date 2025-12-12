// Main App Component
// Root component with routing and authentication

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase.config';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setUser, setLoading } from './store/slices/authSlice';
import { AuthService } from './services/auth.service';

// Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import SuperAdminDashboard from './pages/SuperAdmin/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';
import DoctorDashboard from './pages/Doctor/Dashboard';
import NurseDashboard from './pages/Nurse/Dashboard';
import ReceptionistDashboard from './pages/Receptionist/Dashboard';
import LabTechDashboard from './pages/LabTech/Dashboard';
import PharmacistDashboard from './pages/Pharmacist/Dashboard';
import PatientDashboard from './pages/Patient/Dashboard';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';
import { UserRole } from './types/user.types';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await AuthService.getUserData(firebaseUser.uid);
          dispatch(setUser(userData));
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes - Role-Based Dashboards */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.DOCTOR]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nurse/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.NURSE]}>
              <NurseDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionist/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.RECEPTIONIST]}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lab-tech/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.LAB_TECHNICIAN]}>
              <LabTechDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacist/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.PHARMACIST]}>
              <PharmacistDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.PATIENT]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
