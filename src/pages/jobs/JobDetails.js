import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button, Divider, Chip, Avatar, List, ListItem, ListItemText, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Work, LocationOn, AccessTime, Business, AttachMoney, Description, Send, CheckCircle, Cancel } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';

// Données fictives pour l'offre d'emploi
const jobData = {
  id: 1,
  title: 'Développeur Frontend React',
  company: {
    id: 1,
    name: 'TechCorp',
    logo: '/placeholder.svg',
    location: 'Paris'
  },
  location: 'Paris',
  type: 'CDI',
  salary: '45K - 55K €',
  date: '2023-05-10',
  description: 'Nous recherchons un développeur frontend expérimenté pour rejoindre notre équipe dynamique. Vous serez responsable de la conception et du développement d\'interfaces utilisateur réactives et intuitives pour nos applications web.',
  responsibilities: [
    'Développer des interfaces utilisateur réactives et intuitives',
    'Collaborer avec les designers UX/UI pour implémenter les maquettes',
    'Assurer la compatibilité cross-browser et la responsivité',
    'Optimiser les performances des applications',
    'Participer aux revues de code et aux tests'
  ],
  requirements: [
    'Expérience significative en développement frontend avec React',
    'Maîtrise de JavaScript, HTML5 et CSS3',
    'Connaissance des bonnes pratiques de développement web',
    'Expérience avec les outils de build modernes (Webpack, Babel, etc.)',
    'Capacité à travailler en équipe et à communiquer efficacement'
  ],
  benefits: [
    'Salaire compétitif',
    'Télétravail partiel',
    'Tickets restaurant',
    'Mutuelle d\'entreprise',
    'Formation continue'
  ],
  skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Redux', 'TypeScript', 'Git'],
  applications: 12,
  views: 156
};

const JobDetail = () => {
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitApplication = () => {
    // Logique pour soumettre la candidature
    console.log('Candidature soumise avec message:', message);
    setOpenDialog(false);
    // Afficher un message de confirmation
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Container>
      <Grid container spacing={4} sx={{ mt: 2, mb: 4 }}>
        {/* Colonne principale - Détails de l'offre */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {jobData.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Business fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body1" component={Link} to={`/companies/${jobData.company.id}`} sx={{ textDecoration: 'none' }}>
                        {jobData.company.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body1">
                        {jobData.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body1">
                        Publiée le {formatDate(jobData.date)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleOpenDialog}
                >
                  Postuler
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Chip icon={<Work />} label={jobData.type} color="primary" variant="outlined" />
                <Chip icon={<AttachMoney />} label={jobData.salary} variant="outlined" />
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Description du poste
              </Typography>
              <Typography variant="body1" paragraph>
                {jobData.description}
              </Typography>
              
              <Typography variant="h6" gutterBottom>
                Responsabilités
              </Typography>
              <List>
                {jobData.responsibilities.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircle color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Prérequis
              </Typography>
              <List>
                {jobData.requirements.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircle color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Avantages
              </Typography>
              <List>
                {jobData.benefits.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircle color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Compétences requises
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {jobData.skills.map((skill, index) => (
                  <Chip key={index} label={skill} />
                ))}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {jobData.applications} candidature(s) • {jobData.views} vue(s)
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleOpenDialog}
                >
                  Postuler
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Colonne latérale - Informations sur l'entreprise */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                À propos de l'entreprise
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={jobData.company.logo}
                  variant="rounded"
                  sx={{ width: 60, height: 60, mr: 2 }}
                >
                  <Business sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" component={Link} to={`/companies/${jobData.company.id}`} sx={{ textDecoration: 'none' }}>
                    {jobData.company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {jobData.company.location}
                  </Typography>
                </Box>
              </Box>
              
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to={`/companies/${jobData.company.id}`}
              >
                Voir le profil de l'entreprise
              </Button>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="body2" color="text.secondary">
                Partagez cette offre:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button variant="outlined" size="small">
                  LinkedIn
                </Button>
                <Button variant="outlined" size="small">
                  Twitter
                </Button>
                <Button variant="outlined" size="small">
                  Email
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Offres similaires
              </Typography>
              
              <List>
                <ListItem component={Link} to="/jobs/2" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText
                    primary="Développeur Frontend Vue.js"
                    secondary="WebSolutions - Lyon"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem component={Link} to="/jobs/3" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText
                    primary="Développeur React Native"
                    secondary="MobileApp - Paris"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem component={Link} to="/jobs/4" sx={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText
                    primary="Développeur Frontend Angular"
                    secondary="DataTech - Bordeaux"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Dialogue de candidature */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Postuler à l'offre: {jobData.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Votre CV et votre profil seront envoyés avec votre candidature. Vous pouvez ajouter un message personnalisé ci-dessous.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message (optionnel)"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<Cancel />}>
            Annuler
          </Button>
          <Button onClick={handleSubmitApplication} variant="contained" startIcon={<Send />}>
            Envoyer ma candidature
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobDetail;