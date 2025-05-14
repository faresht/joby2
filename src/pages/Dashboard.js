import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Tableau de bord
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Bienvenue sur votre tableau de bord</Typography>
              <Typography variant="body1">
                Ici vous pouvez gérer votre profil, vos candidatures et vos messages.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;