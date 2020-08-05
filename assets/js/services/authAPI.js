import Axios from "axios";
import jwtDecode from "jwt-decode";
import {LOGIN_API} from "../config";

/**
 * Déconnexion (suppression du token du localstorage et sur axios)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete Axios.defaults.headers["Authorization"];
}

/**
 * Requête HTTP d'authentification et stockage du token dans le storage et sur Axios
 * @param {object} credentials
 * @returns {Promise<AxiosResponse<any>>}
 */
function authenticate(credentials) {
    return Axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            // Stocker le token dans le localStorage
            window.localStorage.setItem("authToken", token);
            // On prévient Axios qu'on a maintenant un header par défaut sur nos futures requêtes HTTP
            setAxiosToken(token);
        });
}

/**
 * Positionne le token jwt sur Axios
 * @param {string} token
 */
function setAxiosToken(token) {
    Axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du cahrgeent de l'applciation
 */
function setup() {
    // 1. Voir si on a un token
    const token = window.localStorage.getItem("authToken");
    // 2. Si le token est encore valide
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
            console.log('connexion établie');
        }
    }
}

/**
 * Permet de savoir si on est authentifié ou pas
 * @returns {boolean}
 */
function isAuthenticated() {
    // 1. Voir si on a un token
    const token = window.localStorage.getItem("authToken");
    // 2. Si le token est encore valide
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        return expiration * 1000 > new Date().getTime();

    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};