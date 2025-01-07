import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components and Pages
import NotFound from './pages/NotFound/NotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Landing from './pages/Landing/Landing';
import Login from './login/login';
import SignUp from './signup/signup';
import AboutUs from './pages/Landing/AboutUs';
import Features from './pages/Landing/Features';
import Pricing from './pages/Landing/Pricing';
import ContactUs from './pages/Landing/ContactUs';
import TermsAndPolicies from './signup/TermsAndPolicies';  // Make sure path is correct

// Layout Component
const AppLayout = () => (
    <>
      <div className="top-0 left-0 w-full z-30">
        <NavBar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
);

// QueryClient for React Query
const queryClient = new QueryClient();

// Routes Configuration
const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/features',
        element: <Features />,
      },
      {
        path: '/pricing',
        element: <Pricing />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
      },
      {
        path: '/terms-and-policies', // Ensure path matches the SignUp link
        element: <TermsAndPolicies />,
      },
    ],
  },
]);

// Main App Component
function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
  );
}

export default App;
