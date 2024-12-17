import { useState, useContext } from "react";
import CurrentUserContext from '../context/current-user-context';

export default function Home() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <>
     {/* Hero Section, or perhaps a generic banner to signify this is the home page. Something welcoming to serve as a general hub for the website */}
      <h1>Home Page</h1>
      {currentUser && <p>Welcome, {currentUser.name}</p>}
    </>
  )
}