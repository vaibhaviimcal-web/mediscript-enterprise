// Doctor Dashboard
// Main dashboard for doctors

import { Routes, Route } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import { useAppSelector } from '@/hooks/useAppDispatch';

const DoctorDashboardHome = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, Dr. {user?.displayName}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Your personalized doctor dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Today's Patients
              </Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Appointments
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Prescriptions
              </Typography>
              <Typography variant="h4">15</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Reviews
              </Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • View patient records
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Create AI-powered prescriptions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Schedule appointments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Review lab results
        </Typography>
      </Paper>
    </Box>
  );
};

const DoctorDashboard = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/doctor' },
    { text: 'Patients', icon: <PeopleIcon />, path: '/doctor/patients' },
    { text: 'Appointments', icon: <CalendarMonthIcon />, path: '/doctor/appointments' },
    { text: 'Prescriptions', icon: <MedicationIcon />, path: '/doctor/prescriptions' },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Doctor Dashboard">
      <Routes>
        <Route path="/" element={<DoctorDashboardHome />} />
        <Route path="/patients" element={<Typography>Patients (Coming Soon)</Typography>} />
        <Route path="/appointments" element={<Typography>Appointments (Coming Soon)</Typography>} />
        <Route path="/prescriptions" element={<Typography>Prescriptions (Coming Soon)</Typography>} />
      </Routes>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
