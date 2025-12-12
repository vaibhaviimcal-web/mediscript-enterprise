// Lab Technician Dashboard
// Laboratory test management and results

import { Routes, Route } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScienceIcon from '@mui/icons-material/Science';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useAppSelector } from '@/hooks/useAppDispatch';

const LabTechDashboardHome = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Laboratory Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Tests
              </Typography>
              <Typography variant="h4">15</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed Today
              </Typography>
              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Critical Results
              </Typography>
              <Typography variant="h4" color="error.main">2</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Laboratory Operations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • View and process lab test orders
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Collect patient samples
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Enter test results
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Generate lab reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Manage lab inventory
        </Typography>
      </Paper>
    </Box>
  );
};

const LabTechDashboard = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/lab-tech' },
    { text: 'Test Orders', icon: <ScienceIcon />, path: '/lab-tech/orders' },
    { text: 'Results', icon: <AssignmentTurnedInIcon />, path: '/lab-tech/results' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/lab-tech/inventory' },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Lab Technician Dashboard">
      <Routes>
        <Route path="/" element={<LabTechDashboardHome />} />
        <Route path="/orders" element={<Typography>Test Orders (Coming Soon)</Typography>} />
        <Route path="/results" element={<Typography>Results Entry (Coming Soon)</Typography>} />
        <Route path="/inventory" element={<Typography>Lab Inventory (Coming Soon)</Typography>} />
      </Routes>
    </DashboardLayout>
  );
};

export default LabTechDashboard;
