import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Divider, Rating, Grid, Autocomplete } from '@mui/material';
import { Send, Cancel } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

// Données fictives pour les entreprises et utilisateurs
const companiesData = [
  { id: 1, name: 'TunisTech', type: 'Entreprise' },
  { id: 2, name: 'SfaxDigital', type: 'Entreprise' },
  { id: 3, name: 'BizCraft', type: 'Entreprise' },
  { id: 4, name: 'CodeLab', type: 'Entreprise' },
  { id: 5, name: 'CreativeMinds', type: 'Entreprise' }
];

const usersData = [
  { id: 1, name: 'Amine Ben Ali', type: 'Freelance' },
  { id: 2, name: 'Khaled Baccouche', type: 'Développeur Backend' },
  { id: 3, name: 'Hiba Jouini', type: 'Designer UI/UX' },
  { id: 4, name: 'Mehdi Gharbi', type: 'Chef de projet' },
  { id: 5, name: 'Sarra Chouikha', type: 'Consultante en stratégie' }
];
const CreateReview = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get('type');
  const idParam = queryParams.get('id');

  const [formData, setFormData] = useState({
    type: typeParam || 'company', // 'company' ou 'user'
    target: null,
    rating: 0,
    title: '',
    content: '',
    pros: '',
    cons: ''
  });

  useEffect(() => {
    // Si un ID est fourni dans les paramètres d'URL, sélectionner la cible correspondante
    if (idParam) {
      const targetList = formData.type === 'company' ? companiesData : usersData;
      const target = targetList.find(item => item.id === parseInt(idParam));
      if (target) {
        setFormData(prev => ({ ...prev, target }));
      }
    }
  }, [typeParam, idParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTypeChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
      target: null
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue
    });
  };

  const handleTargetChange = (event, newValue) => {
    setFormData({
      ...formData,
      target: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour créer l'avis
    console.log('Avis créé:', formData);
    // Redirection vers la page des avis
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Ajouter un avis
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth required sx={{ mb: 3 }}>
            <InputLabel id="type-label">Type d'avis</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formData.type}
              label="Type d'avis"
              onChange={handleTypeChange}
            >
              <MenuItem value="company">Entreprise</MenuItem>
              <MenuItem value="user">Utilisateur</MenuItem>
            </Select>
          </FormControl>
          
          <Autocomplete
            id="target"
            options={formData.type === 'company' ? companiesData : usersData}
            getOptionLabel={(option) => option.name}
            value={formData.target}
            onChange={handleTargetChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label={formData.type === 'company' ? "Entreprise" : "Utilisateur"}
                required
                sx={{ mb: 3 }}
              />
            )}
          />
          
          <Box sx={{ mb: 3 }}>
            <Typography component="legend">Note globale</Typography>
            <Rating
              name="rating"
              value={formData.rating}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
            />
          </Box>
          
          <TextField
            fullWidth
            label="Titre de l'avis"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            placeholder="Résumez votre expérience en une phrase"
          />
          
          <TextField
            fullWidth
            label="Contenu de l'avis"
            name="content"
            value={formData.content}
            onChange={handleChange}
            multiline
            rows={6}
            required
            sx={{ mb: 3 }}
            placeholder="Décrivez votre expérience en détail"
          />
          
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Points positifs"
                name="pros"
                value={formData.pros}
                onChange={handleChange}
                multiline
                rows={4}
                required
                placeholder="Listez les points positifs (un par ligne)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Points négatifs"
                name="cons"
                value={formData.cons}
                onChange={handleChange}
                multiline
                rows={4}
                required
                placeholder="Listez les points négatifs (un par ligne)"
              />
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              component={Link}
              to="/reviews"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Send />}
              disabled={!formData.target || formData.rating === 0 || !formData.title || !formData.content || !formData.pros || !formData.cons}
            >
              Publier
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateReview;