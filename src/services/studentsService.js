import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint =  apiUrl +'/students';

export function getStudents(){
    return http.get(apiEndpoint); 
}