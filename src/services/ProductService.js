import { API, endpoints } from '../api'

class ProductService {
  static createProduct(product) {
    return API.post(endpoints.api.product.create, product)
  }
  static updateProduct(id, product) {
    return API.put(endpoints.api.product.update + id, product)
  }
  static deleteProduct(id) {
    return API.delete(endpoints.api.product.delete + id)
  }
  static fetchOneProduct(id) {
    if (!id) Promise.reject('Id required')
    return API.get(endpoints.api.product.getOne + id)
  }
  static getAllProducts(query) {
    let url = endpoints.api.product.getAll
    if (query) url += query
    return API.get(url)
  }
}

export default ProductService
