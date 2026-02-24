import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RessourcehumaineService {
  
  // ✅ Environment-based URL
  private apiUrl = `${environment.apiUrl}/ressourcehumaine`;

  constructor(private http: HttpClient) {}

  getrh(): Observable<any> {
    console.log('📤 GET request to:', `${this.apiUrl}/getrh`);
    return this.http.get(`${this.apiUrl}/getrh`);
  }

  addrh(data: any): Observable<any> {
    console.log('📤 POST request to:', `${this.apiUrl}/addrh`);
    console.log('📦 POST data:', data);
    return this.http.post(`${this.apiUrl}/addrh`, data);
  }

  updaterh(id: number, data: any): Observable<any> {
    console.log('📤 PUT request to:', `${this.apiUrl}/updaterh/${id}`);
    return this.http.put(`${this.apiUrl}/updaterh/${id}`, data);
  }

  deleterh(id: number): Observable<any> {
    console.log('📤 DELETE request to:', `${this.apiUrl}/deleterh/${id}`);
    return this.http.delete(`${this.apiUrl}/deleterh/${id}`);
  }

  importRh(formData: FormData): Observable<any> {
    console.log('📤 IMPORT request to:', `${this.apiUrl}/import`);
    return this.http.post(`${this.apiUrl}/import`, formData);
  }

  getHistory(): Observable<any> {
    console.log('📤 GET request to:', `${this.apiUrl}/history`);
    return this.http.get(`${this.apiUrl}/history`);
  }
}