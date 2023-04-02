import { Form, Button } from "react-bootstrap";

import React, { Component } from "react";
import { Link } from "react-router-dom";
import storeNewProject from "../../../services/ProjectService";

export default class CreateProject extends Component {
    state = {
        isLoading: false,
        name: "",
        description: "",
        errors: {},
    };

    componentDidMount() {}

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    onSubmitForm = async (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true,
        });
        const postBody = {
            name: this.state.name,
            description: this.state.description,
            user_id: 1,
        };
        const response = await storeNewProject(postBody);
        //console.log("response", response);
        if (response.success) {
            //alert("Project Added");
            this.setState({
                name: "",
                description: "",
                isLoading: false,
            });
        } else {
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
        }
    };

    render() {
        return (
            <div>
                <div className="header-part mt-4">
                    <div className="float-left">
                        <h2>New Project </h2>
                    </div>
                    <div className="float-right">
                        <Link to="/projectlist" className="btn btn-info">
                            See All Project
                        </Link>
                    </div>
                </div>
                <div className="clearfix"></div>

                <Form onSubmit={this.onSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Enter Project Name"
                            value={this.state.name}
                            onChange={(e) => this.changeInput(e)}
                        />
                    </Form.Group>
                    {this.state.errors && this.state.errors.name && (
                        <p className="text-danger">
                            {this.state.errors.name[0]}
                        </p>
                    )}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project description</Form.Label>
                        <Form.Control
                            name="description"
                            type="text"
                            placeholder="Enter Project Description"
                            as="textarea"
                            rows={5}
                            value={this.state.description}
                            onChange={(e) => this.changeInput(e)}
                        />
                    </Form.Group>
                    {this.state.errors && this.state.errors.description && (
                        <p className="text-danger">
                            {this.state.errors.description[0]}
                        </p>
                    )}
                    {this.state.isLoading && (
                        <Button variant="primary" type="submit" disabled>
                            Saveing...
                        </Button>
                    )}
                    {!this.state.isLoading && (
                        <Button variant="primary" type="submit">
                            Save Project
                        </Button>
                    )}
                </Form>
            </div>
        );
    }
}
