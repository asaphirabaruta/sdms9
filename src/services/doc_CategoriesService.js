import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/docCategory";

export function getDoc_Categories(){
    return http.get(apiEndpoint); 
}