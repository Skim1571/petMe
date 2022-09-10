import { Client } from './api'

export const signInUser = async (data) => {
  try {
    const res = await Client.post(`/api/token/`, data)
    // Set the current signed in users token to localStorage
    await localStorage.setItem('token_access', res.data.access)
    await localStorage.setItem('token_refresh', res.data.refresh)
    return res.data
  } catch (error) {
    throw error
  }
}

export const registerUser = async (data) => {
  try {
    const res = await Client.post(`/signup/`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const checkToken = async (data) => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.post('/api/token/verify/', data)
    return (res.data)
  } catch (error) {
    return ('error', error)
    throw error
  }
}

export const refreshToken = async (data) => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.post('/api/token/refresh/', data)
    await localStorage.setItem('token_access', res.data.access)
    await localStorage.setItem('token_refresh', res.data.refresh)
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
    "headers": { 'X-Requested-With': 'XMLHttpRequest', 'X-CSRFToken': getCookie(), 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
  }
  return tokenObj
}

export const tokenRefreshCreator = (token) => {
  let tokenObj = {
    "refresh": token.refresh,
    "headers": { 'X-Requested-With': 'XMLHttpRequest', 'X-CSRFToken': getCookie(), 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
  }
  return tokenObj
}