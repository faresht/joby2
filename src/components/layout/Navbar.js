"use client"

import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  MenuItem,
  Button,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import ForumIcon from "@mui/icons-material/Forum"
import RateReviewIcon from "@mui/icons-material/RateReview"
import { ReportProblem } from "@mui/icons-material" // Added import
import { Link } from "react-router-dom"

function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }

    setDrawerOpen(open)
  }

  const list = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <MenuItem component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Accueil</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText>À propos</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/forum">
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText>Forum</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/reviews">
          <ListItemIcon>
            <RateReviewIcon />
          </ListItemIcon>
          <ListItemText>Avis</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/complaints">
          <ListItemIcon>
            <ReportProblem fontSize="small" />
          </ListItemIcon>
          <ListItemText>Réclamations</ListItemText>
        </MenuItem>
      </List>
    </Box>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mon Application
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/login" sx={{ mr: 1 }}>
            Connexion
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            component={Link}
            to="/register"
            sx={{
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Inscription
          </Button>
        </div>
      </Toolbar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </AppBar>
  )
}

export default Navbar
