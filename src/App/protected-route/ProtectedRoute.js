import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Auth from '../auth/Auth';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={props => {
                if (Auth.isAuthenticated) {
                    return <Component {...props} />
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }} 
        />
    )
};