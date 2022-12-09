import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

export default function RegisterFrom() {

    //Use Context in AuthContext
    const { registerUser } = useContext(AuthContext)

    //Local State
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    //Alert for warming
    const [alert, setAlert] = useState(null)

    //Get info form state
    const { username, password, confirmPassword } = registerForm

    //Get change from form
    const onChangeRegisterForm = event => setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })


    //Submit register form
    const register = async event => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setAlert({ type: "danger", message: "Password do not match" })
            setTimeout(() => setAlert(null), 5000)
            return
        }


        try {

            const registerData = await registerUser(registerForm)

            if (registerData.success) {
            } else {
                setAlert({ type: "danger", message: registerData.message })
                setTimeout(() => setAlert(null), 5000)
            }

        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <>
            <Form className='my-4' onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={username}
                        onChange={onChangeRegisterForm}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChangeRegisterForm}
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                        required />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Register
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