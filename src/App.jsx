import { useState } from 'react'

import { createBrowserRouter, Outlet,RouterProvider } from 'react-router';
import { QueryClient,QueryClientProvider,useQuery  } from '@tanstack/react-query';
import NotFound from './pages/NotFound/NotFound';
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Landing from "./pages/Landing/Landing"
import Login from './login/login';
import SignUp from './signup/signup';

const AppLayout = () => (
  <>
    <div className="top-0 left-0 w-full z-30">
      <NavBar/>
    </div>
    <main className=""> 
      <Outlet />
    </main>
    <Footer />
  </>
);
const queryClient = new QueryClient();
function App() {
  const routes=createBrowserRouter([
    {
      element:<AppLayout/>,
      errorElement:<NotFound/>,
      children:[
        {
          path:"/",
          element:<Landing/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element:<SignUp/>
        },
      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      </QueryClientProvider>
    </>
  )
}

export default App
