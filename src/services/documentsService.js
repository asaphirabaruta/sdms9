import http from './httpService';
import { apiUrl } from '../config.json';
import axios from 'axios';

const apiEndpoint = apiUrl +'/documents';

export function getDocuments(){
    return http.get(apiEndpoint); 
}

export function getOneDocument(id){
    
   return axios(`${apiEndpoint}/${id}`, {
      method: "get",
      responseType: "blob"      
    }) 
}

export function addDocument(document){    
    return http.post(apiEndpoint, document);
}

export function getMyDocuments(){
    return http.get(apiEndpoint +"/me");
}

export function getMyPassport(){
    return http.get(apiEndpoint +"/myPassport")
}

export function deleteDocument(id){    
    return http.delete(`${apiEndpoint}/${id}`);
}