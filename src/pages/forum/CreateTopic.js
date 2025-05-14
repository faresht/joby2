import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { Send, Cancel } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CreateTopic = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour créer le sujet
    console.log('Sujet créé:', formData);
    // Redirection vers la page du forum
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Créer un nouveau sujet
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Titre du sujet"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          
          <FormControl fullWidth required sx={{ mb: 3 }}>
            <InputLabel id="category-label">Catégorie</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formData.category}
              label="Catégorie"
              onChange={handleChange}
            >
              <MenuItem value="CV et Candidatures">CV et Candidatures</MenuItem>
              <MenuItem value="Entreprises">Entreprises</MenuItem>
              <MenuItem value="Carrière">Carrière</MenuItem>
              <MenuItem value="Entretiens">Entretiens</MenuItem>
              <MenuItem value="Compétences">Compétences</MenuItem>
              <MenuItem value="Divers">Divers</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Contenu"
            name="content"
            value={formData.content}
            onChange={handleChange}
            multiline
            rows={10}
            required
            sx={{ mb: 3 }}
            placeholder="Décrivez votre sujet en détail. Soyez clair et précis pour obtenir les meilleures réponses."
          />
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              component={Link}
              to="/forum"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Send />}
              disabled={!formData.title || !formData.category || !formData.content}
            >
              Publier
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateTopic;