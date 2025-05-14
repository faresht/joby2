import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, TextField, Box, Chip, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { Forum as ForumIcon, Comment, Visibility, AccessTime, Add } from '@mui/icons-material';
import { MenuItem } from '@mui/material';

// Données fictives pour les sujets du forum
const topicsData = [
  {
    id: 1,
    title: 'Comment optimiser son CV pour le secteur tech ?',
    author: {
      id: 1,
      name: 'Ahmed Ben Ali',
      avatar: '/placeholder-user.jpg'
    },
    category: 'CV et Candidatures',
    date: '2023-05-10T14:30:00',
    views: 245,
    replies: 18,
    lastReply: {
      author: {
        id: 3,
        name: 'Sophie Martin',
        avatar: '/placeholder-user.jpg'
      },
      date: '2023-05-12T09:15:00'
    }
  },
  {
    id: 2,
    title: 'Quelles sont les meilleures entreprises tech à Paris ?',
    author: {
      id: 2,
      name: 'Fatma Zahra',
      avatar: '/placeholder-user.jpg'
    },
    category: 'Entreprises',
    date: '2023-05-09T10:45:00',
    views: 189,
    replies: 12,
    lastReply: {
      author: {
        id: 4,
        name: 'Marc Dupont',
        avatar: '/placeholder-user.jpg'
      },
      date: '2023-05-11T16:20:00'
    }
  },
  {
    id: 3,
    title: 'Conseils pour négocier son salaire',
    author: {
      id: 3,
      name: 'Sonia Khlifi',
      avatar: '/placeholder-user.jpg'
    },
    category: 'Carrière',
    date: '2023-05-08T16:30:00',
    views: 312,
    replies: 24,
    lastReply: {
      author: {
        id: 1,
        name: 'Thomas Dubois',
        avatar: '/placeholder-user.jpg'
      },
      date: '2023-05-12T11:05:00'
    }
  },
  {
    id: 4,
    title: 'Retour d\'expérience : entretien chez Google',
    author: {
      id: 4,
      name: 'Mohamed Ali',
      avatar: '/placeholder-user.jpg'
    },
    category: 'Entretiens',
    date: '2023-05-07T09:20:00',
    views: 278,
    replies: 15,
    lastReply: {
      author: {
        id: 2,
        name: 'Mariem Brahmi',
        avatar: '/placeholder-user.jpg'
      },
      date: '2023-05-10T14:45:00'
    }
  },
  {
    id: 5,
    title: 'Les compétences les plus recherchées en 2023',
    author: {
      id: 5,
      name: 'Ahmed Ben Ali',
      avatar: '/placeholder-user.jpg'
    },
    category: 'Compétences',
    date: '2023-05-06T11:10:00',
    views: 423,
    replies: 32,
    lastReply: {
      author: {
        id: 3,
        name: 'Mariem Brahmi',
        avatar: '/placeholder-user.jpg'
      },
      date: '2023-05-12T08:30:00'
    }
  }
];

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const topicsPerPage = 4;

  // Filtrer les sujets
  const filteredTopics = topicsData.filter(topic => {
    return (
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === '' || topic.category === category)
    );
  });

  // Pagination
  const indexOfLastTopic = page * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = filteredTopics.slice(indexOfFirstTopic, indexOfLastTopic);
  const pageCount = Math.ceil(filteredTopics.length / topicsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Formatage de la date relative (il y a X jours)
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Aujourd'hui";
    } else if (diffDays === 1) {
      return "Hier";
    } else {
      return `Il y a ${diffDays} jours`;
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1">
          Forum
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          component={Link}
          to="/create-topic"
        >
          Nouveau sujet
        </Button>
      </Box>

      {/* Filtres */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Rechercher un sujet"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                <MenuItem value="CV et Candidatures">CV et Candidatures</MenuItem>
                <MenuItem value="Entreprises">Entreprises</MenuItem>
                <MenuItem value="Carrière">Carrière</MenuItem>
                <MenuItem value="Entretiens">Entretiens</MenuItem>
                <MenuItem value="Compétences">Compétences</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Liste des sujets */}
      <Card>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {currentTopics.length > 0 ? (
            currentTopics.map((topic, index) => (
              <React.Fragment key={topic.id}>
                <ListItem 
                  alignItems="flex-start" 
                  component={Link} 
                  to={`/forum/${topic.id}`}
                  sx={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={topic.author.name} src={topic.author.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Typography variant="subtitle1" component="span">
                          {topic.title}
                        </Typography>
                        <Chip 
                          label={topic.category} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {topic.author.name} - {getRelativeTime(topic.date)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <Comment fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">{topic.replies} réponses</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Visibility fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">{topic.views} vues</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Dernière réponse par {topic.lastReply.author.name} - {getRelativeTime(topic.lastReply.date)}
                          </Typography>
                        </Box>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < currentTopics.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" align="center" sx={{ my: 4 }}>
                    Aucun sujet ne correspond à votre recherche.
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Card>

      {/* Pagination */}
      {filteredTopics.length > 0 && (
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

export default Forum;