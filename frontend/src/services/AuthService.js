import axios from 'axios'
import API_BASE_URL from '../config/api'

const authURL = `${API_BASE_URL}/auth`

const register = async (userData) => {
  const response = await axios.post(authURL + '/register', userData)
  return response.data
}

const login = async (userData) => {
  const response = await axios.post(authURL + '/login', userData)
  return response.data
}

const authService = {
  register,
  login
}

export default authService
