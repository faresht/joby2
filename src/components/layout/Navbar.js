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
  Menu,
  MenuItem,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from "@mui/icons-material/AccountCircle"
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
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      </Toolbar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </AppBar>
  )
}

export default Navbar
