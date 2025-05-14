import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, TextField, MenuItem, Box, Chip, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { Work, LocationOn, AccessTime } from '@mui/icons-material';

// Données fictives pour les offres d'emploi
const jobsData = [
  {
    id: 1,
    title: 'Développeur Frontend React',
    company: 'TechCorp',
    location: 'Paris',
    type: 'CDI',
    salary: '45K - 55K €',
    date: '2023-05-10',
    description: 'Nous recherchons un développeur frontend expérimenté pour rejoindre notre équipe...'
  },
  {
    id: 2,
    title: 'Développeur Backend Node.js',
    company: 'WebSolutions',
    location: 'Lyon',
    type: 'CDI',
    salary: '50K - 60K €',
    date: '2023-05-08',
    description: 'Rejoignez notre équipe pour développer des API performantes...'
  },
  {
    id: 3,
    title: 'Designer UX/UI',
    company: 'DesignStudio',
    location: 'Marseille',
    type: 'Freelance',
    salary: '400 € / jour',
    date: '2023-05-05',
    description: 'Nous cherchons un designer talentueux pour nos projets clients...'
  },
  {
    id: 4,
    title: 'Chef de Projet Digital',
    company: 'AgenceWeb',
    location: 'Bordeaux',
    type: 'CDD',
    salary: '40K - 45K €',
    date: '2023-05-03',
    description: 'Gérez nos projets web de A à Z...'
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'DataInsight',
    location: 'Toulouse',
    type: 'CDI',
    salary: '55K - 65K €',
    date: '2023-05-01',
    description: 'Analysez nos données pour en extraire des insights précieux...'
  },
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [page, setPage] = useState(1);
  const jobsPerPage = 4;

  // Filtrer les offres d'emploi
  const filteredJobs = jobsData.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (location === '' || job.location === location) &&
      (jobType === '' || job.type === jobType)
    );
  });

  // Pagination
  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Offres d'emploi
      </Typography>

      {/* Filtres */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Rechercher un emploi"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Lieu"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <MenuItem value="">Tous les lieux</MenuItem>
                <MenuItem value="Paris">Paris</MenuItem>
                <MenuItem value="Lyon">Lyon</MenuItem>
                <MenuItem value="Marseille">Marseille</MenuItem>
                <MenuItem value="Bordeaux">Bordeaux</MenuItem>
                <MenuItem value="Toulouse">Toulouse</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Type de contrat"
                variant="outlined"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <MenuItem value="">Tous les types</MenuItem>
                <MenuItem value="CDI">CDI</MenuItem>
                <MenuItem value="CDD">CDD</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
                <MenuItem value="Stage">Stage</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ height: '100%' }}
                onClick={() => {
                  setSearchTerm('');
                  setLocation('');
                  setJobType('');
                }}
              >
                Réinitialiser
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Liste des offres */}
      <Grid container spacing={3}>
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" component="h2">
                        {job.title}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {job.company}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                        <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">{job.location}</Typography>
                        <AccessTime fontSize="small" sx={{ ml: 2, mr: 0.5 }} />
                        <Typography variant="body2">Publié le {formatDate(job.date)}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {job.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Chip 
                          icon={<Work />} 
                          label={job.type} 
                          color="primary" 
                          variant="outlined" 
                          sx={{ mb: 1 }} 
                        />
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                          Salaire: {job.salary}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button 
                          variant="contained" 
                          component={Link} 
                          to={`/jobs/${job.id}`}
                        >
                          Voir l'offre
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" sx={{ my: 4 }}>
              Aucune offre ne correspond à votre recherche.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={handleChangePage} 
            color="primary" 
          />
        </Box>
      )}
    </Container>
  );
};

export default Jobs;