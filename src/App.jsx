import { createBrowserRouter, Outlet, NavLink, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FaHome, FaTasks, FaComments, FaUsers } from "react-icons/fa";
// Components and Pages
import NotFound from "./pages/NotFound/NotFound";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/login/login";
import SignUp from "./signup/signup";
import AboutUs from "./pages/Landing/AboutUs";
import Features from "./pages/Landing/Features";
import Pricing from "./pages/Landing/Pricing";
import ContactUs from "./pages/Landing/ContactUs";
import GroupsPage from "./pages/groupPage/Groupspage";
import TermsAndPolicies from "./signup/TermsAndPolicies";
import Forget from "./pages/forget/forget";
import MyGroupsPage from "./pages/groupPage/MyGroupsPage";
// import ProfileSection from './pages/profile/Profile';
import Chat from "./pages/groupPage/Chats";
import { useLocation } from "react-router-dom";
import VideoCall from "./pages/VideoCall/VideoCall";
import MembersPage from "./pages/groupPage/Members";
import JoinRequestPage from "./pages/groupPage/JoinRequest";
import ProfileView from "./pages/profile/ProfileView";
import AddProjectPage from "./pages/addproject/AddProjectPage";
import AddGroupPage from "./pages/addgroup/AddGroupPage";
import ProjectsPage from "./pages/addproject/ProjectPage";
import MyProjectsPage from "./pages/addproject/MyProjects";
import ProjectOverview from "./pages/addproject/ProjectOverview";
export const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Replace "token" with your actual token key
};
const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
};
// Layout Component
const AppLayout = () => {
  const location = useLocation();
  const isInExcludedPaths =
    location.pathname.startsWith("/chats") ||
    location.pathname.startsWith("/call");
  return (
    <>
      {!isInExcludedPaths && (
        <div className="top-0 left-0 w-full z-30">
          <NavBar />
        </div>
      )}
      <main>
        <Outlet />
      </main>
      {!isInExcludedPaths && <Footer />}
    </>
  );
};

const ProjectLayout = () => {
  return (
      <div className="bg-gray-50 min-h-screen">
          {/* Project Header */}
          <header className="bg-gradient-to-r from-teal-700 to-cyan-700 text-white shadow-lg">
              <div className="container mx-auto flex flex-col items-center py-6 px-8">
                  <h1 className="text-3xl font-extrabold tracking-wide">Project Dashboard</h1>
                  <nav className="flex space-x-8 mt-6">
                      {[
                          { label: "Overview", to: "overview", Icon: FaHome },
                          { label: "Tasks", to: "tasks", Icon: FaTasks },
                          { label: "Chats", to: "chats", Icon: FaComments },
                          { label: "Join Requests", to: "join-requests", Icon: FaUsers },
                      ].map(({ label, to, Icon }) => (
                          <NavLink
                              key={to}
                              to={to}
                              className={({ isActive }) =>
                                  `flex items-center text-lg font-semibold px-6 py-3 rounded-md transition-all duration-300 ${
                                      isActive
                                          ? "bg-white text-teal-600 shadow-lg"
                                          : "text-teal-200 hover:text-white hover:bg-teal-500"
                                  }`
                              }
                          >
                              <Icon className="w-5 h-5 mr-2" />
                              {label}
                          </NavLink>
                      ))}
                  </nav>
              </div>
          </header>

          {/* Page Content */}
          <main className="container mx-auto px-8 py-12">
              <div className="bg-white rounded-lg shadow-xl p-8">
                  <Outlet />
              </div>
          </main>
      </div>
  );
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
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/terms-and-policies",
        element: <TermsAndPolicies />,
      },
      {
        path: "/forget", // Ensure path matches the SignUp link
        element: <Forget />,
      },
      {
        path: "/groups",
        element: <GroupsPage />,
      },
      {
        path: "/mygroups",
        element: <MyGroupsPage />,
      },
      {
        path: "/chats/:contextId",
        element: <Chat />,
      },
      {
        path: "/call/:contextId",
        element: <VideoCall />,
      },
      {
        path: "/members/:contextId",
        element: <MembersPage />,
      },
      {
        path: "/joinRequest/:contextId",
        element: <JoinRequestPage />,
      },
      {
        path: "/profile",
        element: <ProfileView />,
      },
      {
        path: "/add-project",
        element: <AddProjectPage />,
      },
      {
        path: "/add-group",
        element: <AddGroupPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/Myprojects",
        element: <MyProjectsPage />,
      },
      {
        path: '/projects/:id',
        element: <ProjectLayout />, 
        children: [
          { index: true, element: <ProjectOverview /> },
          { path: "overview", element: <ProjectOverview/> },
          { path: "tasks", element: <div>Tasks Page</div> },
          { path: "chats", element: <Chat /> },
          { path: "join-requests", element: <JoinRequestPage /> },
        ],
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
