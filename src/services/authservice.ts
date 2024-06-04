import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

export const signup = (email: string, password: string) => {
    return axios.post(`${API_URL}/signup`, { email, password });
};
