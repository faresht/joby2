import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, Grid, Divider, Chip } from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'Thomas',
    lastName: 'Dubois',
    title: 'Développeur Full Stack',
    location: 'Paris, France',
    email: 'thomas.dubois@example.com',
    phone: '+33 6 12 34 56 78',
    about: 'Développeur passionné avec plus de 5 ans d\'expérience dans le développement web. Spécialisé en React, Node.js et bases de données SQL/NoSQL.',
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Express', 'HTML/CSS', 'Git'],
    linkedin: 'https://linkedin.com/in/thomasdubois',
    github: 'https://github.com/thomasdubois',
    portfolio: 'https://thomasdubois.com'
  });

  const [newSkill, setNewSkill] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour sauvegarder les modifications
    console.log('Profil mis à jour:', formData);
    // Redirection vers la page de profil
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Modifier mon profil
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Titre professionnel"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Localisation"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Téléphone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="À propos de moi"
                name="about"
                value={formData.about}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Compétences
              </Typography>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Ajouter une compétence"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button variant="contained" onClick={handleAddSkill}>
                  Ajouter
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Liens professionnels
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="GitHub"
                name="github"
                value={formData.github}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  component={Link}
                  to="/profile"
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
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile;