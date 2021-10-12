import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:56386/api/",
});

export const localApi = {
    department: () => api.get("department")
}