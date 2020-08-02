import axios from 'axios';
import Axios from "axios";

function findAll() {
    return axios
        .get("http://127.0.0.1:8000/api/invoices")
        .then(response => response.data['hydra:member'])
}

function deleteInvoice(id) {
    return axios
        .delete("http://127.0.0.1:8000/api/invoices/" + id)
}

function find(id) {
    return Axios.get("http://localhost:8000/api/invoices/" + id).then(response => response.data);
}

function update(id, invoice) {
    return Axios.put("http://localhost:8000/api/invoices/" + id, {
        ...invoice,
        customer: `/api/customers/${invoice.customer}`
    });
}

function create(invoice) {
    return Axios
        .post("http://localhost:8000/api/invoices",
            {...invoice, customer: `/api/customers/${invoice.customer}`})
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteInvoice
};