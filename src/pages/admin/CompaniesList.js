import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Edit, Delete, Visibility, Search, FilterList } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Données fictives pour les entreprises
const companiesData = [
  { id: 1, name: 'TechCorp', industry: 'Technologie', location: 'Paris', size: '50-200', status: 'active', registrationDate: '2023-05-01', jobsCount: 5 },
  { id: 2, name: 'WebSolutions', industry: 'Technologie', location: 'Lyon', size: '10-50', status: 'active', registrationDate: '2023-05-02', jobsCount: 3 },
  { id: 3, name: 'DesignStudio', industry: 'Design', location: 'Marseille', size: '1-10', status: 'active', registrationDate: '2023-05-03', jobsCount: 1 },
  { id: 4, name: 'AgenceWeb', industry: 'Marketing', location: 'Bordeaux', size: '10-50', status: 'inactive', registrationDate: '2023-05-04', jobsCount: 0 },
  { id: 5, name: 'DataInsight', industry: 'Data', location: 'Toulouse', size: '50-200', status: 'active', registrationDate: '2023-05-05', jobsCount: 4 },
  { id: 6, name: 'MobileApp', industry: 'Technologie', location: 'Paris', size: '10-50', status: 'active', registrationDate: '2023-05-06', jobsCount: 2 },
  { id: 7, name: 'CloudServices', industry: 'Technologie', location: 'Nice', size: '50-200', status: 'active', registrationDate: '2023-05-07', jobsCount: 3 },
  { id: 8, name: 'MarketingPro', industry: 'Marketing', location: 'Paris', size: '10-50', status: 'active', registrationDate: '2023-05-08', jobsCount: 1 },
  { id: 9, name: 'AILabs', industry: 'Technologie', location: 'Lyon', size: '10-50', status: 'inactive', registrationDate: '2023-05-09', jobsCount: 0 },
  { id: 10, name: 'EcoSolutions', industry: 'Environnement', location: 'Montpellier', size: '1-10', status: 'active', registrationDate: '2023-05-10', jobsCount: 2 }
];

const CompaniesList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [industry, setIndustry] = useState('');
  const [status, setStatus] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtrer les entreprises
  const filteredCompanies = companiesData.filter(company => {
    return (
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (industry === '' || company.industry === industry) &&
      (status === '' || company.status === status)
    );
  });

  // Pagination
  const paginatedCompanies = filteredCompanies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Obtenir les industries uniques pour le filtre
  const industries = [...new Set(companiesData.map(company => company.industry))];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Gestion des entreprises
      </Typography>
      
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Rechercher"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="industry-label">Secteur</InputLabel>
            <Select
              labelId="industry-label"
              id="industry"
              value={industry}
              label="Secteur"
              onChange={(e) => setIndustry(e.target.value)}
            >
              <MenuItem value="">Tous</MenuItem>
              {industries.map((ind) => (
                <MenuItem key={ind} value={ind}>{ind}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-label">Statut</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={status}
              label="Statut"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="active">Actif</MenuItem>
              <MenuItem value="inactive">Inactif</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => {
              setSearchTerm('');
              setIndustry('');
              setStatus('');
            }}
          >
            Réinitialiser
          </Button>
        </Box>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table des entreprises">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Secteur</TableCell>
              <TableCell>Localisation</TableCell>
              <TableCell>Taille</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Offres</TableCell>
              <TableCell>Date d'inscription</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.size}</TableCell>
                <TableCell>
                  <Chip 
                    label={company.status === 'active' ? 'Actif' : 'Inactif'} 
                    color={company.status === 'active' ? 'success' : 'error'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{company.jobsCount}</TableCell>
                <TableCell>{formatDate(company.registrationDate)}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    component={Link} 
                    to={`/admin/companies/${company.id}`}
                    color="primary"
                    size="small"
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton 
                    component={Link} 
                    to={`/admin/companies/${company.id}/edit`}
                    color="primary"
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton 
                    color="error"
                    size="small"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCompanies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
        />
      </TableContainer>
    </Container>
  );
};

export default CompaniesList;