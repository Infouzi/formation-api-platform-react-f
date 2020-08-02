import axios from 'axios';
import Axios from "axios";

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/customers")
        .then(response => response.data['hydra:member'])
}

function deleteCustomer(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/customers/" + id)
}

function find(id) {
    return Axios
        .get("http://localhost:8000/api/customers/" + id)
        .then(response => response.data)
}

function update(id, customer) {
    return Axios.put("http://localhost:8000/api/customers/" + id, customer);
}

function create(customer) {
    return Axios.post("http://localhost:8000/api/customers", customer)
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteCustomer
};