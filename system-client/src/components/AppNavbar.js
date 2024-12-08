import { useContext, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';



export default function AppNavbar(){

    const { user } = useContext(UserContext);

    return(
         <Navbar expand="lg" className="bg-body-tertiary sticky-top shadow">
            <Container fluid className='d-flex justify-content-between' style={{marginLeft: '100px', marginRight: '100px'}}>
                <Navbar.Brand href="/">
                    <img
                        src="./UA-Logo.png"
                        className="img-fluid"
                        style={{ maxWidth: '300px', maxHeight: '70px' }}
                        alt="UA Logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{
                    border: 'none',
                    boxShadow: 'none',
                }}
                />

                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="d-flex gap-4 ms-auto align-items-center">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/courses">Courses</Nav.Link>

                        {user.id !== null ?
                            user.isAdmin ? 
                                <>
                                    <Nav.Link as={Link} to="/add-course">Add Course</Nav.Link>
                                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                    
                                    {/* Larger Screen Size */}
                                    <Nav.Link as={Link} to="/details" className='d-none d-lg-block'>
                                        <i className="fa-regular fa-user"></i>
                                    </Nav.Link>

                                    {/* Smaller Screen Size */}
                                    <Nav.Link as={Link} to="/details" className='d-block d-lg-none'>
                                        Profile
                                    </Nav.Link>
                                </> 
                                : 
                                <>
                                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                    {/* Larger Screen Size */}
                                    <Nav.Link as={Link} to="/details" className='d-none d-lg-block'>
                                        <i className="fa-regular fa-user"></i>
                                    </Nav.Link>

                                    {/* Smaller Screen Size */}
                                    <Nav.Link as={Link} to="/details" className='d-block d-lg-none'>
                                        Profile
                                    </Nav.Link>
                                </>
                                
                            : 
                            <>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                
                                {/* Larger Screen Size */}
                                <Nav.Link as={Link} to="/login"className="d-none d-lg-block text-center"
                                style={{
                                    backgroundColor: '#002366',
                                    color: 'white',
                                    width: '120px',
                                    height: '50px',
                                    fontSize: '14px',
                                    lineHeight: '32px',
                                    borderRadius: '5px',
                                    fontWeight: 400,
                                    textDecoration: 'none',
                                }}> Login </Nav.Link>

                                {/* Smaller Screen Size */}
                                <Nav.Link as={Link} to="/login" className="d-block d-lg-none"> Login </Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>    
        </Navbar>


    )
}