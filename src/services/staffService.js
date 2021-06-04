import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint =  apiUrl +'/staffs';

export function getStaffs(){
    return http.get(apiEndpoint); 
}

export function addStaffs(staff){    
    return http.post(apiEndpoint, staff);
}

export function updateStaffs(staff_id){    
    // return http.post(apiEndpoint, staff);
}

export function deleteStaffs(id){    
    return http.delete(`${apiEndpoint}/${id}`);
}

export function getStaff(staff_id){    
    // return http.post(apiEndpoint, staff);
}