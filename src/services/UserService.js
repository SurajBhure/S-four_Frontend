import { API, endpoints } from '../api'
class UserService {
  static createUser(user) {
    return API.post(endpoints.api.users.create, user)
  }
  static updateUser(id, user) {
    return API.put(endpoints.api.users.update + id, user)
  }
  static deleteUser(id) {
    return API.delete(endpoints.api.users.delete + id)
  }
  static fetchOneUser(id) {
    if (!id) Promise.reject('Id required')
    return API.get(endpoints.api.users.getOne + id)
  }
  static fetchAllUser(query) {
    let url = endpoints.api.users.getAll
    if (query) url += query
    return API.get(url)
  }
}
export default UserService
