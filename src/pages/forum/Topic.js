import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Avatar, Button, Divider, TextField, Card, CardContent, Chip, IconButton } from '@mui/material';
import { Reply, ThumbUp, ThumbDown, Flag, Send } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

// Données fictives pour le sujet du forum
const topicData = {
  id: 1,
  title: 'Comment optimiser son CV pour le secteur tech ?',
  content: 'Bonjour à tous,\n\nJe suis actuellement à la recherche d\'un emploi dans le secteur tech et je souhaiterais avoir vos conseils pour optimiser mon CV. Quels sont les éléments essentiels à mettre en avant ? Comment structurer mon CV pour qu\'il soit attractif pour les recruteurs tech ?\n\nMerci d\'avance pour vos conseils !',
  author: {
    id: 1,
    name: 'Thomas Dubois',
    avatar: '/placeholder-user.jpg'
  },
  category: 'CV et Candidatures',
  date: '2023-05-10T14:30:00',
  views: 245,
  replies: [
    {
      id: 1,
      content: 'Pour un CV dans le secteur tech, je te conseille de mettre en avant tes compétences techniques en premier lieu. Fais une section dédiée avec les langages, frameworks et outils que tu maîtrises. N\'hésite pas à mentionner tes projets personnels et ton GitHub si tu en as un.',
      author: {
        id: 2,
        name: 'Julie Lefebvre',
        avatar: '/placeholder-user.jpg'
      },
      date: '2023-05-10T15:45:00',
      likes: 12,
      dislikes: 0
    },
    {
      id: 2,
      content: 'Je suis d\'accord avec Julie. J\'ajouterais qu\'il est important de personnaliser ton CV pour chaque offre d\'emploi. Analyse bien l\'offre et mets en avant les compétences qui correspondent le mieux. Aussi, n\'oublie pas de quantifier tes réalisations (ex: "Amélioration des performances de 30%").',
      author: {
        id: 3,
        name: 'Sophie Martin',
        avatar: '/placeholder-user.jpg'
      },
      date: '2023-05-11T09:20:00',
      likes: 8,
      dislikes: 1
    },
    {
      id: 3,
      content: 'Un autre conseil : garde ton CV concis (1-2 pages maximum). Les recruteurs tech reçoivent beaucoup de candidatures et n\'ont pas le temps de lire des CV trop longs. Va à l\'essentiel et mets en avant ce qui te différencie des autres candidats.',
      author: {
        id: 4,
        name: 'Marc Dupont',
        avatar: '/placeholder-user.jpg'
      },
      date: '2023-05-11T14:10:00',
      likes: 5,
      dislikes: 0
    }
  ]
};

const Topic = () => {
  const { id } = useParams();
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitReply = () => {
    if (replyContent.trim() !== '') {
      // Logique pour soumettre la réponse
      console.log('Réponse soumise:', replyContent);
      setReplyContent('');
    }
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        {/* En-tête du sujet */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h4" component="h1">
            {topicData.title}
          </Typography>
          <Chip label={topicData.category} color="primary" />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar src={topicData.author.avatar} alt={topicData.author.name} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">
              {topicData.author.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(topicData.date)}
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
          {topicData.content}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {topicData.views} vues • {topicData.replies.length} réponses
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Reply />}
            onClick={() => document.getElementById('reply-box').focus()}
          >
            Répondre
          </Button>
        </Box>
      </Paper>
      
      {/* Réponses */}
      <Typography variant="h5" component="h2" gutterBottom>
        Réponses ({topicData.replies.length})
      </Typography>
      
      {topicData.replies.map((reply) => (
        <Card key={reply.id} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={reply.author.avatar} alt={reply.author.name} sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1">
                  {reply.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(reply.date)}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="body1" paragraph>
              {reply.content}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" color="primary">
                  <ThumbUp fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ mx: 1 }}>
                  {reply.likes}
                </Typography>
                <IconButton size="small" color="error">
                  <ThumbDown fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ mx: 1 }}>
                  {reply.dislikes}
                </Typography>
              </Box>
              <IconButton size="small" color="default">
                <Flag fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
      
      {/* Formulaire de réponse */}
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Votre réponse
        </Typography>
        
        <TextField
          id="reply-box"
          fullWidth
          multiline
          rows={4}
          placeholder="Écrivez votre réponse ici..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<Send />}
            onClick={handleSubmitReply}
            disabled={replyContent.trim() === ''}
          >
            Envoyer
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Topic;