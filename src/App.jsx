import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components and Pages
import NotFound from './pages/NotFound/NotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Landing from './pages/Landing/Landing';
import Login from './pages/login/login';
import SignUp from './signup/signup';
import AboutUs from './pages/Landing/AboutUs';
import Features from './pages/Landing/Features';
import Pricing from './pages/Landing/Pricing';
import ContactUs from './pages/Landing/ContactUs';
import GroupsPage from './pages/groupPage/Groupspage';
import TermsAndPolicies from './signup/TermsAndPolicies';  
import Forget from './pages/forget/forget';
import MyGroupsPage from './pages/groupPage/MyGroupsPage';
// import ProfileSection from './pages/profile/Profile';
import Chat from './pages/groupPage/Chats';
import { useLocation } from 'react-router-dom';
import VideoCall from './pages/VideoCall/VideoCall';
import MembersPage from './pages/groupPage/Members';
import JoinRequestPage from './pages/groupPage/JoinRequest';
// Layout Component
const AppLayout = () => {
  const location = useLocation();
  const isInExcludedPaths = location.pathname.startsWith('/chats') || location.pathname.startsWith('/call');
    return(<>
      {!isInExcludedPaths && (
        <div className="top-0 left-0 w-full z-30">
          <NavBar />
        </div>
      )}
      <main>
        <Outlet />
      </main>
      {!isInExcludedPaths && <Footer />}
    </>)
};

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
        path: '/terms-and-policies', 
        element: <TermsAndPolicies />,
      },
      {
        path: '/forget', // Ensure path matches the SignUp link
        element: <Forget/>,
      },
   {
          path:"/groups",
          element:<GroupsPage/>
        },
        {
          path:"/mygroups",
          element:<MyGroupsPage/>
        },
        {
          path:"/chats/:contextId",
          element:<Chat/>
        },
        {
          path: "/call/:contextId",
          element: <VideoCall/>,
        },
        {
          path: "/members/:contextId",
          element: <MembersPage/>,
        },
        {
          path: "/joinRequest/:contextId",
          element: <JoinRequestPage/>,
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
