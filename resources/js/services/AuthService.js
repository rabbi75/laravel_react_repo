import Axios from "axios";

//Store new user
export const registerUser = async (data) => {
    return await Axios.post(
        "http://localhost:8000/api/auth/register",
        data
    ).then((res) => {
        //console.log("res", res);
        return res.data;
    });
};

//login
export const LoginUser = async (data) => {
    return await Axios.post("http://localhost:8000/api/auth/login", data).then(
        (res) => {
            //console.log("res", res);
            return res.data;
        }
    );
};
