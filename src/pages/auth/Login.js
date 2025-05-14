import React, { useState, useRef } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, FormControlLabel, Checkbox, Grid, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6Le8cjkrAAAAALbk7pAd07msGmEg8TKM8tRAMzwW'; // Replace this with your actual site key

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    userType: 'user'
  });
  const [errors, setErrors] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
  };

  const handleUserTypeChange = (type) => {
    setFormData({
      ...formData,
      userType: type
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email est invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    if (!captchaVerified) {
      newErrors.captcha = 'Veuillez valider le CAPTCHA';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
    if (value) {
      setErrors(prev => ({ ...prev, captcha: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Logique de connexion ici
      console.log('Connexion avec:', formData);
      
      // Redirection après connexion réussie
      navigate('/dashboard');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          
          <Box sx={{ mt: 2, mb: 4, display: 'flex', width: '100%' }}>
            <Button
              fullWidth
              variant={formData.userType === 'user' ? 'contained' : 'outlined'}
              onClick={() => handleUserTypeChange('user')}
              sx={{ mr: 1 }}
            >
              Particulier
            </Button>
            <Button
              fullWidth
              variant={formData.userType === 'company' ? 'contained' : 'outlined'}
              onClick={() => handleUserTypeChange('company')}
              sx={{ ml: 1 }}
            >
              Entreprise
            </Button>
          </Box>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  name="rememberMe" 
                  color="primary" 
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
              }
              label="Se souvenir de moi"
            />

            {/* CAPTCHA */}
            <Box sx={{ mt: 2, mb: 1 }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
              {errors.captcha && (
                <Typography color="error" variant="body2">{errors.captcha}</Typography>
              )}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
            
            <Grid container>
              <Grid item xs>
                <MuiLink component={Link} to="/forgot-password" variant="body2">
                  Mot de passe oublié?
                </MuiLink>
              </Grid>
              
              <Grid item>
                <MuiLink component={Link} to="/register" variant="body2">
                  {"Pas de compte? S'inscrire"}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
