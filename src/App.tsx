import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from './components/Toast';
import { useAuthStore } from './stores/auth.store';
import { useChatStore } from './stores/chat.store';
import { useComingSoonStore } from './stores/coming-soon.store';
import { ComingSoonPage } from './pages/ComingSoonPage';
import { TenantSubscriptionAccessStatus } from './services/auth.service';
import { UserRole } from './lib/permissions';
import { LoginPage } from './pages/auth/LoginPage';
import { SubscriptionPage } from './pages/auth/SubscriptionPage';
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
import ViewUserPage from './pages/users/ViewUserPage';
import UserSettingsPage from './pages/users/UserSettingsPage';
import { ChatPage } from './pages/chat/ChatPage';
import { PlatformTenantsPage } from './pages/platform/PlatformTenantsPage.tsx';
import { PlatformTenantDetailPage } from './pages/platform/PlatformTenantDetailPage.tsx';
import { PlatformDashboardPage } from './pages/platform/PlatformDashboardPage.tsx';
import { PlatformGeoDataCreatePage } from './pages/platform/PlatformGeoDataCreatePage.tsx';
import { PlatformGeoDataImportPage } from './pages/platform/PlatformGeoDataImportPage.tsx';
import { ElectionEventsPage } from './pages/election-day/ElectionEventsPage';
import { ElectionUploadsPage } from './pages/election-day/ElectionUploadsPage';
import { ElectionUploadDetailPage } from './pages/election-day/ElectionUploadDetailPage';
import { ElectionDashboardPage } from './pages/election-day/ElectionDashboardPage';
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
  RegisterPage,
  RegisterCompletePage,
  EmailConfirmationResultPage
} from './pages/website';
import { PlatformGeoDataPage } from "./pages/platform/PlatformGeoDataPage.tsx";

const queryClient = new QueryClient();

// App routes that need the dashboard layout
const appRoutes = [
  '/dashboard', '/states', '/lgas', '/wards', '/voters', 
  '/polling-units', '/users', '/user', '/chat', '/login', '/subscription', '/platform-owner',
  '/election-day'
];

function AppLayout() {
  const location = useLocation();
  const { user, accessToken, subscriptionAccessStatus } = useAuthStore();
  const { connectSocket, disconnectSocket, setCurrentUserId } = useChatStore();
  const { isComingSoon, isLoading, fetchStatus } = useComingSoonStore();
  const isAppRoute = appRoutes.some(route => location.pathname.startsWith(route));

  // Fetch coming soon status on mount
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    setCurrentUserId(user?.id ?? null);
  }, [user?.id, setCurrentUserId]);

  useEffect(() => {
    if (accessToken) {
      connectSocket(accessToken, user?.id);
    } else {
      disconnectSocket();
    }
  }, [accessToken, user?.id, connectSocket, disconnectSocket]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const inactivityMs = 5 * 60 * 1000;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const resetTimer = () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        useAuthStore.getState().logout();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }, inactivityMs);
    };

    const activityEvents: Array<keyof WindowEventMap> = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
      'click'
    ];

    activityEvents.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [accessToken]);

  // Check if subscription is valid
  const hasValidSubscription = 
    subscriptionAccessStatus === TenantSubscriptionAccessStatus.SUBSCRIPTION_ACTIVE ||
    subscriptionAccessStatus === TenantSubscriptionAccessStatus.SUBSCRIPTION_GRACE;
  const isPlatformOwner = user?.role === UserRole.PLATFORM_OWNER;
  
  // Redirect to subscription page if logged in but no valid subscription
  const needsSubscription = 
    user && 
    accessToken && 
    !isPlatformOwner &&
    !hasValidSubscription && 
    location.pathname !== '/login' && 
    location.pathname !== '/subscription';

  // Show coming soon page if enabled
  if (!isLoading && isComingSoon) {
    return <ComingSoonPage />;
  }

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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/complete" element={<RegisterCompletePage />} />
        <Route path="/email-confirmation-result" element={<EmailConfirmationResultPage />} />
        <Route path="/request-access" element={<Navigate to="/register" replace />} />
        
        {/* Catch-all for unknown routes - go to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // App routes - with dashboard navbar/layout
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-[#f2f2f2]">
      <ToastContainer />
      {/* Only show navbar if user has valid subscription or is on subscription page */}
      {(hasValidSubscription || isPlatformOwner || location.pathname === '/subscription') && <Navbar />}
      <main className={hasValidSubscription || isPlatformOwner || location.pathname === '/subscription' ? "main-content px-4 sm:px-6 lg:px-8 pb-12 pt-6" : ""}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Subscription page - accessible when logged in */}
          <Route path="/subscription" element={needsSubscription || location.pathname === '/subscription' ? <SubscriptionPage /> : <Navigate to="/dashboard" replace />} />
          
          {/* Protected routes - require valid subscription */}
          <Route element={<ProtectedRoute />}>
            {needsSubscription ? (
              <Route path="*" element={<Navigate to="/subscription" replace />} />
            ) : (
              <>
                <Route
                  path="/dashboard"
                  element={isPlatformOwner ? <PlatformDashboardPage /> : <DashboardPage />}
                />
                <Route path="/platform-owner/tenants" element={<PlatformTenantsPage />} />
                <Route path="/platform-owner/tenants/:tenantId" element={<PlatformTenantDetailPage />} />
                <Route path="/platform-owner/geodata" element={<PlatformGeoDataPage />} />
                <Route path="/platform-owner/geodata/new" element={<PlatformGeoDataCreatePage />} />
                <Route path="/platform-owner/geodata/csv-import" element={<PlatformGeoDataImportPage />} />
                <Route path="/states" element={<StatesPage />} />
                <Route path="/states/new" element={isPlatformOwner ? <Navigate to="/states" replace /> : <CreateStatePage />} />
                <Route path="/states/:id" element={<StateDetailPage />} />
                <Route path="/lgas" element={<LGAsPage />} />
                <Route path="/lgas/new" element={isPlatformOwner ? <Navigate to="/lgas" replace /> : <CreateLGAPage />} />
                <Route path="/lgas/:id" element={<LGADetailPage />} />
                <Route path="/wards" element={<WardsPage />} />
                <Route path="/wards/new" element={isPlatformOwner ? <Navigate to="/wards" replace /> : <CreateWardPage />} />
                <Route path="/wards/:id" element={<WardDetailPage />} />
                <Route path="/voters" element={<VotersPage />} />
                <Route path="/voters/new" element={isPlatformOwner ? <Navigate to="/voters" replace /> : <CreateVoterPage />} />
                <Route path="/voters/:id" element={<ViewVoterPage />} />
                <Route path="/voters/:id/edit" element={isPlatformOwner ? <Navigate to="/voters" replace /> : <EditVoterPage />} />
                <Route path="/polling-units" element={<PollingUnitsPage />} />
                <Route path="/polling-units/new" element={isPlatformOwner ? <Navigate to="/polling-units" replace /> : <CreatePollingUnitPage />} />
                <Route path="/polling-units/:id" element={<PollingUnitDetailPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:id" element={<ViewUserPage />} />
                <Route path="/users/new" element={isPlatformOwner ? <Navigate to="/users" replace /> : <CreateUserPage />} />
                <Route path="/user/settings" element={<UserSettingsPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/election-day" element={<ElectionEventsPage />} />
                <Route path="/election-day/:eventId/uploads" element={<ElectionUploadsPage />} />
                <Route path="/election-day/:eventId/uploads/:uploadId" element={<ElectionUploadDetailPage />} />
                <Route path="/election-day/:eventId/dashboard" element={<ElectionDashboardPage />} />
              </>
            )}
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
