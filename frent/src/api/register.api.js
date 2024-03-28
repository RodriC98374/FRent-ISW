import axios from 'axios'

const registersApi = axios.create({
    baseURL: "http:/localhost:8001/api" 
})


export const getAllRegister = () => registersApi.get('/')

export const getRegister  = (id) => registersApi.get(`/${id}/`)

export const createRegister = (date) => registersApi.post('/', date)

export const deleteRegister = (id) => registersApi.delete(`/${id}/`)

export const updateRegister = (id, date) => registersApi.put(`/${id}/`, date)