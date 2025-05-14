import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, Tabs, Tab, Chip, Card, CardContent, Divider, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Données fictives pour les réclamations de l'utilisateur
const userComplaintsData = [
  {
    id: 1,
    title: "Problème avec une offre d'emploi",
    category: "Offre d'emploi",
    date: "2023-05-15",
    status: "pending",
    response: null
  },
  {
    id: 2,
    title: "Comportement inapproprié d'un recruteur",
    category: "Recruteur",
    date: "2023-05-10",
    status: "in_progress",
    response: "Nous examinons actuellement votre réclamation et avons contacté le recruteur concerné."
  },
  {
    id: 3,
    title: "Problème technique lors de la candidature",
    category: "Technique",
    date: "2023-05-05",
    status: "resolved",
    response: "Le problème technique a été résolu. Vous pouvez désormais postuler à l'offre sans difficulté."
  }
];

const Complaints = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filtrer les réclamations
  const filteredComplaints = userComplaintsData.filter(complaint => {
    return (
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || complaint.status === statusFilter)
    );
  });

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Obtenir le statut formaté
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'En attente', color: 'warning' };
      case 'in_progress':
        return { label: 'En cours', color: 'info' };
      case 'resolved':
        return { label: 'Résolu', color: 'success' };
      case 'rejected':
        return { label: 'Rejeté', color: 'error' };
      default:
        return { label: 'Inconnu', color: 'default' };
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1">
          Mes Réclamations
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          component={Link}
          to="/create-complaint"
        >
          Nouvelle réclamation
        </Button>
      </Box>
      
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Toutes" />
          <Tab label="En attente" />
          <Tab label="En cours" />
          <Tab label="Résolues" />
        </Tabs>
      </Paper>
      
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Rechercher"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />
            }}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="status-filter-label">Statut</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Statut"
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="pending">En attente</MenuItem>
              <MenuItem value="in_progress">En cours</MenuItem>
              <MenuItem value="resolved">Résolu</MenuItem>
              <MenuItem value="rejected">Rejeté</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
      
      {filteredComplaints.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Aucune réclamation trouvée
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Vous n'avez pas encore soumis de réclamation ou aucune réclamation ne correspond à vos critères de recherche.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            component={Link}
            to="/create-complaint"
            sx={{ mt: 3 }}
          >
            Soumettre une réclamation
          </Button>
        </Paper>
      ) : (
        filteredComplaints.map((complaint) => {
          const statusInfo = getStatusInfo(complaint.status);
          
          return (
            <Card key={complaint.id} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2">
                    {complaint.title}
                  </Typography>
                  <Chip
                    label={statusInfo.label}
                    color={statusInfo.color}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Catégorie: {complaint.category} • Soumise le {formatDate(complaint.date)}
                </Typography>
                
                {complaint.response && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Réponse de l'administration:
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {complaint.response}
                    </Typography>
                  </>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/complaints/${complaint.id}`}
                  >
                    Voir les détails
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default Complaints;
