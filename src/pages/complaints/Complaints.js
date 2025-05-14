import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, TextField, Box, Chip, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Pagination, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add, Warning, CheckCircle, HourglassEmpty, Cancel } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
// Données fictives pour les réclamations
const complaintsData = [
  {
    id: 1,
    title: 'Problème avec une offre d\'emploi',
    description: 'J\'ai postulé à une offre d\'emploi qui semble être une arnaque. L\'entreprise demande des frais de dossier.',
    category: 'Offre d\'emploi',
    status: 'open', // 'open', 'in_progress', 'resolved', 'closed'
    date: '2023-05-10',
    author: {
      id: 1,
      name: 'Thomas Dubois',
      avatar: '/placeholder-user.jpg'
    },
    target: {
      type: 'company',
      id: 5,
      name: 'RecrutExpress'
    },
    responses: [
      {
        id: 1,
        author: {
          id: 10,
          name: 'Support Joby',
          avatar: '/placeholder-user.jpg',
          isAdmin: true
        },
        content: 'Nous avons bien reçu votre réclamation et nous allons examiner cette offre d\'emploi. Merci de nous avoir signalé ce problème.',
        date: '2023-05-11'
      }
    ]
  },
  {
    id: 2,
    title: 'Comportement inapproprié d\'un recruteur',
    description: 'Lors d\'un entretien, le recruteur a posé des questions discriminatoires sur ma situation familiale.',
    category: 'Recruteur',
    status: 'in_progress',
    date: '2023-05-08',
    author: {
      id: 2,
      name: 'Julie Lefebvre',
      avatar: '/placeholder-user.jpg'
    },
    target: {
      type: 'user',
      id: 6,
      name: 'Pierre Martin'
    },
    responses: [
      {
        id: 2,
        author: {
          id: 10,
          name: 'Support Joby',
          avatar: '/placeholder-user.jpg',
          isAdmin: true
        },
        content: 'Nous prenons très au sérieux ce type de comportement. Nous avons contacté le recruteur pour obtenir sa version des faits.',
        date: '2023-05-09'
      },
      {
        id: 3,
        author: {
          id: 2,
          name: 'Julie Lefebvre',
          avatar: '/placeholder-user.jpg'
        },
        content: 'Merci pour votre réactivité. J\'attends votre retour.',
        date: '2023-05-09'
      }
    ]
  },
  {
    id: 3,
    title: 'Faux profil d\'entreprise',
    description: 'J\'ai découvert un profil d\'entreprise qui semble être faux. Les informations ne correspondent pas à la réalité.',
    category: 'Profil',
    status: 'resolved',
    date: '2023-05-05',
    author: {
      id: 3,
      name: 'Sophie Martin',
      avatar: '/placeholder-user.jpg'
    },
    target: {
      type: 'company',
      id: 7,
      name: 'TechFuture'
    },
    responses: [
      {
        id: 4,
        author: {
          id: 10,
          name: 'Support Joby',
          avatar: '/placeholder-user.jpg',
          isAdmin: true
        },
        content: 'Après vérification, nous avons confirmé que ce profil est effectivement frauduleux. Nous l\'avons supprimé de notre plateforme. Merci pour votre vigilance.',
        date: '2023-05-07'
      }
    ]
  },
  {
    id: 4,
    title: 'Problème technique avec le formulaire de candidature',
    description: 'Je n\'arrive pas à joindre mon CV lors de ma candidature. Le système affiche une erreur.',
    category: 'Technique',
    status: 'closed',
    date: '2023-05-03',
    author: {
      id: 4,
      name: 'Marc Dupont',
      avatar: '/placeholder-user.jpg'
    },
    target: {
      type: 'system',
      id: null,
      name: 'Système de candidature'
    },
    responses: [
      {
        id: 5,
        author: {
          id: 10,
          name: 'Support Joby',
          avatar: '/placeholder-user.jpg',
          isAdmin: true
        },
        content: 'Nous avons identifié un problème technique avec notre système de téléchargement de fichiers. Il a été résolu. Pouvez-vous réessayer et nous confirmer que tout fonctionne correctement ?',
        date: '2023-05-04'
      },
      {
        id: 6,
        author: {
          id: 4,
          name: 'Marc Dupont',
          avatar: '/placeholder-user.jpg'
        },
        content: 'J\'ai réessayé et ça fonctionne maintenant. Merci !',
        date: '2023-05-04'
      },
      {
        id: 7,
        author: {
          id: 10,
          name: 'Support Joby',
          avatar: '/placeholder-user.jpg',
          isAdmin: true
        },
        content: 'Parfait ! Nous clôturons cette réclamation. N\'hésitez pas à nous contacter si vous rencontrez d\'autres problèmes.',
        date: '2023-05-04'
      }
    ]
  }
];

const Complaints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const complaintsPerPage = 3;

  // Filtrer les réclamations
  const filteredComplaints = complaintsData.filter(complaint => {
    return (
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (status === '' || complaint.status === status) &&
      (category === '' || complaint.category === category)
    );
  });

  // Pagination
  const indexOfLastComplaint = page * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const pageCount = Math.ceil(filteredComplaints.length / complaintsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Obtenir l'icône et la couleur en fonction du statut
  const getStatusInfo = (status) => {
    switch (status) {
      case 'open':
        return { icon: <Warning />, color: 'error', label: 'Ouvert' };
      case 'in_progress':
        return { icon: <HourglassEmpty />, color: 'warning', label: 'En cours' };
      case 'resolved':
        return { icon: <CheckCircle />, color: 'success', label: 'Résolu' };
      case 'closed':
        return { icon: <Cancel />, color: 'default', label: 'Fermé' };
      default:
        return { icon: <Warning />, color: 'default', label: 'Inconnu' };
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1">
          Réclamations
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

      {/* Filtres */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Rechercher une réclamation"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Statut"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="">Tous les statuts</MenuItem>
                <MenuItem value="open">Ouvert</MenuItem>
                <MenuItem value="in_progress">En cours</MenuItem>
                <MenuItem value="resolved">Résolu</MenuItem>
                <MenuItem value="closed">Fermé</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Catégorie"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">Toutes les catégories</MenuItem>
                <MenuItem value="Offre d'emploi">Offre d'emploi</MenuItem>
                <MenuItem value="Recruteur">Recruteur</MenuItem>
                <MenuItem value="Profil">Profil</MenuItem>
                <MenuItem value="Technique">Technique</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Liste des réclamations */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {currentComplaints.length > 0 ? (
          currentComplaints.map((complaint) => {
            const statusInfo = getStatusInfo(complaint.status);
            
            return (
              <Card key={complaint.id} sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <Avatar sx={{ width: 22, height: 22, bgcolor: `${statusInfo.color}.main` }}>
                            {statusInfo.icon}
                          </Avatar>
                        }
                      >
                        <Avatar alt={complaint.author.name} src={complaint.author.avatar} />
                      </Badge>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6">
                          {complaint.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Par {complaint.author.name} - {formatDate(complaint.date)}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={statusInfo.label} 
                      color={statusInfo.color} 
                      size="small" 
                      icon={statusInfo.icon} 
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" paragraph>
                      {complaint.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip label={complaint.category} size="small" color="primary" variant="outlined" />
                      <Chip 
                        label={`Concernant: ${complaint.target.name}`} 
                        size="small" 
                        variant="outlined" 
                      />
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      {complaint.responses.length} réponse(s)
                    </Typography>
                    {complaint.responses.slice(0, 1).map((response) => (
                      <Box key={response.id} sx={{ display: 'flex', mt: 2 }}>
                        <Avatar 
                          alt={response.author.name} 
                          src={response.author.avatar} 
                          sx={{ width: 32, height: 32, mr: 2 }}
                        />
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle2">
                              {response.author.name}
                            </Typography>
                            {response.author.isAdmin && (
                              <Chip 
                                label="Admin" 
                                size="small" 
                                color="primary" 
                                sx={{ ml: 1, height: 20 }} 
                              />
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(response.date)}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {response.content}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                    {complaint.responses.length > 1 && (
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button 
                          variant="text" 
                          component={Link} 
                          to={`/complaints/${complaint.id}`}
                        >
                          Voir toutes les réponses ({complaint.responses.length})
                        </Button>
                      </Box>
                    )}
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                      variant="contained" 
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
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6" align="center" sx={{ my: 4 }}>
                Aucune réclamation ne correspond à votre recherche.
              </Typography>
            </CardContent>
          </Card>
        )}
      </List>

      {/* Pagination */}
      {filteredComplaints.length > 0 && (
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

export default Complaints;