import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Button, Avatar, Divider, Chip, List, ListItem, ListItemText, ListItemIcon, Tab, Tabs } from '@mui/material';
import { Edit, Work, School, LocationOn, Email, Phone, LinkedIn, GitHub, Language, Description } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Données fictives pour le profil utilisateur
const userData = {
  id: 1,
  firstName: 'Thomas',
  lastName: 'Dubois',
  title: 'Développeur Full Stack',
  location: 'Paris, France',
  email: 'thomas.dubois@example.com',
  phone: '+33 6 12 34 56 78',
  about: 'Développeur passionné avec plus de 5 ans d\'expérience dans le développement web. Spécialisé en React, Node.js et bases de données SQL/NoSQL.',
  skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Express', 'HTML/CSS', 'Git'],
  experience: [
    {
      id: 1,
      title: 'Développeur Full Stack',
      company: 'TechCorp',
      location: 'Paris',
      startDate: '2021-01',
      endDate: null,
      current: true,
      description: 'Développement d\'applications web avec React et Node.js. Mise en place d\'une architecture microservices.'
    },
    {
      id: 2,
      title: 'Développeur Frontend',
      company: 'WebAgency',
      location: 'Lyon',
      startDate: '2019-03',
      endDate: '2020-12',
      current: false,
      description: 'Création d\'interfaces utilisateur réactives avec React et Redux.'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'Master en Informatique',
      school: 'Université de Paris',
      location: 'Paris',
      startDate: '2017',
      endDate: '2019',
      description: 'Spécialisation en développement web et applications mobiles.'
    },
    {
      id: 2,
      degree: 'Licence en Informatique',
      school: 'Université de Lyon',
      location: 'Lyon',
      startDate: '2014',
      endDate: '2017',
      description: 'Formation générale en informatique.'
    }
  ],
  languages: [
    { language: 'Français', level: 'Natif' },
    { language: 'Anglais', level: 'Courant' },
    { language: 'Espagnol', level: 'Intermédiaire' }
  ],
  socialLinks: {
    linkedin: 'https://linkedin.com/in/thomasdubois',
    github: 'https://github.com/thomasdubois',
    portfolio: 'https://thomasdubois.com'
  }
};

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