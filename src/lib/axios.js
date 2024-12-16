import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:7006/api",
    withCredentials: true,
});
