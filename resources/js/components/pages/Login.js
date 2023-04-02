import { Card, Button, Badge, Spinner, Form, Alert } from "react-bootstrap";

import React, { Component } from "react";
import { LoginUser } from "../../services/AuthService";

export default class Login extends Component {
    state = {
        isLoading: false,
        email: "",
        password: "",
        errors: {},
        errorMessage: "",

        validated: false,
    };

    componentDidMount() {}

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    submitForm = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({
            validated: true,
        });
        const postBody = {
            email: this.state.email,
            password: this.state.password,
        };

        if (form.checkValidity() !== false) {
            e.preventDefault();
            this.setState({
                isLoading: true,
            });
            const response = await LoginUser(postBody);
            console.log("response", response);
            if (response.success) {
                //alert("Project Added");
                this.setState({
                    email: "",
                    password: "",
                    isLoading: false,
                    errors: {},
                    errorMessage: "",
                });
                localStorage.setItem("loginData", JSON.stringify(response));
            } else {
                this.setState({
                    errors: response.errors,
                    isLoading: false,
                    errorMessage: response.message,
                });
                localStorage.setItem("loginData", null);
            }
        }
    };

    render() {
        return (
            <>
                <div className="header-part mt-4">
                    <div className="float-left">
                        <h2>Sign In</h2>
                    </div>
                    <div className="clearfix"></div>
                </div>

                <Card>
                    <Card.Body>
                        {this.state.errorMessage.length > 0 && (
                            <Alert
                                variant="danger"
                                onClose={() =>
                                    this.setState({ errorMessage: "" })
                                }
                                dismissible
                            >
                                {this.state.errorMessage}
                            </Alert>
                        )}

                        <Form
                            noValidate
                            validated={this.state.validated}
                            onSubmit={this.submitForm}
                        >
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <Form.Group controlId="email">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Enter Email Address"
                                            value={this.state.email}
                                            name="email"
                                            onChange={(e) =>
                                                this.changeInput(e)
                                            }
                                        />
                                        {this.state.errors &&
                                            this.state.errors.email && (
                                                <p className="text-danger">
                                                    {this.state.errors.email[0]}
                                                </p>
                                            )}
                                        <Form.Control.Feedback type="invalid">
                                            Please give your valid email address
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Enter Password"
                                            value={this.state.password}
                                            name="password"
                                            onChange={(e) =>
                                                this.changeInput(e)
                                            }
                                            minLength={6}
                                        />
                                        {this.state.errors &&
                                            this.state.errors.password && (
                                                <p className="text-danger">
                                                    {
                                                        this.state.errors
                                                            .password[0]
                                                    }
                                                </p>
                                            )}
                                        <Form.Control.Feedback type="invalid">
                                            Please give password
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>

                            {this.state.isLoading && (
                                <Button
                                    variant="success mt-2"
                                    type="button"
                                    disabled
                                >
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </Spinner>{" "}
                                    Signing In...
                                </Button>
                            )}

                            {!this.state.isLoading && (
                                <Button variant="success mt-2" type="submit">
                                    Sign In
                                </Button>
                            )}
                        </Form>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
