import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pivot } from '../home/Models/Pivot';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Projets
  getProjets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projet/getprojet`);
  }

  addProjet(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projet/addprojet`, data);
  }

  updateProjet(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/projet/updateprojet/${id}`, data);
  }

  deleteProjet(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projet/deleteprojet/${id}`);
  }



  // Postes
  getPostes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getposte`);
  }

  addPoste(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addposte`, data);
  }

  // Activités
  getActivites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projet/getactivite`);
  }

  addActivite(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projet/addactivite`, data);
  }

  getCollaborateur(annee: number): Observable<Pivot[]> {
    return this.http.get<Pivot[]>(`${this.baseUrl}/projetdetail/getcollaborateur`);
  }
  addCollaborateur(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projetdetail/addcollaborateur`, data);
  }
  updateCollaborateur(id: number, data: Pivot): Observable<any> {
    return this.http.put(`${this.baseUrl}/projetdetail/updatecollaborateur/${id}`, data);
  }

  getCollaborateursByProject(projectId: number) {
    return this.http.get<any>(`${this.baseUrl}/projetdetail/collaborateurs/${projectId}`);
  }
  
  
}
