import axios from 'axios'

const isProduction = process.env.NODE_ENV === "production";

let baseURL = "http://localhost:8000";

if (isProduction) {
  baseURL = "https://deploy-is-production.up.railway.app";
}

const registersApi = axios.create({
  baseURL: baseURL,
  responseType: 'json',
  withCredentials: true
});



export const getAllRegister = () => registersApi.get('/')

export const getRegister  = (id) => registersApi.get(/${id}/)

export const createRegisterClient = (data) => registersApi.post('/users/api/v1/clients/', data)

export const createRegisterRent = (data) => registersApi.post('/rents/rents/', data)

export const createRegisterFriend = (data) => registersApi.post('/users/api/v1/friends/', data)

export const getFriends = (data) => registersApi.get('/users/api/v1/friends/')

export const getClient = (data) => registersApi.get('/users/api/v1/clients/')

export const createLikes = (data) => registersApi.post('/users/api/v1/user_tastes/', data)

export const deleteRegister = (id) => registersApi.delete(/${id}/)

export const updateRegister = (id, date) => registersApi.put(/${id}/, date)

export const getLikes = () => registersApi.get('/users/api/v1/likes/')

export const getOutfit = () => registersApi.get('/rents/outfits/')

export const getEvent = () => registersApi.get('/rents/events/')

export const getRent = () =>  registersApi.get('/rents/rents/')

export const deleteRent = (id) => registersApi.delete(`/rents/rents/${id}/`)

export const getPrice =  () => registersApi.get("/rents/price/")

export const get_likes_user = (id) => registersApi.post('/users/api/v1/user_tastes/get_likes_user/', id)

export const create_notification = (id) => registersApi.post('/notificacionesInterno/notiIn/', id)

export const get_notifications_user = (id) => registersApi.get(`/notificacionesInterno/notiIn/${id}`)

export const update_notifications_user = (id) => registersApi.patch(`/notificacionesInterno/notiIn/${id}/`)

export const delete_notifications_user = (id) => registersApi.delete(`/notificacionesInterno/notiIn/${id}/`)

export const validarLogin = (id) => registersApi.get('/users/login/', data)

/* export const getTime = (id) => registersApi.get(`/rents/time_elapsed/${id}/`) */