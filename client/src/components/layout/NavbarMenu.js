import React from 'react'
import { useContext } from 'react'
import { Nav, Navbar, Button } from 'react-bootstrap'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import { Link } from 'react-router-dom'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { AuthContext } from '../../contexts/AuthContext'


const NavbarMenu = () => {

    const {
        authState: {
            user: { username }
        },
        logoutUser
    } = useContext(AuthContext)

    const logout = () => logoutUser()

    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-bolder text-white'>
                <img src={learnItLogo} alt="learnItLogo" width='32' height='32' className='mr-2' />
                Learn It
            </Navbar.Brand>
            <NavbarToggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbr-nav' >
                <Nav className='mr-auto'>
                    <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link} >
                        DashBoard
                    </Nav.Link>
                    <Nav.Link className='font-weight-bolder text-white' to='/about' as={Link} >
                        About
                    </Nav.Link>
                </Nav>
                <Nav.Link className='font-weight-bolder text-white' disabled >
                    Welcome, {username}
                </Nav.Link>
                <Button variant='secondary' className='font-weight-bolder text-white' onClick={logout}>
                    <img src={logoutIcon} alt='logoutIcon' width='32' height='32' className='mr-2' />
                    Logout
                </Button>
            </Navbar.Collapse>
        </Navbar>
    )
    }

    export default NavbarMenu