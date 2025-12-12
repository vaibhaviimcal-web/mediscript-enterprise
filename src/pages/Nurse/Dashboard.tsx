// Nurse Dashboard
// Patient care assistance and vitals management

import { Routes, Route } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import { useAppSelector } from '@/hooks/useAppDispatch';

const NurseDashboardHome = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Nurse Care Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Assigned Patients
              </Typography>
              <Typography variant="h4">18</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Vitals Pending
              </Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tasks Today
              </Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Nursing Tasks
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Record patient vitals (BP, temperature, pulse)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Assist doctors with patient care
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Manage patient appointments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Collect lab samples
        </Typography>
      </Paper>
    </Box>
  );
};

const NurseDashboard = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/nurse' },
    { text: 'Patients', icon: <PeopleIcon />, path: '/nurse/patients' },
    { text: 'Vitals', icon: <MonitorHeartIcon />, path: '/nurse/vitals' },
    { text: 'Tasks', icon: <AssignmentIcon />, path: '/nurse/tasks' },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Nurse Dashboard">
      <Routes>
        <Route path="/" element={<NurseDashboardHome />} />
        <Route path="/patients" element={<Typography>Patients (Coming Soon)</Typography>} />
        <Route path="/vitals" element={<Typography>Vitals Entry (Coming Soon)</Typography>} />
        <Route path="/tasks" element={<Typography>Tasks (Coming Soon)</Typography>} />
      </Routes>
    </DashboardLayout>
  );
};

export default NurseDashboard;
