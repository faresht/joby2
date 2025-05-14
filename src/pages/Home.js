"use client"
import { Box, Container, Typography, Button, Grid, useMediaQuery, useTheme } from "@mui/material"
import { Work, Business, Forum, Star, ArrowForward } from "@mui/icons-material"
import { Link } from "react-router-dom"

const Home = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    // Unified blue color
    const primaryBlue = "#0A66C2"
    const lightBlue = "#E8F1FB"

    return (
        <Box sx={{ overflow: "hidden" }}>
            {/* Modern Hero Section with Gradient */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${primaryBlue} 0%, #0078D4 50%, #106EBE 100%)`,
                    pt: { xs: 10, md: 16 },
                    pb: { xs: 12, md: 20 },
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative Elements */}
                <Box
                    sx={{
                        position: "absolute",
                        top: -100,
                        right: -100,
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: -150,
                        left: -150,
                        width: 400,
                        height: 400,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.05)",
                    }}
                />

                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Box sx={{ color: "white", textAlign: { xs: "center", md: "left" } }}>
                                <Typography
                                    variant="h2"
                                    fontWeight="800"
                                    sx={{
                                        fontSize: { xs: "2.5rem", md: "3.5rem" },
                                        mb: 2,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Bienvenue sur Joby
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 4,
                                        fontWeight: 400,
                                        opacity: 0.9,
                                        maxWidth: "600px",
                                        mx: { xs: "auto", md: 0 },
                                    }}
                                >
                                    La plateforme idéale pour connecter talents et entreprises en Tunisie.
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        flexDirection: { xs: "column", sm: "row" },
                                        justifyContent: { xs: "center", md: "flex-start" },
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        component={Link}
                                        to="/register"
                                        sx={{
                                            bgcolor: "white",
                                            color: primaryBlue,
                                            fontWeight: 600,
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: "50px",
                                            textTransform: "none",
                                            fontSize: "1rem",
                                            boxShadow: "0 4px 14px 0 rgba(0,0,0,0.1)",
                                            "&:hover": {
                                                bgcolor: "#f0f0f0",
                                                boxShadow: "0 6px 20px 0 rgba(0,0,0,0.15)",
                                                transform: "translateY(-2px)",
                                            },
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        Créer un compte
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        component={Link}
                                        to="/companies"
                                        sx={{
                                            color: "white",
                                            borderColor: "white",
                                            fontWeight: 600,
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: "50px",
                                            textTransform: "none",
                                            fontSize: "1rem",
                                            "&:hover": {
                                                borderColor: "white",
                                                bgcolor: "rgba(255,255,255,0.1)",
                                                transform: "translateY(-2px)",
                                            },
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        Explorer les entreprises
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    height: "400px",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {/* Placeholder for illustration - in a real app, replace with an actual image */}
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        background: "url(/placeholder.svg?height=400&width=500)",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Wave Separator */}
            <Box
                sx={{
                    height: "150px",
                    width: "100%",
                    background: "white",
                    marginTop: "-100px",
                    borderRadius: "100% 100% 0 0",
                    position: "relative",
                    zIndex: 1,
                }}
            />

            {/* Services Section */}
            <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 2 }}>
                <Typography
                    variant="h3"
                    fontWeight="700"
                    textAlign="center"
                    sx={{
                        mb: 1,
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Nos services
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ mb: 6, maxWidth: "700px", mx: "auto" }}
                >
                    Découvrez tout ce que Joby peut vous offrir pour votre carrière et votre entreprise
                </Typography>

                <Grid container spacing={4}>
                    {[
                        {
                            icon: <Work />,
                            title: "Emplois",
                            description: "Explorez des opportunités professionnelles dans divers secteurs.",
                            link: "/jobs",
                        },
                        {
                            icon: <Business />,
                            title: "Entreprises",
                            description: "Découvrez les entreprises populaires et leurs évaluations.",
                            link: "/companies",
                        },
                        {
                            icon: <Forum />,
                            title: "Forum",
                            description: "Participez aux discussions et échangez avec la communauté.",
                            link: "/forum",
                        },
                        {
                            icon: <Star />,
                            title: "Avis",
                            description: "Consultez et partagez des évaluations sur les entreprises.",
                            link: "/reviews",
                        },
                    ].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Box
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    p: 3,
                                    borderRadius: "16px",
                                    bgcolor: "white",
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-10px)",
                                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                                    },
                                    border: "1px solid #f0f0f0",
                                    height: "280px", // Fixed height for all cards
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "64px",
                                        height: "64px",
                                        borderRadius: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 2,
                                        color: "white",
                                        background: primaryBlue,
                                    }}
                                >
                                    {feature.icon}
                                </Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    sx={{ mb: 2, height: "32px", display: "flex", alignItems: "center" }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mb: 3,
                                        height: "60px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {feature.description}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={feature.link}
                                    sx={{
                                        mt: "auto",
                                        color: primaryBlue,
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": {
                                            bgcolor: "transparent",
                                            "& .arrow": {
                                                transform: "translateX(4px)",
                                            },
                                        },
                                    }}
                                    endIcon={<ArrowForward className="arrow" sx={{ transition: "transform 0.2s ease" }} />}
                                >
                                    En savoir plus
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Stats Section */}
            <Box
                sx={{
                    bgcolor: lightBlue,
                    py: 10,
                    mt: 10,
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        fontWeight="700"
                        textAlign="center"
                        sx={{
                            mb: 6,
                            fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                    >
                        Joby en chiffres
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {[
                            { value: "10,000+", label: "Offres d'emploi" },
                            { value: "5,000+", label: "Entreprises" },
                            { value: "100,000+", label: "Utilisateurs" },
                            { value: "50,000+", label: "Avis" },
                        ].map((stat, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        p: 3,
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        fontWeight="800"
                                        sx={{
                                            mb: 1,
                                            color: primaryBlue,
                                            fontSize: { xs: "2rem", md: "2.5rem" },
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    py: 10,
                    background: `linear-gradient(135deg, ${primaryBlue} 0%, #0078D4 100%)`,
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        fontWeight="700"
                        sx={{
                            mb: 2,
                            fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                    >
                        Prêt à commencer votre parcours ?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, maxWidth: "600px", mx: "auto" }}>
                        Rejoignez Joby dès aujourd'hui et découvrez toutes les opportunités qui vous attendent.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/register"
                        sx={{
                            bgcolor: "white",
                            color: primaryBlue,
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            borderRadius: "50px",
                            textTransform: "none",
                            fontSize: "1rem",
                            boxShadow: "0 4px 14px 0 rgba(0,0,0,0.1)",
                            "&:hover": {
                                bgcolor: "#f0f0f0",
                                boxShadow: "0 6px 20px 0 rgba(0,0,0,0.15)",
                                transform: "translateY(-2px)",
                            },
                            transition: "all 0.2s ease",
                        }}
                    >
                        Créer un compte gratuitement
                    </Button>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    bgcolor: "#f8f9fa",
                    py: 4,
                    borderTop: "1px solid #eaeaea",
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        © {new Date().getFullYear()} Joby. Tous droits réservés.
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}

export default Home
