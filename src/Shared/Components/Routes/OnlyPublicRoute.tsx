import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../Redux/Store';
import Navbar from 'src/Shared/Components/Navbar';

interface IPublicRoute {
    children?: React.ReactChild
}

export const OnlyPublicRoute = (props: IPublicRoute) => {
    const auth = useAppSelector(state => state.auth);

    const renderView = () => {
        if (props.children) {
            return props.children
        }
        return <Outlet />
    }

    return (
        <>
            <Navbar/>
            {!auth.isAuthenticated ?
                renderView() :
                <Navigate to="/" replace={true} />
            }
        </>
    )
}