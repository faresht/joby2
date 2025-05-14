import React, { useState } from 'react';
import { ShowChart as LineChartIcon } from '@mui/icons-material';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Chip,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Person,
  Business,
  Work,
  Star,
  Warning,
  BarChart,
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Dummy data
const dashboardData = {
  stats: {
    users: 1245,
    companies: 87,
    jobs: 342,
    reviews: 568,
    complaints: 23
  },
  recentUsers: [
    { id: 1, name: 'Thomas Dubois', email: 'thomas.dubois@example.com', date: '2023-05-12', type: 'user' },
    { id: 2, name: 'Julie Lefebvre', email: 'julie.lefebvre@example.com', date: '2023-05-11', type: 'user' },
    { id: 3, name: 'TechCorp', email: 'contact@techcorp.com', date: '2023-05-10', type: 'company' }
  ],
  recentJobs: [
    { id: 1, title: 'Développeur Frontend React', company: 'TechCorp', date: '2023-05-12' },
    { id: 2, title: 'Développeur Backend Node.js', company: 'WebSolutions', date: '2023-05-11' },
    { id: 3, title: 'Designer UX/UI', company: 'DesignStudio', date: '2023-05-10' }
  ],
  recentComplaints: [
    { id: 1, title: "Problème avec une offre d'emploi", status: 'open', date: '2023-05-12' },
    { id: 2, title: "Comportement inapproprié d'un recruteur", status: 'in_progress', date: '2023-05-11' },
    { id: 3, title: "Faux profil d'entreprise", status: 'resolved', date: '2023-05-10' }
  ]
};

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getComplaintStatusInfo = (status) => {
    switch (status) {
      case 'open':
        return { color: 'error', label: 'Ouvert' };
      case 'in_progress':
        return { color: 'warning', label: 'En cours' };
      case 'resolved':
        return { color: 'success', label: 'Résolu' };
      case 'closed':
        return { color: 'default', label: 'Fermé' };
      default:
        return { color: 'default', label: 'Inconnu' };
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Tableau de bord administrateur
      </Typography>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { icon: <Person color="primary" />, label: 'Utilisateurs', value: dashboardData.stats.users, change: '+12%', color: 'success' },
          { icon: <Business color="primary" />, label: 'Entreprises', value: dashboardData.stats.companies, change: '+5%', color: 'success' },
          { icon: <Work color="primary" />, label: "Offres d'emploi", value: dashboardData.stats.jobs, change: '+18%', color: 'success' },
          { icon: <Star color="primary" />, label: 'Avis', value: dashboardData.stats.reviews, change: '+8%', color: 'success' },
          { icon: <Warning color="primary" />, label: 'Réclamations', value: dashboardData.stats.complaints, change: '-3%', color: 'error' }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {stat.icon}
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    {stat.label}
                  </Typography>
                </Box>
                <Typography variant="h4">{stat.value}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  {stat.color === 'success' ? (
                    <TrendingUp color="success" fontSize="small" sx={{ mr: 0.5 }} />
                  ) : (
                    <TrendingDown color="error" fontSize="small" sx={{ mr: 0.5 }} />
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {stat.change} ce mois
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graphiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Évolution des inscriptions
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LineChartIcon sx={{ fontSize: 100, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Graphique d'évolution des inscriptions (à implémenter)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Répartition des utilisateurs
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <PieChartIcon sx={{ fontSize: 100, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Graphique de répartition (à implémenter)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Onglets */}
      <Paper sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs" centered>
          <Tab label="Utilisateurs récents" id="tab-0" />
          <Tab label="Offres récentes" id="tab-1" />
          <Tab label="Réclamations récentes" id="tab-2" />
        </Tabs>

        {/* Utilisateurs récents */}
        {tabValue === 0 && (
          <Box>
            <List>
              {dashboardData.recentUsers.map((user, index) => (
                <React.Fragment key={user.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{user.type === 'company' ? <Business /> : <Person />}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1">{user.name}</Typography>
                          <Chip
                            label={user.type === 'company' ? 'Entreprise' : 'Utilisateur'}
                            size="small"
                            color={user.type === 'company' ? 'primary' : 'secondary'}
                            variant="outlined"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {user.email}
                          </Typography>
                          {' — Inscrit le ' + formatDate(user.date)}
                        </>
                      }
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={user.type === 'company' ? `/admin/companies/${user.id}` : `/admin/users/${user.id}`}
                    >
                      Voir
                    </Button>
                  </ListItem>
                  {index < dashboardData.recentUsers.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Offres récentes */}
        {tabValue === 1 && (
          <Box>
            <List>
              {dashboardData.recentJobs.map((job, index) => (
                <React.Fragment key={job.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar><Work /></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={job.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {job.company}
                          </Typography>
                          {' — Publié le ' + formatDate(job.date)}
                        </>
                      }
                    />
                    <Button variant="outlined" size="small" component={Link} to={`/admin/jobs/${job.id}`}>
                      Voir
                    </Button>
                  </ListItem>
                  {index < dashboardData.recentJobs.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Réclamations récentes */}
        {tabValue === 2 && (
          <Box>
            <List>
              {dashboardData.recentComplaints.map((complaint, index) => {
                const statusInfo = getComplaintStatusInfo(complaint.status);
                return (
                  <React.Fragment key={complaint.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar><Warning /></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1">{complaint.title}</Typography>
                            <Chip label={statusInfo.label} size="small" color={statusInfo.color} sx={{ ml: 1 }} />
                          </Box>
                        }
                        secondary={`Reçue le ${formatDate(complaint.date)}`}
                      />
                      <Button variant="outlined" size="small">
                        Gérer
                      </Button>
                    </ListItem>
                    {index < dashboardData.recentComplaints.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                );
              })}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
