import { Client } from './api'
import axios from 'axios'
import { BASE_URL } from '../globals'

export const setToken = (data) => {
  localStorage.setItem('token_access', data.access)
  localStorage.setItem('token_refresh', data.refresh)
}

export const signInUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/token/`, data)
    // Set the current signed in users token to localStorage
    setToken(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup/`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const checkToken = async (data) => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.post(`/api/token/verify/`, data)
    return (res)
  } catch (error) {
    return ('error', error)
  }
}

export const refreshToken = async (data) => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.post(`/api/token/refresh/`, data)
    setToken(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getCookie = () => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    cookieValue = cookies[0].toString()
    cookieValue = cookieValue.substring(10, cookieValue.length)
  }
  return cookieValue;
}

export const tokenAccessCreator = (token) => {
  let tokenObj = {
    "token": token.access,
  }
  return tokenObj
}

export const tokenRefreshCreator = (token) => {
  let tokenObj = {
    "refresh": token.refresh,
  }
  return tokenObj
}