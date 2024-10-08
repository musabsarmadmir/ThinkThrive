'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Button, Container, Typography, TextField, AppBar, Toolbar, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

// Updated theme with warm colors from FlashcardsPage
const theme = createTheme({
  palette: {
    primary: {
      main: '#C06014', // Warm primary color from FlashcardsPage
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F9A03F', // Warm secondary color from FlashcardsPage
    },
    background: {
      default: '#F1F0EA', // Background color from FlashcardsPage
    },
    text: {
      primary: '#3C3C3C', // Text color from FlashcardsPage
      secondary: '#5D5D5D', // Secondary text color from FlashcardsPage
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#3C3C3C',
    },
    h5: {
      fontWeight: 400,
      color: '#5D5D5D',
    },
  },
});

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password.length <= 5) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/flashcards');
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'An account already exists with this email address.';
          break;
        default:
          errorMessage = 'Failed to sign up. Please check your details and try again.';
      }
      setError(errorMessage);
    }
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            ThinkThrive
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs" >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="60vh"
          gap={8}
          mt={14}
          textAlign="center"
          sx={{ backgroundColor: theme.palette.background.default, p: 2, borderRadius: 2, boxShadow: 3 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
            <TextField
            
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: theme.palette.text.primary } }}
              InputProps={{
                style: { color: theme.palette.text.primary },
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.main,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: theme.palette.text.primary } }}
              InputProps={{
                style: { color: theme.palette.text.primary },
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.main,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.text.primary,
                  },
                },
              }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary" // Warm primary color
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="text"
              color="primary" // Warm primary color
              onClick={handleSignIn}
            >
              Already have an account? Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export { auth };
export default SignUpPage;
