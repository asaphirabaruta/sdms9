import http from './httpService';
import jwtDecode from 'jwt-decode';
import { apiUrl } from '../config.json';

const apiEndpoint =  apiUrl +'/staffAuth';

const staffTokenKey = "token";

http.setJwt(getJwt());

export async function login(email, passcode) {
  const { data: jwt } = await http.post(apiEndpoint, { email, passcode });
  localStorage.setItem(staffTokenKey, jwt);
  
}

export function loginWithJwt(jwt) {
  localStorage.setItem(staffTokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(staffTokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(staffTokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(staffTokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};