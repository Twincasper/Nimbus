import { Routes, Route, useLocation } from 'react-router-dom';
import React, {useState} from 'react';
import { Toaster } from 'react-hot-toast'
// Need to import checkForLoggedInUser function here from auth adapter or some other way to check if user is logged in

// Components and Pages
import Home from '@/pages/Home';
import LoginPage from '@/pages/LoginPage';
import Profile from '@/pages/Profile'

import NotFoundPage from '@/pages/NotFoundPage';

import Navbar from '@/components/Navbar';
import Community from "@/pages/Community.tsx";
import PostDetail from "@/pages/PostDetail.tsx";
import {RequireAuth} from "@/components/RequireAuth.tsx";
import ThemePalettePage from "@/pages/ThemePalettePage.tsx";

export default function App() {
 const location = useLocation();
 const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    // style={{
    //     background: `
    //       linear-gradient(
    //         rgba(0, 0, 0, 0.5),   /* top color with 50% opacity */
    //         rgba(0, 0, 0, 0.5)    /* bottom color with 50% opacity */
    //       ),
    //       url("/adobe-cloud.png")
    //     `,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundAttachment: 'fixed',
    //   }}

    return (
    <div className='flex flex-col min-h-screen bg-base-100' style={{
        backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,0.5)),
      url("/adobe-cloud.png")
    `,
        /* Note how each background-size is separated by a comma */
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        /* Attach both layers if you still want them fixed */
        backgroundAttachment: 'fixed, fixed'
    }}>

        <Toaster
            position="top-right"
            toastOptions={{
                success: {
                    style: {
                        background: 'oklch(var(--su))', // bg-success
                        color: 'oklch(var(--suc))', // bg-success-content
                    },
                    iconTheme: {
                        primary: 'oklch(var(--a))',
                        secondary: 'oklch(var(--ac))',
                    },
                },
                error: {
                    style: {
                        background: 'oklch(var(--er))', // bg-error
                        color: 'oklch(var(--erc))', // bg-error-content
                    },
                    iconTheme: {
                        primary: 'red',
                        secondary: 'white',
                    },
                },
            }}
        />

      {location.pathname !== '/login' &&  <Navbar onSelectCategory={setSelectedCategoryId} />}
      <main className={location.pathname === '/profile' ? 'mx-auto' : 'flex-grow'}>
          <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/palette" element={<ThemePalettePage />} />

              {/* Protected Routes */}
              <Route path="/profile" element={
                  <RequireAuth>
                      <Profile />
                  </RequireAuth>
              } />
              <Route path="/community" element={
                  <RequireAuth>
                      <Community />
                  </RequireAuth>
              } />
              <Route path="/community/:categoryId" element={
                  <RequireAuth>
                      <Community />
                  </RequireAuth>
              } />
              <Route path="/posts/:id" element={
                  <RequireAuth>
                      <PostDetail />f
                  </RequireAuth>
              } />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </main>
    </div>
  );
}
