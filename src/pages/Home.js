import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { Work, Business, Forum, Star, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenue sur Joby
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Trouvez votre emploi idéal ou le candidat parfait pour votre entreprise
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" size="large" component={Link} to="/jobs" sx={{ mr: 2 }}>
            Voir les offres
          </Button>
          <Button variant="outlined" size="large" component={Link} to="/register">
            Créer un compte
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 4, textAlign: 'center' }}>
        Nos services
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Work fontSize="large" color="primary" />
              </Box>
              <Typography variant="h5" component="h3" gutterBottom>
                Offres d'emploi
              </Typography>
              <Typography>
                Parcourez des milliers d'offres d'emploi et postulez en quelques clics.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/jobs">En savoir plus</Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Business fontSize="large" color="primary" />
              </Box>
              <Typography variant="h5" component="h3" gutterBottom>
                Entreprises
              </Typography>
              <Typography>
                Découvrez les entreprises qui recrutent et consultez leurs avis.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/companies">En savoir plus</Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Forum fontSize="large" color="primary" />
              </Box>
              <Typography variant="h5" component="h3" gutterBottom>
                Forum
              </Typography>
              <Typography>
                Échangez avec d'autres professionnels et partagez vos expériences.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/forum">En savoir plus</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Latest Jobs Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        Dernières offres d'emploi
      </Typography>
      
      <Grid container spacing={4}>
        {[1, 2, 3].map((job) => (
          <Grid item xs={12} md={4} key={job}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Développeur Frontend
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  TechCorp
                </Typography>
                <Typography variant="body2">
                  Nous recherchons un développeur frontend expérimenté pour rejoindre notre équipe...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/jobs/${job}`}>Voir l'offre</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4, mb: 8 }}>
        <Button variant="contained" component={Link} to="/jobs">
          Voir toutes les offres
        </Button>
      </Box>
    </Container>
  );
};

export default Home;