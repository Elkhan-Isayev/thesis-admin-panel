import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
};


const getAllTickets = () => {
    return axios
    .get("http://localhost:8084/api/v1/tickets", headers)
    .then(res => res.data)
    .catch(err => console.log(err));
}

const getAllCategories = () => {
    return axios
    .get("http://localhost:8084/api/v1/categories", headers)
    .then(res => res.data)
    .catch(err => console.log(err));
}

export {
    getAllTickets,
    getAllCategories
};