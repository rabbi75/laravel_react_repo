import { Card, Button, Badge, Spinner } from "react-bootstrap";

import React, { Component } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

export default class ViewProject extends Component {
    state = {
        project: {},
        taskList: [],
        isLoading: false,
    };

    componentDidMount() {
        console.log(this.props);
        // call an api and update projects to that
        this.getProjectLists();
    }

    getProjectLists = () => {
        this.setState({
            isLoading: true,
        });
        Axios.get("http://localhost:8000/api/project").then((res) => {
            //console.log("res", res);
            const taskList = res.data.data;
            //console.log("projectList", projectList );
            this.setState({
                taskList,
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
                            Test Project{" "}
                            <Badge bg="primary">
                                {this.state.taskList.length}
                            </Badge>
                        </h2>
                    </div>
                    <div className="float-right">
                        <Link to="/addProject" className="btn btn-info">
                            + Create New Task
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
                {this.state.taskList.map((task, index) => (
                    <Card className="mt-2" key={index}>
                        <Card.Header>
                            {task.name}{" "}
                            <Badge bg="primary">{task.tasks_count}</Badge>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{task.description}</Card.Text>
                            {/* <Button variant="primary" className="mr-2">
                                View
                            </Button>
                            <Button variant="success" className="mr-2">
                                Edit
                            </Button>
                            <Button variant="danger" className="mr-2">
                                Delete
                            </Button> */}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        );
    }
}

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Axios from "axios";

// export default function viewProject() {
//     const [project, setProject] = useState({});
//     const [tasklist, setTasklist] = useState([]);
//     const [isLoading, setIsloading] = useState(false);
//     const { id } = useParams();
//     console.log(id);
//     useEffect(() => {
//         getProjectLists();
//     }, []);
//     getProjectLists = () => {
//         this.setState({
//             isLoading: true,
//         });
//         Axios.get("http://localhost:8000/api/project").then((res) => {
//             //console.log("res", res);
//             const taskList = res.data.data;
//             //console.log("projectList", projectList );
//             this.setState({
//                 taskList,
//                 isLoading: false,
//             });
//         });
//     };
//     return (
//         <div>
//             <h1>Test paramas</h1>
//         </div>
//     );
// }
