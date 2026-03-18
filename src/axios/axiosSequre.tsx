
import axios from "axios"

// Axios instance
const sequreApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL // .env.local  VITE_BASE_URL
})

// Request interceptor to attach token
sequreApi.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("Token")
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}` // auto attach
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default sequreApi