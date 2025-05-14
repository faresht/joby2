import React, { useState } from 'react';
import {
    Container, Typography, Paper, Box, Button, TextField, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TablePagination, IconButton, MenuItem,
    Select, FormControl, InputLabel, Chip
} from '@mui/material';
import { Edit, Delete, Visibility, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Données fictives des offres
const jobsData = [
    {
        id: 1, title: 'Développeur Frontend React', company: 'TunisTech', location: 'Tunis',
        type: 'CDI', salary: '2,500 TND - 3,500 TND', date: '2023-05-10',
    },
    {
        id: 2, title: 'Développeur Backend Node.js', company: 'SfaxDigital', location: 'Sfax',
        type: 'CDI', salary: '2,800 TND - 3,800 TND', date: '2023-05-08',
    },
    {
        id: 3, title: 'Designer UX/UI', company: 'DesignTunis', location: 'Tunis',
        type: 'Freelance', salary: '150 TND / jour', date: '2023-05-05',
    },
    {
        id: 4, title: 'Chef de Projet Digital', company: 'AgenceWeb', location: 'Bizerte',
        type: 'CDD', salary: '2,200 TND - 2,700 TND', date: '2023-05-03',
    },
    {
        id: 5, title: 'Data Scientist', company: 'DataInsight', location: 'Tunis',
        type: 'CDI', salary: '3,000 TND - 4,000 TND', date: '2023-05-01',
    },
];

const JobsList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filtrage
    const filteredJobs = jobsData.filter((job) =>
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (location === '' || job.location === location) &&
        (jobType === '' || job.type === jobType)
    );

    const paginatedJobs = filteredJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
                Gestion des offres d'emploi
            </Typography>

            {/* Filtres */}
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
                        <InputLabel id="location-label">Lieu</InputLabel>
                        <Select
                            labelId="location-label"
                            value={location}
                            label="Lieu"
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <MenuItem value="">Tous</MenuItem>
                            <MenuItem value="Tunis">Tunis</MenuItem>
                            <MenuItem value="Sfax">Sfax</MenuItem>
                            <MenuItem value="Bizerte">Bizerte</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            value={jobType}
                            label="Type"
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <MenuItem value="">Tous</MenuItem>
                            <MenuItem value="CDI">CDI</MenuItem>
                            <MenuItem value="CDD">CDD</MenuItem>
                            <MenuItem value="Freelance">Freelance</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>

            {/* Tableau */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Titre</TableCell>
                            <TableCell>Entreprise</TableCell>
                            <TableCell>Lieu</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Salaire</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedJobs.length > 0 ? (
                            paginatedJobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell>{job.title}</TableCell>
                                    <TableCell>{job.company}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>
                                        <Chip label={job.type} color="primary" variant="outlined" size="small" />
                                    </TableCell>
                                    <TableCell>{job.salary}</TableCell>
                                    <TableCell>{formatDate(job.date)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton component={Link} to={`/jobs/${job.id}`} color="primary">
                                            <Visibility />
                                        </IconButton>
                                        <IconButton color="warning">
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    Aucune offre trouvée.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredJobs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Container>
    );
};

export default JobsList;
