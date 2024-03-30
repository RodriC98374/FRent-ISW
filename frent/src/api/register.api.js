import axios from 'axios'

const registersApi = axios.create({
    baseURL: "http://localhost:8000/",
    responseType: 'json',
    withCredentials: true
});


export const getAllRegister = () => registersApi.get('/')

export const getRegister  = (id) => registersApi.get(/${id}/)

export const createRegisterClient = (data) => registersApi.post('/users/clients/', data)


export const createRegisterFriend = (data) => registersApi.post('/users/api/v1/friends/', data)

export const getFriends = (data) => registersApi.get('/users/api/v1/friends/')

export const createLikes = (data) => registersApi.post('/users/api/v1/user_tastes/', data)

export const deleteRegister = (id) => registersApi.delete(/${id}/)

export const updateRegister = (id, date) => registersApi.put(/${id}/, date)