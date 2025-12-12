// Admin Dashboard
// Clinic-level administration

import { Routes, Route } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useAppSelector } from '@/hooks/useAppDispatch';

const AdminDashboardHome = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Clinic Administration Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Staff Members
              </Typography>
              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Today's Revenue
              </Typography>
              <Typography variant="h4">₹45,600</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Patients
              </Typography>
              <Typography variant="h4">342</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Bills
              </Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Administrative Tasks
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Manage clinic staff
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Monitor inventory levels
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Generate financial reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Review clinic performance
        </Typography>
      </Paper>
    </Box>
  );
};

const AdminDashboard = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Staff', icon: <PeopleIcon />, path: '/admin/staff' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/admin/inventory' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/admin/reports' },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Admin Dashboard">
      <Routes>
        <Route path="/" element={<AdminDashboardHome />} />
        <Route path="/staff" element={<Typography>Staff Management (Coming Soon)</Typography>} />
        <Route path="/inventory" element={<Typography>Inventory (Coming Soon)</Typography>} />
        <Route path="/reports" element={<Typography>Reports (Coming Soon)</Typography>} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
