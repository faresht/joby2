import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Composants de mise en page
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';

// Pages principales
import Home from './pages/Home.js';
import Login from './pages/auth/Login.js';
import Register from './pages/auth/Register.js';
import Dashboard from './pages/Dashboard.js';

// Pages utilisateur
import Profile from './pages/user/Profile.js';
import EditProfile from './pages/user/EditProfile.js';
import CV from './pages/user/CV.js';

// Pages entreprise
import Companies from './pages/company/Companies.js';
import CompanyDetail from './pages/company/CompanyDetail.js';
import CompanyDashboard from './pages/company/CompanyDashboard.js';

// Pages offres d'emploi
import Jobs from './pages/jobs/jobs.js';
import JobDetail from './pages/jobs/JobDetails.js';
import CreateJob from './pages/jobs/CreateJob.js';

// Pages forum
import Forum from './pages/forum/forum.js';
import Topic from './pages/forum/Topic.js';
import CreateTopic from './pages/forum/CreateTopic.js';

// Pages avis
import Reviews from './pages/reviews/reviews.js';
import CreateReview from './pages/reviews/CreateReview.js';

// Pages réclamations
import Complaints from './pages/complaints/Complaints.js';
import CreateComplaint from './pages/complaints/CreateComplaint.js';

// Pages admin
import AdminDashboard from './pages/admin/AdminDashboard.js';
import UsersList from './pages/admin/UsersList.js';
import CompaniesList from './pages/admin/CompaniesList.js';

// Thème personnalisé blanc et bleu
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Bleu principal
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#f5f5f5', // Blanc cassé
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <div className="container mt-4 mb-5 main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Routes utilisateur */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/cv" element={<CV />} />
            
            {/* Routes entreprise */}
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetail />} />
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            
            {/* Routes offres d'emploi */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/create-job" element={<CreateJob />} />
            
            {/* Routes forum */}
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<Topic />} />
            <Route path="/create-topic" element={<CreateTopic />} />
            
            {/* Routes avis */}
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/create-review" element={<CreateReview />} />
            
            {/* Routes réclamations */}
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/create-complaint" element={<CreateComplaint />} />
            
            {/* Routes admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/companies" element={<CompaniesList />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;