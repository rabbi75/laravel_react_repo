import { Card, Button, Badge, Spinner } from "react-bootstrap";

import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class ProjectList extends Component {
    state = {
        projectList: [],
        isLoading: false,
    };

    componentDidMount() {
        // call an api and update projects to that
        this.getProjectLists();
    }

    getProjectLists = () => {
        this.setState({
            isLoading: true,
        });
        Axios.get("http://localhost:8000/api/project").then((res) => {
            //console.log("res", res);
            const projectList = res.data.data;
            //console.log("projectList", projectList );
            this.setState({
                projectList,
                isLoading: false,
            });
        });
    };

    render() {
        //console.log("coming render");
        return (
            <div>
                <div className="header-part mt-4">
                    <div className="float-left">
                        <h2>
                            Project list{" "}
                            <Badge bg="primary">
                                {this.state.projectList.length}
                            </Badge>
                        </h2>
                    </div>
                    <div className="float-right">
                        <Link to="/addProject" className="btn btn-info">
                            + Create New
                        </Link>
                    </div>
                </div>
                <div className="clearfix"></div>
                {this.state.isLoading && (
                    <div className="text-center">
                        <Spinner
                            variant="primary"
                            animation="border"
                            role="status"
                        >
                            <span className="sr-only">Loading..</span>
                        </Spinner>
                    </div>
                )}
                {this.state.projectList.map((project, index) => (
                    <Card className="mt-2" key={index}>
                        <Card.Header>
                            {project.name}{" "}
                            <Badge bg="primary">{project.tasks_count}</Badge>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{project.description}</Card.Text>
                            <Link
                                className="btn btn-primary mr-2"
                                to={"/viewproject/" + project.id}
                            >
                                View
                            </Link>
                            <Button variant="success" className="mr-2">
                                Edit
                            </Button>
                            <Button variant="danger" className="mr-2">
                                Delete
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        );
    }
}
