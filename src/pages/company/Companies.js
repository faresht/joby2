import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, TextField, MenuItem, Box, Rating, Pagination, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Business, LocationOn, People } from '@mui/icons-material';

// Données fictives pour les entreprises tunisiennes
const companiesData = [
  {
    id: 1,
    name: 'TunisTech',
    logo: '/placeholder.svg',
    industry: 'Technologie',
    location: 'Tunis',
    size: '50-200 employés',
    description: 'TunisTech développe des solutions digitales pour les entreprises locales et internationales.',
    rating: 4.5,
    reviewsCount: 32,
    jobsCount: 6
  },
  {
    id: 2,
    name: 'SfaxDigital',
    logo: '/placeholder.svg',
    industry: 'Technologie',
    location: 'Sfax',
    size: '10-50 employés',
    description: 'SfaxDigital propose des services web, mobile et cloud pour les startups tunisiennes.',
    rating: 4.2,
    reviewsCount: 21,
    jobsCount: 4
  },
  {
    id: 3,
    name: 'StudioDesign',
    logo: '/placeholder.svg',
    industry: 'Design',
    location: 'Sousse',
    size: '1-10 employés',
    description: 'StudioDesign est spécialisé dans la création graphique, UX/UI et branding.',
    rating: 4.8,
    reviewsCount: 11,
    jobsCount: 2
  },
  {
    id: 4,
    name: 'MarketNow',
    logo: '/placeholder.svg',
    industry: 'Marketing',
    location: 'Nabeul',
    size: '10-50 employés',
    description: 'MarketNow aide les PME tunisiennes à booster leur présence digitale avec des campagnes ciblées.',
    rating: 4.0,
    reviewsCount: 18,
    jobsCount: 3
  },
  {
    id: 5,
    name: 'DataPlus',
    logo: '/placeholder.svg',
    industry: 'Data',
    location: 'Monastir',
    size: '50-200 employés',
    description: 'DataPlus est une entreprise innovante en data science et intelligence artificielle basée à Monastir.',
    rating: 4.6,
    reviewsCount: 27,
    jobsCount: 5
  },
];


const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [page, setPage] = useState(1);
  const companiesPerPage = 3;

  // Filtrer les entreprises
  const filteredCompanies = companiesData.filter(company => {
    return (
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (industry === '' || company.industry === industry) &&
      (location === '' || company.location === location)
    );
  });

  // Pagination
  const indexOfLastCompany = page * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const pageCount = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Entreprises
      </Typography>

      {/* Filtres */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Rechercher une entreprise"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Secteur"
                variant="outlined"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <MenuItem value="">Tous les secteurs</MenuItem>
                <MenuItem value="Technologie">Technologie</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Data">Data</MenuItem>
              </TextField>
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
            <Grid item xs={12} md={2}>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ height: '100%' }}
                onClick={() => {
                  setSearchTerm('');
                  setIndustry('');
                  setLocation('');
                }}
              >
                Réinitialiser
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Liste des entreprises */}
      <Grid container spacing={3}>
        {currentCompanies.length > 0 ? (
          currentCompanies.map((company) => (
            <Grid item xs={12} key={company.id}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Avatar
                        sx={{ width: 80, height: 80 }}
                        alt={company.name}
                        src={company.logo}
                        variant="rounded"
                      >
                        <Business fontSize="large" />
                      </Avatar>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Typography variant="h6" component="h2">
                        {company.name}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {company.industry}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                        <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" sx={{ mr: 2 }}>{company.location}</Typography>
                        <People fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">{company.size}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {company.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={company.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            ({company.rating})
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {company.reviewsCount} avis
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {company.jobsCount} offres d'emploi
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button 
                          variant="contained" 
                          component={Link} 
                          to={`/companies/${company.id}`}
                        >
                          Voir le profil
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
              Aucune entreprise ne correspond à votre recherche.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Pagination */}
      {filteredCompanies.length > 0 && (
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

export default Companies;