import React from "react";
import { Card, Row, Col, Table, ProgressBar } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Typography, Box } from "@mui/material";

// Mock data for performance metrics
const mockPerformanceData = {
    profileViews: 245,
    profileCompleteness: 85,
    applicationsSent: 12,
    responseRate: 75,
    interviewRate: 40,
    skillsEndorsements: {
        JavaScript: 15,
        React: 12,
        "Node.js": 8,
        "HTML/CSS": 10,
        SQL: 6,
        Git: 7,
        TypeScript: 5,
    },
    applicationHistory: [
        { month: "Jan", applications: 2, responses: 1, interviews: 0 },
        { month: "Feb", applications: 3, responses: 2, interviews: 1 },
        { month: "Mar", applications: 1, responses: 1, interviews: 1 },
        { month: "Apr", applications: 4, responses: 3, interviews: 2 },
        { month: "May", applications: 2, responses: 1, interviews: 0 },
    ],
    profileImprovements: [
        "Ajouter plus de détails à vos expériences professionnelles",
        "Compléter la section formation avec des détails sur vos diplômes",
        "Ajouter des projets personnels à votre profil",
        "Obtenir plus de recommandations de vos collègues",
    ],
};

const Performance = () => {
    return (
        <div>
            <Typography variant="h4" gutterBottom color="primary">
                Performance du profil
            </Typography>

            {/* Key Metrics */}
            <Row className="g-4 mb-4">
                <Col md={3}>
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Vues du profil
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {mockPerformanceData.profileViews}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Derniers 30 jours
                            </Typography>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Complétude du profil
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {mockPerformanceData.profileCompleteness}%
                            </Typography>
                            <ProgressBar
                                now={mockPerformanceData.profileCompleteness}
                                variant={mockPerformanceData.profileCompleteness > 70 ? "success" : "warning"}
                                className="mt-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Candidatures envoyées
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {mockPerformanceData.applicationsSent}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Derniers 30 jours
                            </Typography>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Taux de réponse
                            </Typography>
                            <Typography variant="h5" color="primary">
                                {mockPerformanceData.responseRate}%
                            </Typography>
                            <ProgressBar
                                now={mockPerformanceData.responseRate}
                                variant={mockPerformanceData.responseRate > 50 ? "success" : "warning"}
                                className="mt-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Application History Chart */}
            <Card className="mb-4">
                <Card.Body>
                    <Typography variant="h5" gutterBottom>
                        Historique des candidatures
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockPerformanceData.applicationHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="applications" name="Candidatures" fill="#1976d2" />
                            <Bar dataKey="responses" name="Réponses" fill="#2196f3" />
                            <Bar dataKey="interviews" name="Entretiens" fill="#4caf50" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>

            <Row className="g-4">
                {/* Skills Endorsements */}
                <Col md={6}>
                    <Card className="h-100">
                        <Card.Body>
                            <Typography variant="h5" gutterBottom>
                                Recommandations de compétences
                            </Typography>
                            <Table striped>
                                <thead>
                                <tr>
                                    <th>Compétence</th>
                                    <th>Recommandations</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(mockPerformanceData.skillsEndorsements)
                                    .sort(([, a], [, b]) => b - a)
                                    .map(([skill, count]) => (
                                        <tr key={skill}>
                                            <td>{skill}</td>
                                            <td>{count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Profile Improvements */}
                <Col md={6}>
                    <Card className="h-100">
                        <Card.Body>
                            <Typography variant="h5" gutterBottom>
                                Améliorations suggérées
                            </Typography>
                            <ul className="list-group">
                                {mockPerformanceData.profileImprovements.map((improvement, index) => (
                                    <li key={index} className="list-group-item">
                                        {improvement}
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Performance;