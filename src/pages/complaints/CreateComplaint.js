import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Divider, Autocomplete } from '@mui/material';
import { Send, Cancel } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Données fictives pour les entreprises et utilisateurs
const companiesData = [
  { id: 1, name: 'TunisTech', type: 'company' },
  { id: 2, name: 'SfaxDigital', type: 'company' },
  { id: 3, name: 'MedinaDesign', type: 'company' },
  { id: 4, name: 'BizDev', type: 'company' },
  { id: 5, name: 'DataTunisie', type: 'company' }
];

const usersData = [
  { id: 1, name: 'Ahmed Ben Ali', type: 'user' },
  { id: 2, name: 'Samar Gharbi', type: 'user' },
  { id: 3, name: 'Mohamed Mbarek', type: 'user' },
  { id: 4, name: 'Rania Slim', type: 'user' },
  { id: 5, name: 'Youssef Jaziri', type: 'user' }
];

const systemData = [
  { id: 1, name: 'Système de candidature', type: 'system' },
  { id: 2, name: 'Messagerie', type: 'system' },
  { id: 3, name: 'Forum', type: 'system' },
  { id: 4, name: 'Système d\'avis', type: 'system' }
];

const CreateComplaint = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    targetType: 'company', // 'company', 'user' ou 'system'
    target: null,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTargetTypeChange = (e) => {
    setFormData({
      ...formData,
      targetType: e.target.value,
      target: null
    });
  };

  const handleTargetChange = (event, newValue) => {
    setFormData({
      ...formData,
      target: newValue
    });
  };

  const getTargetOptions = () => {
    switch (formData.targetType) {
      case 'company':
        return companiesData;
      case 'user':
        return usersData;
      case 'system':
        return systemData;
      default:
        return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour créer la réclamation
    console.log('Réclamation créée:', formData);
    // Redirection vers la page des réclamations
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Nouvelle réclamation
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Titre de la réclamation"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            placeholder="Résumez votre réclamation en une phrase claire"
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
              <MenuItem value="Offre d'emploi">Offre d'emploi</MenuItem>
              <MenuItem value="Recruteur">Recruteur</MenuItem>
              <MenuItem value="Profil">Profil</MenuItem>
              <MenuItem value="Technique">Technique</MenuItem>
              <MenuItem value="Avis">Avis</MenuItem>
              <MenuItem value="Forum">Forum</MenuItem>
              <MenuItem value="Autre">Autre</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth required sx={{ mb: 3 }}>
            <InputLabel id="target-type-label">Type de cible</InputLabel>
            <Select
              labelId="target-type-label"
              id="targetType"
              name="targetType"
              value={formData.targetType}
              label="Type de cible"
              onChange={handleTargetTypeChange}
            >
              <MenuItem value="company">Entreprise</MenuItem>
              <MenuItem value="user">Utilisateur</MenuItem>
              <MenuItem value="system">Système</MenuItem>
            </Select>
          </FormControl>
          
          <Autocomplete
            id="target"
            options={getTargetOptions()}
            getOptionLabel={(option) => option.name}
            value={formData.target}
            onChange={handleTargetChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cible de la réclamation"
                required
                sx={{ mb: 3 }}
              />
            )}
          />
          
          <TextField
            fullWidth
            label="Description détaillée"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={8}
            required
            sx={{ mb: 3 }}
            placeholder="Décrivez votre réclamation en détail. Incluez toutes les informations pertinentes qui pourraient nous aider à traiter votre demande."
          />
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              component={Link}
              to="/complaints"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Send />}
              disabled={!formData.title || !formData.category || !formData.target || !formData.description}
            >
              Soumettre
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateComplaint;