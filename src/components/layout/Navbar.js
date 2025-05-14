import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import {
  Home, AccountCircle, Work, Business, Forum, Reviews,
  Report, AdminPanelSettings, Logout, TrendingUp
} from '@mui/icons-material';

const Navbar = () => {
  const location = useLocation();
  const activeStyle = {
    color: '#1565c0' // Bleu foncé pour les liens actifs
  };

  return (
      <AppBar position="sticky" elevation={1} sx={{ backgroundColor: '#fff', color: '#1976d2' }}>
        <Toolbar>
          {/* Titre */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#1976d2' }}>
            Joby
          </Typography>

          {/* Liens avec icônes */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
                component={Link}
                to="/"
                sx={location.pathname === '/' ? activeStyle : {}}
            >
              <Home />
            </IconButton>
            <IconButton
                component={Link}
                to="/profile"
                sx={location.pathname.startsWith('/profile') ? activeStyle : {}}
            >
              <AccountCircle />
            </IconButton>
            <IconButton
                component={Link}
                to="/companies"
                sx={location.pathname.startsWith('/companies') ? activeStyle : {}}
            >
              <Business />
            </IconButton>
            <IconButton
                component={Link}
                to="/jobs"
                sx={location.pathname.startsWith('/jobs') ? activeStyle : {}}
            >
              <Work />
            </IconButton>
            <IconButton
                component={Link}
                to="/forum"
                sx={location.pathname.startsWith('/forum') ? activeStyle : {}}
            >
              <Forum />
            </IconButton>
            <IconButton
                component={Link}
                to="/reviews"
                sx={location.pathname.startsWith('/reviews') ? activeStyle : {}}
            >
              <Reviews />
            </IconButton>
            <IconButton
                component={Link}
                to="/create-complaint"
                sx={location.pathname.startsWith('/create-complaint') ? activeStyle : {}}
            >
              <Report />
            </IconButton>
            <IconButton
                component={Link}
                to="/admin"
                sx={location.pathname.startsWith('/admin') ? activeStyle : {}}
            >
              <AdminPanelSettings />
            </IconButton>
            <IconButton
                component={Link}
                to="/Perfomance"
                sx={location.pathname.startsWith('/Perfomance') ? activeStyle : {}}
            >
              <TrendingUp />
            </IconButton>
          </Box>

          {/* Bouton logout */}
          <Button color="primary" startIcon={<Logout />} sx={{ ml: 2 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;