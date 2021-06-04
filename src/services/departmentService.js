import http from './httpService';
import { apiUrl } from '../config.json';

export function getDepartments(){
    return http.get(apiUrl+"/roles");
}