import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterFrom from '../components/auth/RegisterFrom';

export default function Auth({ authRoute }) {

    let body;

    body = (
        <div>
            LearnIt
            {authRoute === 'login' && <LoginForm />}
            {authRoute === 'register' && <RegisterFrom />}

        </div>

    )

    return (

        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>LearnIt</h1>
                    <h4>Keep track of what you are learning</h4>
                    <body />
                    {body}
                </div>
            </div>
        </div>
    )
}