// Pharmacist Dashboard
// Pharmacy operations and inventory management

import { Routes, Route } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MedicationIcon from '@mui/icons-material/Medication';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import { useAppSelector } from '@/hooks/useAppDispatch';

const PharmacistDashboardHome = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Pharmacy Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Prescriptions
              </Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Dispensed Today
              </Typography>
              <Typography variant="h4">45</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Low Stock Items
              </Typography>
              <Typography variant="h4" color="warning.main">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Expiring Soon
              </Typography>
              <Typography variant="h4" color="error.main">3</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Pharmacy Operations
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • View and dispense prescriptions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Manage medicine inventory
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Track stock levels and expiry dates
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Generate reorder alerts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Process pharmacy billing
        </Typography>
      </Paper>
    </Box>
  );
};

const PharmacistDashboard = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/pharmacist' },
    { text: 'Prescriptions', icon: <MedicationIcon />, path: '/pharmacist/prescriptions' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/pharmacist/inventory' },
    { text: 'Alerts', icon: <WarningIcon />, path: '/pharmacist/alerts' },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Pharmacist Dashboard">
      <Routes>
        <Route path="/" element={<PharmacistDashboardHome />} />
        <Route path="/prescriptions" element={<Typography>Prescriptions (Coming Soon)</Typography>} />
        <Route path="/inventory" element={<Typography>Inventory Management (Coming Soon)</Typography>} />
        <Route path="/alerts" element={<Typography>Stock Alerts (Coming Soon)</Typography>} />
      </Routes>
    </DashboardLayout>
  );
};

export default PharmacistDashboard;
