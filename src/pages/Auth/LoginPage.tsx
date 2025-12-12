// Login Page
// Email/Password and Google Sign-In

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthService } from '@/services/auth.service';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setUser } from '@/store/slices/authSlice';
import { UserRole } from '@/types/user.types';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await AuthService.signInWithEmail(email, password);
      dispatch(setUser(user));
      
      // Navigate to appropriate dashboard based on role
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
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = await AuthService.signInWithGoogle();
      dispatch(setUser(user));
      
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
      setError(err.message || 'Failed to sign in with Google');
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
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            MediScript Enterprise
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Sign in to access your dashboard
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleEmailLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Sign in with Google
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link href="/register" underline="hover">
              Don't have an account? Register
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
