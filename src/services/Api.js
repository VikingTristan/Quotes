import axios from "axios";
const APIUrl = process.env.API || "/api";
export default () => {
    return axios.create({
        baseURL: APIUrl,
        withCredentials: true,
        // headers: {"X-Requested-With": "XMLHttpRequest"},
    });
};