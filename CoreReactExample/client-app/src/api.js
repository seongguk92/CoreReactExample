import axios from "axios";

const api = axios.create({
    baseURL: "/api/",
});
    
export const localApi = {
    department: () => api.get("department")
}