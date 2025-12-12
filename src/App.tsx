import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TestLogin from './pages/TestLogin';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import NurseDashboard from './pages/dashboards/NurseDashboard';
import ReceptionistDashboard from './pages/dashboards/ReceptionistDashboard';
import LabTechDashboard from './pages/dashboards/LabTechDashboard';
import PharmacistDashboard from './pages/dashboards/PharmacistDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import { UserRole } from './types/user.types';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/test" element={<TestLogin />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="super-admin"
              element={
                <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin"
              element={
                <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="doctor"
              element={
                <ProtectedRoute allowedRoles={[UserRole.DOCTOR]}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="nurse"
              element={
                <ProtectedRoute allowedRoles={[UserRole.NURSE]}>
                  <NurseDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="receptionist"
              element={
                <ProtectedRoute allowedRoles={[UserRole.RECEPTIONIST]}>
                  <ReceptionistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="lab-tech"
              element={
                <ProtectedRoute allowedRoles={[UserRole.LAB_TECHNICIAN]}>
                  <LabTechDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="pharmacist"
              element={
                <ProtectedRoute allowedRoles={[UserRole.PHARMACIST]}>
                  <PharmacistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="patient"
              element={
                <ProtectedRoute allowedRoles={[UserRole.PATIENT]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route index element={<Navigate to="/dashboard/doctor" replace />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/test" replace />} />
          <Route path="*" element={<Navigate to="/test" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
