import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, Grid, Divider, Chip, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { Save, Cancel, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    skills: [],
    isRemote: false
  });
  
  const [newSkill, setNewSkill] = useState('');

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'isRemote' ? checked : value
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
    // Logique pour créer l'offre d'emploi
    console.log('Offre créée:', formData);
    // Redirection vers la page de l'offre
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Publier une offre d'emploi
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Titre du poste"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Lieu"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="job-type-label">Type de contrat</InputLabel>
                <Select
                  labelId="job-type-label"
                  id="job-type"
                  name="type"
                  value={formData.type}
                  label="Type de contrat"
                  onChange={handleChange}
                >
                  <MenuItem value="CDI">CDI</MenuItem>
                  <MenuItem value="CDD">CDD</MenuItem>
                  <MenuItem value="Freelance">Freelance</MenuItem>
                  <MenuItem value="Stage">Stage</MenuItem>
                  <MenuItem value="Alternance">Alternance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salaire (ex: 45K - 55K €)"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isRemote}
                    onChange={handleChange}
                    name="isRemote"
                  />
                }
                label="Télétravail possible"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description du poste"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Responsabilités (une par ligne)"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="- Développer des interfaces utilisateur réactives
- Collaborer avec les designers UX/UI
- Assurer la compatibilité cross-browser"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Prérequis (un par ligne)"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="- Expérience significative en développement frontend
- Maîtrise de JavaScript, HTML5 et CSS3
- Connaissance des bonnes pratiques de développement web"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Avantages (un par ligne)"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="- Salaire compétitif
- Télétravail partiel
- Tickets restaurant"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Compétences requises
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
                  <Add />
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  component={Link}
                  to="/company-dashboard"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                >
                  Publier l'offre
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateJob;