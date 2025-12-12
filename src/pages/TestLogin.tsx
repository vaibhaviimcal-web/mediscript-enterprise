import { useState } from 'react';
import { Box, Button, Container, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/auth.service';
import { UserRole } from '@/types/user.types';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setUser } from '@/store/slices/authSlice';

interface TestAccount {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

const testAccounts: TestAccount[] = [
  { email: 'superadmin@test.com', password: 'Test@123', role: UserRole.SUPER_ADMIN, name: 'Super Admin' },
  { email: 'admin@test.com', password: 'Test@123', role: UserRole.ADMIN, name: 'Admin' },
  { email: 'doctor@test.com', password: 'Test@123', role: UserRole.DOCTOR, name: 'Doctor' },
  { email: 'nurse@test.com', password: 'Test@123', role: UserRole.NURSE, name: 'Nurse' },
  { email: 'receptionist@test.com', password: 'Test@123', role: UserRole.RECEPTIONIST, name: 'Receptionist' },
  { email: 'labtech@test.com', password: 'Test@123', role: UserRole.LAB_TECHNICIAN, name: 'Lab Tech' },
  { email: 'pharmacist@test.com', password: 'Test@123', role: UserRole.PHARMACIST, name: 'Pharmacist' },
  { email: 'patient@test.com', password: 'Test@123', role: UserRole.PATIENT, name: 'Patient' },
];

export default function TestLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleTestLogin = async (account: TestAccount) => {
    setLoading(account.role);
    setError('');
    setSuccess('');

    try {
      // Try to login first
      try {
        const user = await AuthService.signInWithEmail(account.email, account.password);
        dispatch(setUser(user));
        setSuccess(`Logged in as ${account.name}!`);
        setTimeout(() => navigate('/dashboard'), 1000);
      } catch (loginError: any) {
        // If login fails, try to register
        if (loginError.message.includes('user-not-found') || loginError.message.includes('invalid-credential')) {
          setSuccess(`Creating ${account.name} account...`);
          await AuthService.registerWithEmail(
            account.email,
            account.password,
            account.name,
            account.role
          );
          
          // Now login
          const user = await AuthService.signInWithEmail(account.email, account.password);
          dispatch(setUser(user));
          setSuccess(`Account created and logged in as ${account.name}!`);
          setTimeout(() => navigate('/dashboard'), 1000);
        } else {
          throw loginError;
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          🧪 Test Login - One Click Access
        </Typography>

        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Click any button below to instantly login as that role. If the account doesn't exist, it will be created automatically.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          {testAccounts.map((account) => (
            <Button
              key={account.role}
              variant="contained"
              size="large"
              onClick={() => handleTestLogin(account)}
              disabled={loading !== null}
              sx={{
                py: 2,
                position: 'relative',
                bgcolor: getRoleColor(account.role),
                '&:hover': {
                  bgcolor: getRoleColor(account.role),
                  opacity: 0.9,
                },
              }}
            >
              {loading === account.role ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  {getRoleIcon(account.role)} {account.name}
                </>
              )}
            </Button>
          ))}
        </Box>

        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="caption" display="block" gutterBottom>
            <strong>Test Credentials:</strong>
          </Typography>
          <Typography variant="caption" display="block">
            Email: [role]@test.com (e.g., doctor@test.com)
          </Typography>
          <Typography variant="caption" display="block">
            Password: Test@123
          </Typography>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="outlined" onClick={() => navigate('/login')}>
            Go to Regular Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

function getRoleColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: '#d32f2f',
    [UserRole.ADMIN]: '#f57c00',
    [UserRole.DOCTOR]: '#1976d2',
    [UserRole.NURSE]: '#7b1fa2',
    [UserRole.RECEPTIONIST]: '#388e3c',
    [UserRole.LAB_TECHNICIAN]: '#0097a7',
    [UserRole.PHARMACIST]: '#c2185b',
    [UserRole.PATIENT]: '#455a64',
  };
  return colors[role];
}

function getRoleIcon(role: UserRole): string {
  const icons: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: '👑',
    [UserRole.ADMIN]: '⚙️',
    [UserRole.DOCTOR]: '👨‍⚕️',
    [UserRole.NURSE]: '👩‍⚕️',
    [UserRole.RECEPTIONIST]: '📋',
    [UserRole.LAB_TECHNICIAN]: '🔬',
    [UserRole.PHARMACIST]: '💊',
    [UserRole.PATIENT]: '🧑‍🦱',
  };
  return icons[role];
}
