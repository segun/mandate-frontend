import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from './components/Toast';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { VotersPage } from './pages/voters/VotersPage';
import CreateVoterPage from './pages/voters/CreateVoterPage';
import EditVoterPage from './pages/voters/EditVoterPage';
import ViewVoterPage from './pages/voters/ViewVoterPage';
import { WardsPage } from './pages/wards/WardsPage';
import { CreateWardPage } from './pages/wards/CreateWardPage';
import { WardDetailPage } from './pages/wards/WardDetailPage';
import { StatesPage } from './pages/states/StatesPage';
import { CreateStatePage } from './pages/states/CreateStatePage';
import { StateDetailPage } from './pages/states/StateDetailPage';
import { LGAsPage } from './pages/lgas/LGAsPage';
import { CreateLGAPage } from './pages/lgas/CreateLGAPage';
import { LGADetailPage } from './pages/lgas/LGADetailPage';
import { PollingUnitsPage } from './pages/polling-units/PollingUnitsPage';
import { PollingUnitDetailPage } from './pages/polling-units/PollingUnitDetailPage';
import { CreatePollingUnitPage } from './pages/polling-units/CreatePollingUnitPage';
import { UsersPage } from './pages/users/UsersPage';
import './App.css';
import CreateUserPage from "./pages/users/CreateUserPage";

// Website pages
import { 
  HomePage, 
  AboutPage, 
  ProductPage, 
  SolutionsPage, 
  PlatformPage, 
  PartnershipsPage, 
  ContactPage, 
  RequestAccessPage 
} from './pages/website';

const queryClient = new QueryClient();

// App routes that need the dashboard layout
const appRoutes = [
  '/dashboard', '/states', '/lgas', '/wards', '/voters', 
  '/polling-units', '/users', '/login'
];

function AppLayout() {
  const location = useLocation();
  const isAppRoute = appRoutes.some(route => location.pathname.startsWith(route));

  // Website routes - no dashboard navbar/layout
  if (!isAppRoute) {
    return (
      <Routes>
        {/* Website public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/partnerships" element={<PartnershipsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/request-access" element={<RequestAccessPage />} />
        
        {/* Catch-all for unknown routes - go to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // App routes - with dashboard navbar/layout
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-[#f2f2f2]">
      <ToastContainer />
      <Navbar />
      <main className="main-content px-4 sm:px-6 lg:px-8 pb-12 pt-6">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/states" element={<StatesPage />} />
            <Route path="/states/new" element={<CreateStatePage />} />
            <Route path="/states/:id" element={<StateDetailPage />} />
            <Route path="/lgas" element={<LGAsPage />} />
            <Route path="/lgas/new" element={<CreateLGAPage />} />
            <Route path="/lgas/:id" element={<LGADetailPage />} />
            <Route path="/wards" element={<WardsPage />} />
            <Route path="/wards/new" element={<CreateWardPage />} />
            <Route path="/wards/:id" element={<WardDetailPage />} />
            <Route path="/voters" element={<VotersPage />} />
            <Route path="/voters/new" element={<CreateVoterPage />} />
            <Route path="/voters/:id" element={<ViewVoterPage />} />
            <Route path="/voters/:id/edit" element={<EditVoterPage />} />
            <Route path="/polling-units" element={<PollingUnitsPage />} />
            <Route path="/polling-units/new" element={<CreatePollingUnitPage />} />
            <Route path="/polling-units/:id" element={<PollingUnitDetailPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/new" element={<CreateUserPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
