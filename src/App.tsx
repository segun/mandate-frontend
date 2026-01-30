import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from './components/Toast';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { VotersPage } from './pages/voters/VotersPage';
import { WardsPage } from './pages/wards/WardsPage';
import { CreateWardPage } from './pages/wards/CreateWardPage';
import { StatesPage } from './pages/states/StatesPage';
import { CreateStatePage } from './pages/states/CreateStatePage';
import { StateDetailPage } from './pages/states/StateDetailPage';
import { LGAsPage } from './pages/lgas/LGAsPage';
import { PollingUnitsPage } from './pages/polling-units/PollingUnitsPage';
import { UsersPage } from './pages/users/UsersPage';
import './App.css';
import CreateUserPage from "./pages/users/CreateUserPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
                <Route path="/wards" element={<WardsPage />} />
                <Route path="/wards/new" element={<CreateWardPage />} />
                <Route path="/voters" element={<VotersPage />} />
                <Route path="/polling-units" element={<PollingUnitsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/new" element={<CreateUserPage />} />
              </Route>
              
              {/* Redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
