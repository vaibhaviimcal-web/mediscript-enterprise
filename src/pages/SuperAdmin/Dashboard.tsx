// Super Admin Dashboard
// System-wide administration and management

import { Routes, Route } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useAppSelector } from '@/hooks/useAppDispatch';

const SuperAdminDashboardHome = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        System Administrator Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4">156</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Clinics
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Patients
              </Typography>
              <Typography variant="h4">1,234</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                System Health
              </Typography>
              <Typography variant="h4" color="success.main">99.9%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          System Administration
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Manage all users and roles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Configure clinic settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • View system analytics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Monitor system performance
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Manage billing and subscriptions
        </Typography>
      </Paper>
    </Box>
  );
};

const SuperAdminDashboard = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/super-admin' },
    { text: 'Users', icon: <PeopleIcon />, path: '/super-admin/users' },
    { text: 'Clinics', icon: <BusinessIcon />, path: '/super-admin/clinics' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/super-admin/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/super-admin/settings' },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Super Admin Dashboard">
      <Routes>
        <Route path="/" element={<SuperAdminDashboardHome />} />
        <Route path="/users" element={<Typography>User Management (Coming Soon)</Typography>} />
        <Route path="/clinics" element={<Typography>Clinic Management (Coming Soon)</Typography>} />
        <Route path="/analytics" element={<Typography>Analytics (Coming Soon)</Typography>} />
        <Route path="/settings" element={<Typography>Settings (Coming Soon)</Typography>} />
      </Routes>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
