// Patient Dashboard
// Personal health portal for patients

import { Routes, Route } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAppSelector } from '@/hooks/useAppDispatch';

const PatientDashboardHome = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Your Personal Health Portal
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Upcoming Appointments
              </Typography>
              <Typography variant="h4">2</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Prescriptions
              </Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Bills
              </Typography>
              <Typography variant="h4">₹2,400</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Medical Reports
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Book new appointment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • View medical records
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Download prescriptions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Pay pending bills
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Download lab reports
        </Typography>
      </Paper>
    </Box>
  );
};

const PatientDashboard = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/patient' },
    { text: 'Appointments', icon: <CalendarMonthIcon />, path: '/patient/appointments' },
    { text: 'Prescriptions', icon: <MedicationIcon />, path: '/patient/prescriptions' },
    { text: 'Reports', icon: <DescriptionIcon />, path: '/patient/reports' },
    { text: 'Billing', icon: <ReceiptIcon />, path: '/patient/billing' },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Patient Portal">
      <Routes>
        <Route path="/" element={<PatientDashboardHome />} />
        <Route path="/appointments" element={<Typography>My Appointments (Coming Soon)</Typography>} />
        <Route path="/prescriptions" element={<Typography>My Prescriptions (Coming Soon)</Typography>} />
        <Route path="/reports" element={<Typography>Medical Reports (Coming Soon)</Typography>} />
        <Route path="/billing" element={<Typography>Billing & Payments (Coming Soon)</Typography>} />
      </Routes>
    </DashboardLayout>
  );
};

export default PatientDashboard;
