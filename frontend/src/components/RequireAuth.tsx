import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '@/context/current-user-context';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const { currentUser, isLoading } = useContext(CurrentUserContext);
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>; // Optional loading spinner
    }

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}