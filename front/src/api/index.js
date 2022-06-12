import axios from 'axios'

export default class api {
  static async get (url) {
    return await axios.get(url)
      .then(response => (response.data))
      .catch(error => (console.log(error.toJSON())))
  }
  
  static async post (url, data) {
    return await axios.post(url, data)
      .then(response => (response.data))
      .catch(error => (console.log(error.toJSON())))
  }
  
  static async update (url, data) {
    return await axios.put(url, data)
      .then(response => (response.data))
      .catch(error => (console.log(error.toJSON())))
  }
  
  static async destroy (url) {
    return await axios.delete(url)
      .then(response => (response.data))
      .catch(error => (console.log(error.toJSON())))
  }
}


