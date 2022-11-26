import React from 'react';
import { Button, Form, FormControl, FormGroup, Link } from 'react-bootstrap'
export default function LoginForm() {
    return (
        <div>
            <Form>
                <FormGroup>
                    <FormControl type="text" placeholder='Username' name="username" required />
                </FormGroup>
                <FormGroup>
                    <FormControl type="password" placeholder="Password" name='password' required />
                </FormGroup>
                <Button variant='success' type='submit'>Login</Button>
            </Form>
            <p>Don't have a account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='m1-2' ></Button>
                </Link>
            </p>
        </div>

    )
}