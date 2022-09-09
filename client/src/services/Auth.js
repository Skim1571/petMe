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
    return ('access token still valid')
  } catch (error) {
    throw error
  }
}

export const refreshToken = async (data) => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.post('/api/token/refresh/', data)
    return res.data
  } catch (error) {
    throw error
  }
}