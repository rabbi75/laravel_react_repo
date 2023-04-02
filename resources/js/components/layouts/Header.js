import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    const [publicURL, setPublicURL] = useState();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Link to="/">
                    <Navbar.Brand>Task Management</Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/">
                            <Nav.Item className="text-white mr-2">
                                Home
                            </Nav.Item>
                        </Link>
                        <Link to="/projectlist">
                            <Nav.Item className="text-white mr-2">
                                Project List
                            </Nav.Item>
                        </Link>
                        <Link to="/about">
                            <Nav.Item className="text-white mr-2">
                                About
                            </Nav.Item>
                        </Link>
                        <Link to="/contact">
                            <Nav.Item className="text-white mr-2">
                                Contact
                            </Nav.Item>
                        </Link>
                        <Link to="/login">
                            <Nav.Item className="text-white mr-2">
                                Login
                            </Nav.Item>
                        </Link>
                        <Link to="/register">
                            <Nav.Item className="text-white mr-2">
                                Sign Up
                            </Nav.Item>
                        </Link>

                        {/* <Nav.Link href="#">
                            <Link to="/about">About</Link>
                        </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
