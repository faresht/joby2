import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, TextField, Box, Rating, Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Pagination, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThumbUp, ThumbDown, Add, Business, Person } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
// Données fictives pour les avis
const reviewsData = [
  {
    id: 1,
    type: 'company', // 'company' ou 'user'
    target: {
      id: 1,
      name: 'TechCorp',
      avatar: '/placeholder.svg',
      type: 'Entreprise'
    },
    author: {
      id: 1,
      name: 'Thomas Dubois',
      avatar: '/placeholder-user.jpg'
    },
    rating: 4.5,
    title: 'Excellente entreprise avec une bonne ambiance',
    content: 'J\'ai travaillé chez TechCorp pendant 2 ans et j\'ai beaucoup apprécié l\'ambiance de travail et les projets intéressants. La direction est à l\'écoute des employés et les avantages sont nombreux.',
    pros: 'Bonne ambiance, projets intéressants, management à l\'écoute',
    cons: 'Parfois des heures supplémentaires nécessaires',
    date: '2023-05-10',
    helpful: 12,
    notHelpful: 2
  },
  {
    id: 2,
    type: 'company',
    target: {
      id: 2,
      name: 'WebSolutions',
      avatar: '/placeholder.svg',
      type: 'Entreprise'
    },
    author: {
      id: 2,
      name: 'Julie Lefebvre',
      avatar: '/placeholder-user.jpg'
    },
    rating: 3.5,
    title: 'Entreprise correcte mais peut mieux faire',
    content: 'WebSolutions a de bons projets mais la gestion pourrait être améliorée. Les délais sont souvent trop courts et la communication n\'est pas toujours optimale.',
    pros: 'Projets variés, bonne équipe technique',
    cons: 'Communication difficile, délais serrés',
    date: '2023-05-08',
    helpful: 8,
    notHelpful: 3
  },
  {
    id: 3,
    type: 'user',
    target: {
      id: 3,
      name: 'Sophie Martin',
      avatar: '/placeholder-user.jpg',
      type: 'Freelance'
    },
    author: {
      id: 4,
      name: 'Marc Dupont',
      avatar: '/placeholder-user.jpg'
    },
    rating: 5,
    title: 'Excellente professionnelle',
    content: 'J\'ai travaillé avec Sophie sur plusieurs projets et je ne peux que recommander ses services. Elle est très professionnelle, réactive et livre toujours un travail de qualité.',
    pros: 'Professionnelle, réactive, travail de qualité',
    cons: 'Aucun point négatif à signaler',
    date: '2023-05-07',
    helpful: 15,
    notHelpful: 0
  },
  {
    id: 4,
    type: 'user',
    target: {
      id: 4,
      name: 'Marc Dupont',
      avatar: '/placeholder-user.jpg',
      type: 'Développeur'
    },
    author: {
      id: 5,
      name: 'Alexandre Petit',
      avatar: '/placeholder-user.jpg'
    },
    rating: 4,
    title: 'Bon développeur, travail soigné',
    content: 'Marc a réalisé un excellent travail sur notre projet. Il est méthodique et livre un code propre et bien documenté. La communication pourrait être un peu plus fréquente.',
    pros: 'Code propre, méthodique, respecte les délais',
    cons: 'Communication parfois limitée',
    date: '2023-05-05',
    helpful: 7,
    notHelpful: 1
  },
  {
    id: 5,
    type: 'company',
    target: {
      id: 3,
      name: 'DesignStudio',
      avatar: '/placeholder.svg',
      type: 'Entreprise'
    },
    author: {
      id: 3,
      name: 'Sophie Martin',
      avatar: '/placeholder-user.jpg'
    },
    rating: 4.5,
    title: 'Studio de design créatif et innovant',
    content: 'DesignStudio est une entreprise très créative avec une excellente ambiance de travail. Les projets sont variés et intéressants. Le seul bémol est la charge de travail parfois élevée.',
    pros: 'Créativité, projets variés, bonne ambiance',
    cons: 'Charge de travail importante',
    date: '2023-05-03',
    helpful: 10,
    notHelpful: 2
  }
];

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewType, setReviewType] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 3;

  // Filtrer les avis
  const filteredReviews = reviewsData.filter(review => {
    return (
      (review.target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       review.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (reviewType === '' || review.type === reviewType) &&
      review.rating >= minRating
    );
  });

  // Pagination
  const indexOfLastReview = page * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const pageCount = Math.ceil(filteredReviews.length / reviewsPerPage);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1">
          Avis
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          component={Link}
          to="/create-review"
        >
          Ajouter un avis
        </Button>
      </Box>

      {/* Filtres */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rechercher un avis"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Type d'avis"
                variant="outlined"
                value={reviewType}
                onChange={(e) => setReviewType(e.target.value)}
              >
                <MenuItem value="">Tous les types</MenuItem>
                <MenuItem value="company">Entreprises</MenuItem>
                <MenuItem value="user">Utilisateurs</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" gutterBottom>
                  Note minimale
                </Typography>
                <Rating
                  name="min-rating"
                  value={minRating}
                  onChange={(event, newValue) => {
                    setMinRating(newValue);
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Liste des avis */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {currentReviews.length > 0 ? (
          currentReviews.map((review, index) => (
            <Card key={review.id} sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <ListItemAvatar>
                        <Avatar 
                          alt={review.target.name} 
                          src={review.target.avatar}
                          variant={review.type === 'company' ? 'rounded' : 'circular'}
                        >
                          {review.type === 'company' ? <Business /> : <Person />}
                        </Avatar>
                      </ListItemAvatar>
                      <Box>
                        <Typography variant="subtitle1">
                          {review.target.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip 
                            label={review.target.type} 
                            size="small" 
                            color={review.type === 'company' ? 'primary' : 'secondary'} 
                            variant="outlined" 
                            sx={{ mr: 1 }}
                          />
                          <Rating value={review.rating} precision={0.5} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            ({review.rating})
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h6" gutterBottom>
                      {review.title}
                    </Typography>
                    
                    <Typography variant="body1" paragraph>
                      {review.content}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="success.main">
                          Points positifs:
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {review.pros}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="error.main">
                          Points négatifs:
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {review.cons}
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={review.author.name} src={review.author.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                        <Typography variant="body2">
                          Avis de {review.author.name} - {formatDate(review.date)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button startIcon={<ThumbUp />} size="small" sx={{ mr: 1 }}>
                          {review.helpful}
                        </Button>
                        <Button startIcon={<ThumbDown />} size="small">
                          {review.notHelpful}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6" align="center" sx={{ my: 4 }}>
                Aucun avis ne correspond à votre recherche.
              </Typography>
            </CardContent>
          </Card>
        )}
      </List>

      {/* Pagination */}
      {filteredReviews.length > 0 && (
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

export default Reviews;