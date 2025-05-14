import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, mt: 'auto', backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Joby - Tous droits réservés
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="#">
            Conditions d'utilisation
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="#">
            Politique de confidentialité
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;