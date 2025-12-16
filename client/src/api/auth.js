import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

  export async function login(email, password) {
    return axios.post(`${API_BASE}/auth/login`, { email, password });
  }
  
  export async function signup(email, password) {
    return axios.post(`${API_BASE}/auth/signup`, { email, password });
  }