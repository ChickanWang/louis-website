import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function LoginPage(props) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(() => { 
      window.location.href = "/adminform";
    })
    .catch((error) => {
      setError('Incorrect Username or Password. Please try again.');
    });
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 'calc(100vh - 10.5rem)',
    }}>
      <Box sx={{
        margin: 'auto'
      }}>
        <Typography component="h1" variant="h5" style={{ marginTop: '20px', textAlign: 'center' }}>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0px 16px' }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default LoginPage;