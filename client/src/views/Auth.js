import React, { useContext } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterFrom from '../components/auth/RegisterFrom';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner'
import { Redirect } from 'react-router-dom';

export default function Auth({ authRoute }) {

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    let body;

    //Dang loading
    if (authLoading)
        body = (
            <div className='d-flex-justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )

    //Authenticated
    else if (isAuthenticated) return <Redirect to='/dashboard' />

    //Not login
    else
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterFrom />}
            </>
        )

    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>Learn It</h1>
                    <h4>Keep track of what you are learning</h4>
                    {body}
                </div>
            </div>
        </div>
    )
}