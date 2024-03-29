import React, { useContext } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { Route, Redirect } from 'react-router-dom'
import NavbarMenu from '../components/layout/NavbarMenu'
import { AuthContext } from '../contexts/AuthContext'


const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    if (authLoading) return (
        <div className='spinner-container'>
            <Spinner animation='border' variant='info' />
        </div>
    )

    return (

        <Route {...rest} render={props => isAuthenticated ?
            (<><NavbarMenu /><Component {...rest} {...props} /></>) : (<Redirect to='/login' />)} />

    )
}

export default ProtectedRoute