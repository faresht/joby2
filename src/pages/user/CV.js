import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, Grid, Divider, IconButton } from '@mui/material';
import { Add, Delete, Save, Print, Download } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CV = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: 'Développeur Full Stack',
      company: 'TechCorp',
      location: 'Paris',
      startDate: '2021-01',
      endDate: '',
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
  ]);

  const [education, setEducation] = useState([
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
  ]);

  const addExperience = () => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map(exp => exp.id)) + 1 : 1;
    setExperiences([...experiences, {
      id: newId,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newId = education.length > 0 ? Math.max(...education.map(edu => edu.id)) + 1 : 1;
    setEducation([...education, {
      id: newId,
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const removeEducation = (id) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const handleExperienceChange = (id, field, value) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleEducationChange = (id, field, value) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour sauvegarder le CV
    console.log('CV mis à jour:', { experiences, education });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Mon CV
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 2 }}>
        <Button variant="outlined" startIcon={<Print />}>
          Imprimer
        </Button>
        <Button variant="outlined" startIcon={<Download />}>
          Télécharger PDF
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Expérience professionnelle
          </Typography>
          
          {experiences.map((exp) => (
            <Box key={exp.id} sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Poste"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Entreprise"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Lieu"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Date de début"
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Date de fin"
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    disabled={exp.current}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <IconButton color="error" onClick={() => removeExperience(exp.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button startIcon={<Add />} onClick={addExperience}>
              Ajouter une expérience
            </Button>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" gutterBottom>
            Formation
          </Typography>
          
          {education.map((edu) => (
            <Box key={edu.id} sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Diplôme"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Établissement"
                    value={edu.school}
                    onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Lieu"
                    value={edu.location}
                    onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Année de début"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Année de fin"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={edu.description}
                    onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <IconButton color="error" onClick={() => removeEducation(edu.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button startIcon={<Add />} onClick={addEducation}>
              Ajouter une formation
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="outlined"
              component={Link}
              to="/profile"
              sx={{ mr: 2 }}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CV;