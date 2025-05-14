"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Tooltip,
    useTheme,
} from "@mui/material"
import {
    Home,
    AccountCircle,
    Work,
    Business,
    Forum,
    Star as Reviews,
    Report,
    AdminPanelSettings,
    Logout,
    TrendingUp,
} from "@mui/icons-material"

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const theme = useTheme()

    const primaryBlue = "#0A66C2"
    const lightBlue = "#E8F1FB"

    const navItems = [
        { path: "/", icon: <Home />, label: "Accueil" },
        { path: "/profile", icon: <AccountCircle />, label: "Profil" },
        { path: "/companies", icon: <Business />, label: "Entreprises" },
        { path: "/jobs", icon: <Work />, label: "Emplois" },
        { path: "/forum", icon: <Forum />, label: "Forum" },
        { path: "/reviews", icon: <Reviews />, label: "Avis" },
        { path: "/create-complaint", icon: <Report />, label: "Réclamation" },
        { path: "/Perfomance", icon: <TrendingUp />, label: "Performance" },
    ]

    const adminItem = { path: "/admin/dashboard", icon: <AdminPanelSettings />, label: "Admin" }

    const isActive = (path: string) => {
        if (path === "/") return location.pathname === "/"
        return location.pathname.startsWith(path)
    }

    const handleLogout = () => {
        // Tu peux aussi vider les données du localStorage ici si nécessaire
        navigate("/login")
    }

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "white",
                borderBottom: "1px solid #e0e0e0",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <Box component="img" src="/joby.png" alt="Joby Logo" sx={{ height: 40 }} />
                    </Box>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ display: "flex", gap: 0.5, mx: 2 }}>
                    {navItems.map((item) => (
                        <Tooltip title={item.label} key={item.path}>
                            <IconButton
                                component={Link}
                                to={item.path}
                                sx={{
                                    color: isActive(item.path) ? primaryBlue : "text.secondary",
                                    bgcolor: isActive(item.path) ? lightBlue : "transparent",
                                    borderRadius: "8px",
                                    mx: 0.5,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        bgcolor: lightBlue,
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                {item.icon}
                            </IconButton>
                        </Tooltip>
                    ))}
                    <Tooltip title="Administration">
                        <IconButton
                            component={Link}
                            to={adminItem.path}
                            sx={{
                                color: isActive(adminItem.path) ? primaryBlue : "text.secondary",
                                bgcolor: isActive(adminItem.path) ? lightBlue : "transparent",
                                borderRadius: "8px",
                                mx: 0.5,
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    bgcolor: lightBlue,
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            {adminItem.icon}
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Logout Button */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        sx={{
                            borderRadius: "50px",
                            textTransform: "none",
                            px: 2,
                            borderColor: primaryBlue,
                            color: primaryBlue,
                            "&:hover": {
                                borderColor: primaryBlue,
                                bgcolor: lightBlue,
                            },
                        }}
                    >
                        Déconnexion
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
