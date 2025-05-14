import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Avatar, Button, Tabs, Tab, Divider, Rating, Chip, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { Business, LocationOn, People, Language, Phone, Email, Work, Star, Add } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';

// Données fictives pour l'entreprise
// Données fictives pour l'entreprise
const companyData = {
  id: 1,
  name: 'InnovaTech',
  logo: '/placeholder.svg',
  coverImage: '/placeholder.svg',
  industry: 'Technologie',
  location: 'Tunis',
  size: '50-200 employés',
  website: 'https://innovatech.tn',
  phone: '+216 71 123 456',
  email: 'contact@innovatech.tn',
  description: 'InnovaTech est une entreprise tunisienne spécialisée dans les solutions numériques innovantes. Fondée en 2015, elle s\'engage à offrir des produits de qualité supérieure dans les domaines du web et du mobile.',
  values: 'Innovation, Excellence, Respect, Transparence',
  rating: 4.3,
  reviewsCount: 18,
  jobs: [
    {
      id: 1,
      title: 'Développeur Frontend React',
      location: 'Tunis',
      type: 'CDI',
      date: '2023-05-10'
    },
    {
      id: 2,
      title: 'Développeur Backend Laravel',
      location: 'Sfax',
      type: 'CDI',
      date: '2023-05-08'
    },
    {
      id: 3,
      title: 'Designer UX/UI',
      location: 'Tunis',
      type: 'Freelance',
      date: '2023-05-05'
    }
  ],
  reviews: [
    {
      id: 1,
      author: {
        id: 1,
        name: 'Yassine Ben Ali',
        avatar: '/placeholder-user.jpg'
      },
      rating: 4.5,
      title: 'Ambiance de travail exceptionnelle',
      content: 'J\'ai eu une excellente expérience chez InnovaTech. L\'équipe est dynamique et les projets sont stimulants.',
      pros: 'Équipe motivée, bons outils, management à l\'écoute',
      cons: 'Parfois des deadlines serrées',
      date: '2023-05-10'
    },
    {
      id: 2,
      author: {
        id: 2,
        name: 'Nour El Houda Mejri',
        avatar: '/placeholder-user.jpg'
      },
      rating: 4.0,
      title: 'Bon environnement pour apprendre',
      content: 'J\'ai beaucoup appris durant mon stage. L\'équipe m\'a bien encadrée et les technologies utilisées sont modernes.',
      pros: 'Encadrement, technologies récentes, environnement agréable',
      cons: 'Manque de flexibilité sur les horaires',
      date: '2023-04-15'
    }
  ]
};


const CompanyDetail = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Container>
      {/* En-tête de l'entreprise */}
      <Box sx={{ position: 'relative', mb: 4, mt: 4 }}>
        <Box 
          sx={{ 
            height: 200, 
            width: '100%', 
            backgroundColor: 'primary.light',
            borderRadius: 2,
            mb: 2
          }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative', mt: -5 }}>
          <Avatar
            src={companyData.logo}
            variant="rounded"
            sx={{ 
              width: 120, 
              height: 120, 
              border: '4px solid white',
              backgroundColor: 'white',
              ml: 3
            }}
          >
            <Business sx={{ fontSize: 60 }} />
          </Avatar>
          
          <Box sx={{ ml: 3, flex: 1 }}>
            <Typography variant="h4" component="h1">
              {companyData.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {companyData.industry}
            </Typography>
          </Box>
          
          <Box>
            <Button variant="contained">
              Suivre
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Informations et onglets */}
      <Grid container spacing={4}>
        {/* Colonne de gauche - Informations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informations
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  {companyData.location}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <People sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  {companyData.size}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Language sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  <a href={companyData.website} target="_blank" rel="noopener noreferrer">
                    {companyData.website}
                  </a>
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  {companyData.phone}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Email sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  {companyData.email}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Note globale
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={companyData.rating} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({companyData.rating})
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Basée sur {companyData.reviewsCount} avis
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Offres d'emploi
              </Typography>
              
              <List>
                {companyData.jobs.map((job) => (
                  <ListItem 
                    key={job.id} 
                    component={Link} 
                    to={`/jobs/${job.id}`}
                    sx={{ 
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                  >
                    <Typography variant="subtitle1">
                      {job.title}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        {job.location} - {job.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(job.date)}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to={`/companies/${companyData.id}/jobs`}
                >
                  Voir toutes les offres
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Colonne de droite - Onglets */}
        <Grid item xs={12} md={8}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="company tabs">
                <Tab label="À propos" id="tab-0" />
                <Tab label="Avis" id="tab-1" />
              </Tabs>
            </Box>
            
            {/* Contenu de l'onglet À propos */}
            <Box role="tabpanel" hidden={tabValue !== 0} id="tabpanel-0" aria-labelledby="tab-0">
              {tabValue === 0 && (
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Présentation
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {companyData.description}
                  </Typography>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" gutterBottom>
                    Nos valeurs
                  </Typography>
                  <Typography variant="body1">
                    {companyData.values}
                  </Typography>
                </CardContent>
              )}
            </Box>
            
            {/* Contenu de l'onglet Avis */}
            <Box role="tabpanel" hidden={tabValue !== 1} id="tabpanel-1" aria-labelledby="tab-1">
              {tabValue === 1 && (
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">
                      Avis des employés
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<Add />}
                      component={Link}
                      to={`/create-review?type=company&id=${companyData.id}`}
                    >
                      Ajouter un avis
                    </Button>
                  </Box>
                  
                  {companyData.reviews.map((review) => (
                    <Card key={review.id} variant="outlined" sx={{ mb: 3 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <ListItemAvatar>
                            <Avatar alt={review.author.name} src={review.author.avatar} />
                          </ListItemAvatar>
                          <Box>
                            <Typography variant="subtitle1">
                              {review.author.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(review.date)}
                            </Typography>
                          </Box>
                          <Box sx={{ ml: 'auto' }}>
                            <Rating value={review.rating} precision={0.5} readOnly size="small" />
                          </Box>
                        </Box>
                        
                        <Typography variant="h6" gutterBottom>
                          {review.title}
                        </Typography>
                        
                        <Typography variant="body1" paragraph>
                          {review.content}
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="success.main">
                              Points positifs:
                            </Typography>
                            <Typography variant="body2" paragraph>
                              {review.pros}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="error.main">
                              Points négatifs:
                            </Typography>
                            <Typography variant="body2" paragraph>
                              {review.cons}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      component={Link} 
                      to={`/companies/${companyData.id}/reviews`}
                    >
                      Voir tous les avis
                    </Button>
                  </Box>
                </CardContent>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyDetail;