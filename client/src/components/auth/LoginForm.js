import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';


const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext)

    //Local State
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    const [alert, setAlert] = useState(null)

    const { username, password } = loginForm



    const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    //Check login de vao homepgae
    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {

            } else {
                setAlert({ type: "danger", message: loginData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form className='my-4' onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChangeLoginForm}
                        required

                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>
                        Register
                    </Button>
                </Link>
            </p>
        </>
    )
}
export default LoginForm;