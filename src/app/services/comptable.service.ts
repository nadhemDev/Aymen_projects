import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api/comptable';

@Injectable({
  providedIn: 'root'
})
export class ComptableService {
  deleteComptable(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  getoperation(): Observable<any> {
    return this.http.get(`${API_URL}/getoperation`);
  }

  addoperation(data: any): Observable<any> {
    return this.http.post(`${API_URL}/storeoperation`, data);
  }

  // Upload file directly to backend
  uploadFile(file: File, id_op: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_op', id_op.toString());
    
    return this.http.post(`${API_URL}/upload`, formData);
  }

  getcomptable(): Observable<any> {
    return this.http.get(`${API_URL}/getcomptable`);
  }

  // ✅ FIXED: Get import history
  getImportHistory(page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get<any>(`${API_URL}/import-history`, {
      params: { 
        page: page.toString(), 
        per_page: perPage.toString() 
      }
    });
  }
}