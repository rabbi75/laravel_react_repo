import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { Container } from "react-bootstrap";
import ProjectList from "./pages/projects/ProjectList";
import CreateProject from "./pages/projects/CreateProject";
import ViewProject from "./pages/projects/viewProject";
import Register from "./pages/Register";
import Login from "./pages/Login";

class App extends React.Component {
    // state = {};

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route
                                path="/projectlist"
                                element={<ProjectList />}
                            />
                            <Route
                                path="/addProject"
                                element={<CreateProject />}
                            />
                            <Route
                                path="/viewProject/:id"
                                element={<ViewProject />}
                            />
                            <Route path="register" element={<Register />} />
                            <Route path="login" element={<Login />} />
                        </Routes>
                        <Footer />
                    </Container>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
