import axios from 'axios'
import AuthService from '../services/AuthService'
import endpoints from './endpoints'
const API = axios.create({
  baseURL: `${endpoints.serverBaseUrl}/`,
})

export default API
