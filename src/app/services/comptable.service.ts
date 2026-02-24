import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ❌ DELETE THIS LINE:
// const API_URL = 'http://127.0.0.1:8000/api/comptable ';

@Injectable({
  providedIn: 'root'
})
export class ComptableService {
  
  // ✅ USE THIS INSTEAD:
  private apiUrl = `${environment.apiUrl}/comptable`;

  constructor(private http: HttpClient) {}

  // ===============================
  // OPERATIONS
  // ===============================

  getoperation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getoperation`);
  }

  addoperation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/storeoperation`, data);
  }

  uploadFile(file: File, id_op: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_op', id_op.toString());

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // ===============================
  // COMPTABLE CRUD
  // ===============================

  getcomptable(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getcomptable`);
  }

  updateComptable(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  deleteComptable(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // ===============================
  // IMPORT HISTORY
  // ===============================

  getImportHistory(page: number = 1, perPage: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/import-history`, {
      params: {
        page: page.toString(),
        per_page: perPage.toString()
      }
    });
  }
}