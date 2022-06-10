import axios from "axios";

const baseURL = "http://173.212.221.237:39099/api/v1";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
};


const getAllTickets = () => {
    return axios
        .get(baseURL + "/tickets", headers)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const getTicketDetails = (id) => {
    return axios
        .get(`${baseURL}/ticket/${id}`, headers)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const getAllCategories = () => {
    return axios
        .get(baseURL + "/categories", headers)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const updateTicket = (ticketId, categoryId) => {
    const body = {
        "id": ticketId,
        "category": {
            "id": categoryId
        }
    }
    return axios
        .put(baseURL + "/ticket", body)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const updateTicketPriority = (ticketId, priority) => {
    const body = {
        "id": ticketId,
        "priority": priority
    }
    return axios
        .put(baseURL + "/ticket/set-priority", body)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const getNPSDetails = () => {
    return axios
    .get(baseURL + "/nps")
    .then(res => res.data)
    .catch(err => console.log(err));
}

const getTicketCountByCategory = (catName) => {
    return axios
    .get(baseURL + `/ticket-count-by-category?catName=${catName}`)
    .then(res => res.data)
    .catch(err => console.log(err));
}



export {
    getAllTickets,
    getAllCategories,
    getTicketDetails,
    updateTicket,
    updateTicketPriority,
    getNPSDetails,
    getTicketCountByCategory
};
