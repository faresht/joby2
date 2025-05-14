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
      name: 'TunisTech',
      avatar: '/tunistech-avatar.jpg',
      type: 'Entreprise'
    },
    author: {
      id: 1,
      name: 'Amine Jaziri',
      avatar: '/amine-avatar.jpg'
    },
    rating: 4.8,
    title: 'Une entreprise innovante et dynamique',
    content: 'Travailler chez TunisTech m\'a permis de participer à des projets innovants. L\'ambiance est très bonne et la direction est très attentive à ses employés.',
    pros: 'Projets innovants, ambiance de travail agréable',
    cons: 'Charge de travail parfois élevée',
    date: '2025-05-01',
    helpful: 20,
    notHelpful: 3
  },
  {
    id: 2,
    type: 'company',
    target: {
      id: 2,
      name: 'SfaxDigital',
      avatar: '/sfaxdigital-avatar.jpg',
      type: 'Entreprise'
    },
    author: {
      id: 2,
      name: 'Sofia Ben Salah',
      avatar: '/sofia-avatar.jpg'
    },
    rating: 3.7,
    title: 'Bonne entreprise, mais des améliorations à faire',
    content: 'SfaxDigital est une entreprise avec de bons projets, mais la gestion du temps et la communication pourraient être améliorées.',
    pros: 'Projets intéressants, équipe technique solide',
    cons: 'Communication difficile, délais parfois trop courts',
    date: '2025-04-20',
    helpful: 15,
    notHelpful: 4
  },
  {
    id: 3,
    type: 'user',
    target: {
      id: 3,
      name: 'Hedi Cherif',
      avatar: '/hedi-avatar.jpg',
      type: 'Freelance'
    },
    author: {
      id: 4,
      name: 'Sarra Gharbi',
      avatar: '/sarra-avatar.jpg'
    },
    rating: 5,
    title: 'Professionnelle et très réactive',
    content: 'J\'ai travaillé avec Hedi sur plusieurs projets web et je suis très satisfaite de sa réactivité et de la qualité de son travail.',
    pros: 'Réactive, professionnelle, travail de haute qualité',
    cons: 'Aucun',
    date: '2025-04-18',
    helpful: 22,
    notHelpful: 0
  },
  {
    id: 4,
    type: 'user',
    target: {
      id: 4,
      name: 'Ahmed Boulahdour',
      avatar: '/ahmed-avatar.jpg',
      type: 'Développeur'
    },
    author: {
      id: 5,
      name: 'Fatma Khaled',
      avatar: '/fatma-avatar.jpg'
    },
    rating: 4.3,
    title: 'Développeur fiable et méthodique',
    content: 'Ahmed a effectué un travail excellent sur notre application mobile. Il est méthodique et respectueux des délais, mais parfois la communication pourrait être améliorée.',
    pros: 'Méthodique, respect des délais, code propre',
    cons: 'Communication parfois limitée',
    date: '2025-04-15',
    helpful: 10,
    notHelpful: 2
  },
  {
    id: 5,
    type: 'company',
    target: {
      id: 5,
      name: 'TunisDevStudio',
      avatar: '/tunisdevstudio-avatar.jpg',
      type: 'Entreprise'
    },
    author: {
      id: 6,
      name: 'Khaled Bouzid',
      avatar: '/khaled-avatar.jpg'
    },
    rating: 4.7,
    title: 'Une équipe de développement très talentueuse',
    content: 'Travailler avec TunisDevStudio a été une excellente expérience. Leur équipe est très compétente et toujours prête à relever des défis.',
    pros: 'Compétence technique, équipe passionnée',
    cons: 'Charge de travail parfois trop intense',
    date: '2025-04-10',
    helpful: 18,
    notHelpful: 5
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
