import { Routes, Route, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { checkForLoggedInUser } from './utils/auth';

// Components and Pages
// import Home from './pages/Home';
// import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
// import UsersPage from './pages/UsersPage';
// import UserPage from './pages/UserPage';
import NotFoundPage from './pages/NotFoundPage';
// import ResourcesPage from './pages/ResourcesPage';
// import PostsPage from './pages/PostsPage';
// import ForumCategoryPage from './pages/ForumCategoryPage';
// import PostDetailPage from './pages/PostDetailPage';
// import Footer from './components/Footer';
// import SiteHeadingAndNav from './components/SiteHeadingAndNav';

export default function App() {
 // const location = useLocation(); to check current path

  // WHen we establish current user state, we'll use this to check if user is logged in
  // const { setCurrentUser } = useContext(UserContext);

  // useEffect(() => {
  //   checkForLoggedInUser().then(setCurrentUser);
  // }, [setCurrentUser]);

  return (
    <>
      {/* Conditional Nav */}
      {/* We can use the current path to show or hide navigation when we want the navbar to show on every page except certain pages */}
      {/* {location.pathname !== '/' && <SiteHeadingAndNav />} */}
      <main>
        <Routes>
          {/* Basic Routes */}
          {/* {<Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/sign-up" element={<SignUpPage />} />
          {/* <Route path="/resources" element={<ResourcesPage />} /> */}

          {/* Community Pages */}
          {/* <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} /> */}

          {/* Forums */}
          {/* <Route path="/forums/:category" element={<ForumCategoryPage />} /> */}

          {/* Posts */}
          {/* <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} /> */}

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  );
}
