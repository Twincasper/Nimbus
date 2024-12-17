import { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from '../context/current-user-context';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <h1>Sign Up Page</h1>
  )
}