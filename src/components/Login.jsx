import React, { useState } from 'react'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  CircularProgress,
  Container
} from './mui'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from '../hooks/useTranslation'

const Login = ({ onToggleMode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [signupSuccess, setSignupSuccess] = useState(false)
  
  const { signIn, signUp } = useAuth()
  const { currentTranslations } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setSignupSuccess(false)
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, firstName)
        if (error) {
          setError(error.message)
        } else {
          // Show detailed success message
          setSignupSuccess(true)
          setMessage('🎉 Account created! Please check your email to confirm your account. Click the link in the email, then come back here to sign in.')
          setIsSignUp(false) // Switch to login mode
          // Clear signup form
          setEmail('')
          setPassword('')
          setFirstName('')
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) {
          // Provide helpful message for common errors
          if (error.message.includes('Email not confirmed')) {
            setError('Please confirm your email first. Check your inbox for the confirmation link.')
          } else if (error.message.includes('Invalid login')) {
            setError('Invalid email or password. Please try again.')
          } else {
            setError(error.message)
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Reasonly
          </Typography>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {message && (
            <Alert severity={signupSuccess ? "success" : "info"} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {isSignUp && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={loading}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus={!isSignUp}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              helperText={isSignUp ? 'At least 6 characters' : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                isSignUp ? 'Sign Up' : 'Sign In'
              )}
            </Button>
            <Box textAlign="center">
              <Link
                component="button"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault()
                  setIsSignUp(!isSignUp)
                  setError('')
                  setMessage('')
                }}
                disabled={loading}
              >
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
