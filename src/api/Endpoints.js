//firstly hi file create krne export default tyt serverBaseUrl:"http://localhost:2020" ghycha
export default {
  serverBaseUrl: 'http://localhost:5000',
  api: {
    users: {
      create: '/users',
      update: '/users/',
      delete: '/users/',
      getOne: '/users/',
      getAll: '/users',
    },
    product: {
      create: '/products',
      update: '/products/',
      delete: '/products/',
      getOne: '/products/',
      getAll: '/products',
    },
  },
}
