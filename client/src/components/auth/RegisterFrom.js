import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';

export default function RegisterFrom() {
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Control type='text' placeholder='Username' name='username' required />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Password' name='password' required />
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Confirm password' name='password' required />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Login
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>
                        Login
                    </Button>
                </Link>
            </p>
        </>
    )
}