import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
};


const getAllTickets = () => {
    return axios
    .get("http://173.212.221.237:39099/api/v1/tickets", headers)
    .then(res => res.data)
    .catch(err => console.log(err));
}

const getTicketDetails = (id) => {
    return axios
    .get(`http://173.212.221.237:39099/api/v1/ticket/${id}`, headers)
    .then(res => res.data)
    .catch(err => console.log(err));
}

const getAllCategories = () => {
    return axios
    .get("http://173.212.221.237:39099/api/v1/categories", headers)
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
    .put("http://173.212.221.237:39099/api/v1/ticket", body)
    .then(res => res.data)
    .catch(err => console.log(err));
}

const updateTicketPriority = (ticketId, priority) => {
    const body = {
        "id": ticketId,
        "priority": priority
    }
    return axios
    .put("http://173.212.221.237:39099/api/v1/ticket/set-priority", body)
    .then(res => res.data)
    .catch(err => console.log(err));
}

export {
    getAllTickets,
    getAllCategories,
    getTicketDetails,
    updateTicket,
    updateTicketPriority
};
