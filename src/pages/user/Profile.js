import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Button, Avatar, Divider, Chip, List, ListItem, ListItemText, ListItemIcon, Tab, Tabs } from '@mui/material';
import { Edit, Work, School, LocationOn, Email, Phone, LinkedIn, GitHub, Language, Description } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Données fictives pour le profil utilisateur
const userData = {
  id: 1,
  firstName: 'Amine',
  lastName: 'Ben Ahmed',
  title: 'Développeur Frontend',
  location: 'Tunis, Tunisie',
  email: 'amine.benahmed@gmail.com',
  phone: '+216 50 123 456',
  about: 'Développeur passionné avec plus de 3 ans d\'expérience dans le développement frontend. Spécialisé en React, JavaScript et CSS.',
  skills: ['React', 'JavaScript', 'HTML/CSS', 'Vue.js', 'Sass', 'Git', 'Bootstrap'],
  experience: [
    {
      id: 1,
      title: 'Développeur Frontend',
      company: 'TunisTech',
      location: 'Tunis',
      startDate: '2022-05',
      endDate: null,
      current: true,
      description: 'Développement d\'interfaces utilisateur avec React et Redux, intégration de services API et mise en place de composants réutilisables.'
    },
    {
      id: 2,
      title: 'Développeur Web',
      company: 'SfaxDigital',
      location: 'Sfax',
      startDate: '2020-07',
      endDate: '2022-04',
      current: false,
      description: 'Création d\'applications web avec Vue.js et gestion de bases de données MySQL.'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'Master en Informatique',
      school: 'Université de Tunis',
      location: 'Tunis',
      startDate: '2016',
      endDate: '2018',
      description: 'Spécialisation en développement web et bases de données.'
    },
    {
      id: 2,
      degree: 'Licence en Informatique',
      school: 'Université de Sfax',
      location: 'Sfax',
      startDate: '2013',
      endDate: '2016',
      description: 'Formation générale en développement logiciel.'
    }
  ],
  languages: [
    { language: 'Arabe', level: 'Natif' },
    { language: 'Français', level: 'Courant' },
    { language: 'Anglais', level: 'Intermédiaire' }
  ],
  socialLinks: {
    linkedin: 'https://linkedin.com/in/aminebenahmed',
    github: 'https://github.com/aminebenahmed',
    portfolio: 'https://aminebenahmed.com'
  }
}
const Profile = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Formatage des dates
  const formatDate = (dateString, current = false) => {
    if (current) return 'Présent';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long'
    });
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        {/* En-tête du profil */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              sx={{ width: 150, height: 150 }}
              alt={`${userData.firstName} ${userData.lastName}`}
              src="/placeholder-user.jpg"
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" component="h1">
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {userData.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{userData.location}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Email fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{userData.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Phone fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{userData.phone}</Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                component={Link}
                to="/profile/edit"
              >
                Modifier
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Onglets */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
              <Tab label="Profil" id="tab-0" />
              <Tab label="CV" id="tab-1" />
            </Tabs>
          </Box>

          {/* Contenu de l'onglet Profil */}
          <Box role="tabpanel" hidden={tabValue !== 0} id="tabpanel-0" aria-labelledby="tab-0" sx={{ py: 3 }}>
            {tabValue === 0 && (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  À propos
                </Typography>
                <Typography paragraph>{userData.about}</Typography>

                <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
                  Compétences
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                  {userData.skills.map((skill, index) => (
                    <Chip key={index} label={skill} color="primary" variant="outlined" />
                  ))}
                </Box>

                <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
                  Expérience professionnelle
                </Typography>
                <List>
                  {userData.experience.map((exp) => (
                    <ListItem key={exp.id} alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <Work />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" component="div">
                            {exp.title} - {exp.company}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {exp.location} | {formatDate(exp.startDate)} - {exp.current ? 'Présent' : formatDate(exp.endDate)}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {exp.description}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
                  Formation
                </Typography>
                <List>
                  {userData.education.map((edu) => (
                    <ListItem key={edu.id} alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <School />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" component="div">
                            {edu.degree} - {edu.school}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {edu.location} | {edu.startDate} - {edu.endDate}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {edu.description}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
                  Langues
                </Typography>
                <List>
                  {userData.languages.map((lang, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <Language />
                      </ListItemIcon>
                      <ListItemText
                        primary={lang.language}
                        secondary={lang.level}
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
                  Liens
                </Typography>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <LinkedIn />
                    </ListItemIcon>
                    <ListItemText
                      primary="LinkedIn"
                      secondary={userData.socialLinks.linkedin}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <GitHub />
                    </ListItemIcon>
                    <ListItemText
                      primary="GitHub"
                      secondary={userData.socialLinks.github}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <Language />
                    </ListItemIcon>
                    <ListItemText
                      primary="Portfolio"
                      secondary={userData.socialLinks.portfolio}
                    />
                  </ListItem>
                </List>
              </>
            )}
          </Box>

          {/* Contenu de l'onglet CV */}
          <Box role="tabpanel" hidden={tabValue !== 1} id="tabpanel-1" aria-labelledby="tab-1" sx={{ py: 3 }}>
            {tabValue === 1 && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" component="h2">
                    Mon CV
                  </Typography>
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<Description />}
                      sx={{ mr: 2 }}
                    >
                      Télécharger PDF
                    </Button>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/cv"
                    >
                      Éditer CV
                    </Button>
                  </Box>
                </Box>

                <Paper elevation={1} sx={{ p: 3, mb: 4, border: '1px solid #e0e0e0' }}>
                  {/* Aperçu du CV */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h1" gutterBottom>
                      {userData.firstName} {userData.lastName}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {userData.title}
                    </Typography>
                    <Typography variant="body2">
                      {userData.location} | {userData.email} | {userData.phone}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Résumé
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {userData.about}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Expérience professionnelle
                  </Typography>
                  {userData.experience.map((exp) => (
                    <Box key={exp.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" component="div">
                        {exp.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {exp.company} | {exp.location} | {formatDate(exp.startDate)} - {exp.current ? 'Présent' : formatDate(exp.endDate)}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {exp.description}
                      </Typography>
                    </Box>
                  ))}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Formation
                  </Typography>
                  {userData.education.map((edu) => (
                    <Box key={edu.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" component="div">
                        {edu.degree}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {edu.school} | {edu.location} | {edu.startDate} - {edu.endDate}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {edu.description}
                      </Typography>
                    </Box>
                  ))}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Compétences
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {userData.skills.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" />
                    ))}
                  </Box>
                </Paper>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;