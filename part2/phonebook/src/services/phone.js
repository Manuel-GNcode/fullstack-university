import axios from 'axios'

const urlBase = 'http://localhost:3000/persons/'

const getAll = () => {
  const request = axios.get(urlBase)
  return request.then(response => response.data)
}

const create = (phone) => {
  const request = axios.post(urlBase, phone)
  return request.then(response => response.data)
}

const deleteById = id => {
  const request = axios.delete(urlBase + id)
  return request.then(response => response.data)
}

const update = (id, phone) => {
  const request = axios.put(urlBase + id, phone)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  deleteById,
  update
}