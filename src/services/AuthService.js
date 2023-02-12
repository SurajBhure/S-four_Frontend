import API from '../api/API'
import endpoints from '../api/endpoints'

class AuthService {
  static userLogin(user) {
    return API.post(endpoints.api.auth.create, user)
  }
  static validateToken() {
    return API.post(endpoints.api.auth.validateToken, {})
  }
  //this method returns promise
  static refreshToken() {
    //get access token from sessionstorage
    const refresh = sessionStorage.getItem('refresh')
    //if in sessionstorage refresh token is not available then rejected promise
    if (!refresh) return Promise.reject('Token not available')
    //if token available then pass it while accessing refreshToken api
    return API.post(endpoints.api.auth.refreshToken, { refresh })
  }
}
export default AuthService
