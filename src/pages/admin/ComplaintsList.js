"use client"

import { useState } from "react"
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { Visibility, Search, FilterList, Reply, Check, Close } from "@mui/icons-material"
import { Link } from "react-router-dom"

// Données fictives pour les réclamations
const complaintsData = [
  {
    id: 1,
    title: "Problème avec une offre d'emploi",
    category: "Offre d'emploi",
    user: {
      id: 1,
      name: "Thomas Dubois",
    },
    date: "2023-05-15",
    status: "pending",
    description:
      "J'ai postulé à une offre d'emploi qui semble frauduleuse. L'entreprise demande des informations personnelles avant même un entretien.",
  },
  {
    id: 2,
    title: "Comportement inapproprié d'un recruteur",
    category: "Recruteur",
    user: {
      id: 2,
      name: "Julie Lefebvre",
    },
    date: "2023-05-10",
    status: "in_progress",
    description:
      "Lors d'un entretien, le recruteur a posé des questions discriminatoires concernant ma situation familiale.",
  },
  {
    id: 3,
    title: "Problème technique lors de la candidature",
    category: "Technique",
    user: {
      id: 3,
      name: "Sophie Martin",
    },
    date: "2023-05-05",
    status: "resolved",
    description:
      "Je n'arrive pas à soumettre ma candidature pour l'offre #12345. Le système affiche une erreur à chaque tentative.",
  },
  {
    id: 4,
    title: "Avis frauduleux sur mon entreprise",
    category: "Avis",
    user: {
      id: 6,
      name: "TechCorp",
    },
    date: "2023-05-12",
    status: "pending",
    description:
      "Plusieurs avis négatifs ont été publiés sur notre entreprise par ce qui semble être la même personne utilisant différents comptes.",
  },
  {
    id: 5,
    title: "Problème d'affichage sur mobile",
    category: "Technique",
    user: {
      id: 4,
      name: "Marc Dupont",
    },
    date: "2023-05-08",
    status: "rejected",
    description:
      "L'application mobile ne fonctionne pas correctement sur mon appareil Android. Les offres ne s'affichent pas.",
  },
]

const ComplaintsList = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // État pour le dialogue de réponse
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [responseText, setResponseText] = useState("")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenResponseDialog = (complaint) => {
    setSelectedComplaint(complaint)
    setResponseText("")
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedComplaint(null)
  }

  const handleSendResponse = () => {
    // Logique pour envoyer la réponse
    console.log("Réponse envoyée:", { complaintId: selectedComplaint.id, response: responseText })
    // Mettre à jour le statut de la réclamation
    // Dans une application réelle, vous feriez un appel API ici
    handleCloseDialog()
  }

  const handleUpdateStatus = (complaintId, newStatus) => {
    // Logique pour mettre à jour le statut
    console.log("Statut mis à jour:", { complaintId, newStatus })
    // Dans une application réelle, vous feriez un appel API ici
  }

  // Filtrer les réclamations
  const filteredComplaints = complaintsData.filter((complaint) => {
    return (
      (complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.user.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "" || complaint.category === categoryFilter) &&
      (statusFilter === "" || complaint.status === statusFilter)
    )
  })

  // Pagination
  const paginatedComplaints = filteredComplaints.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  // Formatage de la date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  // Obtenir le statut formaté
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return { label: "En attente", color: "warning" }
      case "in_progress":
        return { label: "En cours", color: "info" }
      case "resolved":
        return { label: "Résolu", color: "success" }
      case "rejected":
        return { label: "Rejeté", color: "error" }
      default:
        return { label: "Inconnu", color: "default" }
    }
  }

  // Obtenir les catégories uniques pour le filtre
  const categories = [...new Set(complaintsData.map((complaint) => complaint.category))]

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Gestion des réclamations
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
          <TextField
            label="Rechercher"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />,
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="category-label">Catégorie</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={categoryFilter}
              label="Catégorie"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">Toutes</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-label">Statut</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={statusFilter}
              label="Statut"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="pending">En attente</MenuItem>
              <MenuItem value="in_progress">En cours</MenuItem>
              <MenuItem value="resolved">Résolu</MenuItem>
              <MenuItem value="rejected">Rejeté</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => {
              setSearchTerm("")
              setCategoryFilter("")
              setStatusFilter("")
            }}
          >
            Réinitialiser
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table des réclamations">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedComplaints.map((complaint) => {
              const statusInfo = getStatusInfo(complaint.status)

              return (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell>{complaint.title}</TableCell>
                  <TableCell>{complaint.user.name}</TableCell>
                  <TableCell>{complaint.category}</TableCell>
                  <TableCell>{formatDate(complaint.date)}</TableCell>
                  <TableCell>
                    <Chip label={statusInfo.label} color={statusInfo.color} size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      to={`/admin/complaints/${complaint.id}`}
                      color="primary"
                      size="small"
                      title="Voir les détails"
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleOpenResponseDialog(complaint)}
                      title="Répondre"
                    >
                      <Reply fontSize="small" />
                    </IconButton>
                    {complaint.status !== "resolved" && (
                      <IconButton
                        color="success"
                        size="small"
                        onClick={() => handleUpdateStatus(complaint.id, "resolved")}
                        title="Marquer comme résolu"
                      >
                        <Check fontSize="small" />
                      </IconButton>
                    )}
                    {complaint.status !== "rejected" && (
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleUpdateStatus(complaint.id, "rejected")}
                        title="Rejeter"
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredComplaints.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
        />
      </TableContainer>

      {/* Dialogue de réponse */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Répondre à la réclamation</DialogTitle>
        <DialogContent>
          {selectedComplaint && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                {selectedComplaint.title}
              </Typography>
              <Typography variant="body2" paragraph>
                De: {selectedComplaint.user.name} • {formatDate(selectedComplaint.date)}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedComplaint.description}
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                id="response"
                label="Votre réponse"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSendResponse} variant="contained" disabled={!responseText.trim()}>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default ComplaintsList
