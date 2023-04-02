import Axios from "axios";

//Store new project
const storeNewProject = async (data) => {
    return await Axios.post("http://localhost:8000/api/project", data).then(
        (res) => {
            //console.log("res", res);
            return res.data;
        }
    );
};

export default storeNewProject;
