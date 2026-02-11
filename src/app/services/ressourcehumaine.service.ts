import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// REMOVED SPACE at end
const API_URL = 'http://127.0.0.1:8000/api/ressourcehumaine';

@Injectable({
  providedIn: 'root'
})
export class RessourcehumaineService {

  constructor(private http: HttpClient) {}

  getrh(): Observable<any> {
    console.log('📤 GET request to:', `${API_URL}/getrh`);
    return this.http.get(`${API_URL}/getrh`);
  }

  addrh(data: any): Observable<any> {
    console.log('📤 POST request to:', `${API_URL}/addrh`);
    console.log('📦 POST data:', data);
    return this.http.post(`${API_URL}/addrh`, data);
  }

  updaterh(id: number, data: any): Observable<any> {
    console.log('📤 PUT request to:', `${API_URL}/updaterh/${id}`);
    return this.http.put(`${API_URL}/updaterh/${id}`, data);
  }

  deleterh(id: number): Observable<any> {
    console.log('📤 DELETE request to:', `${API_URL}/deleterh/${id}`);
    return this.http.delete(`${API_URL}/deleterh/${id}`);
  }

  // MOVED INSIDE CLASS - before the closing brace
  importRh(formData: FormData): Observable<any> {
    console.log('📤 IMPORT request to:', `${API_URL}/import`);
    return this.http.post(`${API_URL}/import`, formData);
  }
 getHistory(): Observable<any> {
  return this.http.get(`http://127.0.0.1:8000/api/ressourcehumaine/history`);
}
  
 
} // <-- CLOSING BRACE IS HERE, AFTER importRh