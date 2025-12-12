// Receptionist Dashboard
// Patient registration, appointments, and billing

import { Routes, Route } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useAppSelector } from '@/hooks/useAppDispatch';

const ReceptionistDashboardHome = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Front Desk Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Today's Appointments
              </Typography>
              <Typography variant="h4">32</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Walk-ins
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Payments
              </Typography>
              <Typography variant="h4">₹12,400</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Current Token
              </Typography>
              <Typography variant="h4">T-24</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Front Desk Operations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Register new patients
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Schedule and manage appointments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Process billing and payments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Manage queue tokens
        </Typography>
      </Paper>
    </Box>
  );
};

const ReceptionistDashboard = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/receptionist' },
    { text: 'Registration', icon: <PersonAddIcon />, path: '/receptionist/registration' },
    { text: 'Appointments', icon: <CalendarMonthIcon />, path: '/receptionist/appointments' },
    { text: 'Billing', icon: <ReceiptIcon />, path: '/receptionist/billing' },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Receptionist Dashboard">
      <Routes>
        <Route path="/" element={<ReceptionistDashboardHome />} />
        <Route path="/registration" element={<Typography>Patient Registration (Coming Soon)</Typography>} />
        <Route path="/appointments" element={<Typography>Appointments (Coming Soon)</Typography>} />
        <Route path="/billing" element={<Typography>Billing (Coming Soon)</Typography>} />
      </Routes>
    </DashboardLayout>
  );
};

export default ReceptionistDashboard;
