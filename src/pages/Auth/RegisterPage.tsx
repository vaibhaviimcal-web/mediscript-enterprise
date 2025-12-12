// Registration Page
// User registration with role selection

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { AuthService } from '@/services/auth.service';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setUser } from '@/store/slices/authSlice';
import { UserRole } from '@/types/user.types';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: UserRole.PATIENT,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const user = await AuthService.registerWithEmail(
        formData.email,
        formData.password,
        formData.displayName,
        formData.role
      );
      
      dispatch(setUser(user));
      
      // Navigate to appropriate dashboard
      const roleRoutes: Record<UserRole, string> = {
        [UserRole.SUPER_ADMIN]: '/super-admin',
        [UserRole.ADMIN]: '/admin',
        [UserRole.DOCTOR]: '/doctor',
        [UserRole.NURSE]: '/nurse',
        [UserRole.RECEPTIONIST]: '/receptionist',
        [UserRole.LAB_TECHNICIAN]: '/lab-tech',
        [UserRole.PHARMACIST]: '/pharmacist',
        [UserRole.PATIENT]: '/patient',
      };
      
      navigate(roleRoutes[user.role]);
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Register for MediScript Enterprise
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => handleChange('role', e.target.value)}
                disabled={loading}
              >
                <MenuItem value={UserRole.PATIENT}>Patient</MenuItem>
                <MenuItem value={UserRole.DOCTOR}>Doctor</MenuItem>
                <MenuItem value={UserRole.NURSE}>Nurse</MenuItem>
                <MenuItem value={UserRole.RECEPTIONIST}>Receptionist</MenuItem>
                <MenuItem value={UserRole.LAB_TECHNICIAN}>Lab Technician</MenuItem>
                <MenuItem value={UserRole.PHARMACIST}>Pharmacist</MenuItem>
                <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              margin="normal"
              required
              disabled={loading}
              helperText="Minimum 6 characters"
            />
            
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link href="/login" underline="hover">
              Already have an account? Sign in
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
