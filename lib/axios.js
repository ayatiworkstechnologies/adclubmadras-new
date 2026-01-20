// lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://admin.adclubmadras.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
