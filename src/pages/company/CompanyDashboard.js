import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button, Tabs, Tab, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@mui/material';
import { Add, Work, Person, Business, Assessment, BarChart, TrendingUp, TrendingDown } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Données fictives pour le tableau de bord de l'entreprise
// Extrait modifié du dashboardData

const dashboardData = {
  company: {
    id: 1,
    name: 'TunisTech',
    logo: '/placeholder.svg'
  },
  stats: {
    jobsPosted: 5,
    activeJobs: 3,
    applications: 42,
    views: 256
  },
  recentJobs: [
    {
      id: 1,
      title: 'Développeur Frontend React',
      location: 'Tunis',
      type: 'CDI',
      date: '2023-05-10',
      applications: 12,
      status: 'active'
    },
    {
      id: 2,
      title: 'Développeur Backend Node.js',
      location: 'Sfax',
      type: 'CDI',
      date: '2023-05-08',
      applications: 8,
      status: 'active'
    },
    {
      id: 3,
      title: 'Designer UX/UI',
      location: 'Sousse',
      type: 'Freelance',
      date: '2023-05-05',
      applications: 5,
      status: 'active'
    }
  ],
  recentApplications: [
    {
      id: 1,
      job: {
        id: 1,
        title: 'Développeur Frontend React'
      },
      candidate: {
        id: 1,
        name: 'Ahmed Ben Salah',
        avatar: '/placeholder-user.jpg',
        title: 'Développeur Full Stack'
      },
      date: '2023-05-12',
      status: 'pending'
    },
    {
      id: 2,
      job: {
        id: 1,
        title: 'Développeur Frontend React'
      },
      candidate: {
        id: 2,
        name: 'Nour El Houda Trabelsi',
        avatar: '/placeholder-user.jpg',
        title: 'Développeuse Frontend'
      },
      date: '2023-05-11',
      status: 'reviewed'
    },
    {
      id: 3,
      job: {
        id: 2,
        title: 'Développeur Backend Node.js'
      },
      candidate: {
        id: 3,
        name: 'Yassine Bouazizi',
        avatar: '/placeholder-user.jpg',
        title: 'Développeur Backend'
      },
      date: '2023-05-10',
      status: 'interview'
    }
  ]
};


const CompanyDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Obtenir la couleur et le libellé en fonction du statut de la candidature
  const getApplicationStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'warning', label: 'En attente' };
      case 'reviewed':
        return { color: 'info', label: 'Examinée' };
      case 'interview':
        return { color: 'success', label: 'Entretien' };
      case 'rejected':
        return { color: 'error', label: 'Refusée' };
      case 'hired':
        return { color: 'success', label: 'Embauché' };
      default:
        return { color: 'default', label: 'Inconnu' };
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={dashboardData.company.logo}
            variant="rounded"
            sx={{ width: 60, height: 60, mr: 2 }}
          >
            <Business sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" component="h1">
            Tableau de bord {dashboardData.company.name}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          component={Link}
          to="/create-job"
        >
          Publier une offre
        </Button>
      </Box>
      
      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Work color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Offres publiées
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {dashboardData.stats.jobsPosted}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp color="success" fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  +2 ce mois
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Work color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Offres actives
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {dashboardData.stats.activeJobs}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingDown color="error" fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  -1 ce mois
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Person color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Candidatures
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {dashboardData.stats.applications}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp color="success" fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  +15 ce mois
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Assessment color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Vues
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {dashboardData.stats.views}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp color="success" fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  +45 ce mois
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Graphique */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Statistiques des candidatures
          </Typography>
          <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart sx={{ fontSize: 100, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Graphique des candidatures (à implémenter)
            </Typography>
          </Box>
        </CardContent>
      </Card>
      
      {/* Onglets */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="company dashboard tabs">
            <Tab label="Offres d'emploi" id="tab-0" />
            <Tab label="Candidatures récentes" id="tab-1" />
          </Tabs>
        </Box>
        
        {/* Contenu de l'onglet Offres d'emploi */}
        <Box role="tabpanel" hidden={tabValue !== 0} id="tabpanel-0" aria-labelledby="tab-0">
          {tabValue === 0 && (
            <List>
              {dashboardData.recentJobs.map((job) => (
                <ListItem key={job.id} divider>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1">
                          {job.title}
                        </Typography>
                        <Chip 
                          label={job.status === 'active' ? 'Active' : 'Fermée'} 
                          color={job.status === 'active' ? 'success' : 'default'} 
                          size="small" 
                          sx={{ ml: 1 }} 
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {job.location} - {job.type}
                        </Typography>
                        {' — Publiée le ' + formatDate(job.date)}
                        <br />
                        <Typography component="span" variant="body2">
                          {job.applications} candidature(s)
                        </Typography>
                      </>
                    }
                  />
                  <Box>
                    <Button 
                      variant="outlined" 
                      component={Link} 
                      to={`/company/jobs/${job.id}`}
                      sx={{ mr: 1 }}
                    >
                      Voir
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error"
                      disabled={job.status !== 'active'}
                    >
                      Fermer
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        
        {/* Contenu de l'onglet Candidatures récentes */}
        <Box role="tabpanel" hidden={tabValue !== 1} id="tabpanel-1" aria-labelledby="tab-1">
          {tabValue === 1 && (
            <List>
              {dashboardData.recentApplications.map((application) => {
                const statusInfo = getApplicationStatusInfo(application.status);
                
                return (
                  <ListItem key={application.id} divider>
                    <ListItemAvatar>
                      <Avatar alt={application.candidate.name} src={application.candidate.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1">
                            {application.candidate.name}
                          </Typography>
                          <Chip 
                            label={statusInfo.label} 
                            color={statusInfo.color} 
                            size="small" 
                            sx={{ ml: 1 }} 
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {application.candidate.title}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Pour: {application.job.title}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Reçue le {formatDate(application.date)}
                          </Typography>
                        </>
                      }
                    />
                    <Button 
                      variant="outlined" 
                      component={Link} 
                      to={`/company/applications/${application.id}`}
                    >
                      Voir
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default CompanyDashboard;