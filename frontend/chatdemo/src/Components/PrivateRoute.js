import {
    Navigate,
    RouteProps,
} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getCurrentUser } from '../Store/Slice/authSlice';
import { useEffect } from 'react';

export function PrivateRoute({ children }) {
    const token=localStorage.getItem("token")
    const dispatch=useDispatch()
    const { isAuthenticated } = useSelector((state) => state.user)

    return (
        <>
            {token
                ? children
                : <Navigate to="/login" />
            }
        </>
    );
}