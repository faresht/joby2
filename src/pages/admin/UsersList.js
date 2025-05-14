import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Edit, Delete, Visibility, Search, FilterList } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Données fictives pour les utilisateurs
// Données fictives pour les utilisateurs avec des noms arabes
const usersData = [
  { id: 1, name: 'Ahmed Ben Ali', email: 'ahmed.benali@example.com', type: 'user', status: 'active', registrationDate: '2023-05-01' },
  { id: 2, name: 'Fatima Zahra', email: 'fatima.zahra@example.com', type: 'user', status: 'active', registrationDate: '2023-05-02' },
  { id: 3, name: 'Youssef El Amrani', email: 'youssef.elamrani@example.com', type: 'user', status: 'inactive', registrationDate: '2023-05-03' },
  { id: 4, name: 'Khadija Lahlou', email: 'khadija.lahlou@example.com', type: 'user', status: 'active', registrationDate: '2023-05-04' },
  { id: 5, name: 'Omar Naciri', email: 'omar.naciri@example.com', type: 'user', status: 'active', registrationDate: '2023-05-05' },
  { id: 6, name: 'InformatiquePro', email: 'contact@informatiquepro.com', type: 'company', status: 'active', registrationDate: '2023-05-06' },
  { id: 7, name: 'WebMaroc', email: 'contact@webmaroc.com', type: 'company', status: 'active', registrationDate: '2023-05-07' },
  { id: 8, name: 'DesignMaghreb', email: 'contact@designmaghreb.com', type: 'company', status: 'active', registrationDate: '2023-05-08' },
  { id: 9, name: 'AgenceDigitale', email: 'contact@agencedigitale.com', type: 'company', status: 'inactive', registrationDate: '2023-05-09' },
  { id: 10, name: 'DataAnalyse', email: 'contact@dataanalyse.com', type: 'company', status: 'active', registrationDate: '2023-05-10' }
];
const UsersList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState('');
  const [status, setStatus] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtrer les utilisateurs
  const filteredUsers = usersData.filter(user => {
    return (
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (userType === '' || user.type === userType) &&
      (status === '' || user.status === status)
    );
  });

  // Pagination
  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Gestion des utilisateurs
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
            <InputLabel id="user-type-label">Type</InputLabel>
            <Select
              labelId="user-type-label"
              id="user-type"
              value={userType}
              label="Type"
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="user">Particulier</MenuItem>
              <MenuItem value="company">Entreprise</MenuItem>
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
              setUserType('');
              setStatus('');
            }}
          >
            Réinitialiser
          </Button>
        </Box>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table des utilisateurs">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Date d'inscription</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.type === 'user' ? 'Particulier' : 'Entreprise'} 
                    color={user.type === 'user' ? 'primary' : 'secondary'} 
                    variant="outlined" 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.status === 'active' ? 'Actif' : 'Inactif'} 
                    color={user.status === 'active' ? 'success' : 'error'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{formatDate(user.registrationDate)}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    component={Link} 
                    to={`/admin/users/${user.id}`}
                    color="primary"
                    size="small"
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton 
                    component={Link} 
                    to={`/admin/users/${user.id}/edit`}
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
          count={filteredUsers.length}
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

export default UsersList;