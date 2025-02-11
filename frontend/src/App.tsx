import { Routes, Route, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import CurrentUserContext from './context/current-user-context';
import React from 'react';
// Need to import checkForLoggedInUser function here from auth adapter or some other way to check if user is logged in

// Components and Pages
import Home from '@/pages/Home';
import LoginPage from '@/pages/LoginPage';
import Profile from '@/pages/Profile'
import Footer from '@/components/Footer';

import NotFoundPage from '@/pages/NotFoundPage';

import Navbar from '@/components/Navbar';
import Community from "@/pages/Community.tsx";
import PostDetail from "@/pages/PostDetail.tsx";

export default function App() {
 const location = useLocation();

    const { currentUser } = useContext(CurrentUserContext);

  // useEffect(() => {
  //   checkForLoggedInUser().then(setCurrentUser);
  // }, [setCurrentUser]);

  return (

    <div className='flex flex-col min-h-screen'>

      {location.pathname !== '/login' &&  <Navbar profilePicture={currentUser?.profilePicture} />}
      <main className={location.pathname === '/profile' ? 'mx-auto' : 'flex-grow'}>
        <Routes>
          {/* Basic Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />

          {/* Community Pages */}
          <Route path="/community" element={<Community />} />
          {/* <Route path="/users/:id" element={<UserPage />} /> */}

          {/* Forums */}
          {/* <Route path="/forums/:category" element={<ForumCategoryPage />} /> */}

          {/* Posts */}
          <Route path="/posts/:id" element={<PostDetail />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
