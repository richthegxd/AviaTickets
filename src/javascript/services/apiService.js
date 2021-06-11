import axios from "axios";
import config from "../config/apiConfing.js";

// Эндпоинты api:
// /countries - получения списка всех стран (массив)
// /cities - получения списка доступных городов (массив)
// /prices/cheap - получение доступных билетов (массив)

class Api {
    constructor(config) {
        this.url = config.url;
    }
    async countries() {
        try {
            const res = await axios.get(`${this.url}/countries`);
            return res.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
    async cities() {
        try {
            const res = await axios.get(`${this.url}/cities`);
            return res.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
    async prices(params) {
        try {
            const res = await axios.get(`${this.url}/prices/cheap`, {
                params
            });
            return res.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
    async airlines() {
        try {
            const res = await axios.get(`${this.url}/airlines`);
            return res.data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
}

const api = new Api(config);

export default api;
