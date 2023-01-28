import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../Redux/Store';

interface IPublicRoute {
    children?: React.ReactChild
}

export const PrivateRoute = (props: IPublicRoute) => {
    const auth = useAppSelector(state => state.auth);

    const renderView = () => {
        if (props.children) {
            return props.children
        }
        return <Outlet />
    }

    return (
        <>
            {auth.isAuthenticated ?
                renderView() :
                <Navigate to="/" replace={true} />
            }
        </>
    )
}