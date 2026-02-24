import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // ✅ ADD THIS

@Injectable({
  providedIn: 'root'
})
export class ParametrageService {
  
  // ✅ USE ENVIRONMENT URL
  private apiUrl = `${environment.apiUrl}/parametrage`;

  constructor(private http: HttpClient) {}

  // ---------- TypeProjet ----------
  getTypeProjets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/showtypeprojet`);
  }

  addTypeProjet(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addtypeprojet`, data);
  }

  updateTypeProjet(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatetypeprojet/${id}`, data);
  }

  deleteTypeProjet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletetypeprojet/${id}`);
  }

  // ---------- GroupeRessource ----------
  getGroupeRessources(): Observable<any> {
    return this.http.get(`${this.apiUrl}/grouperessource`);
  }

  addGroupeRessource(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addgrouperessource`, data);
  }

  updateGroupeRessource(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updategrouperessource/${id}`, data);
  }

  deleteGroupeRessource(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletegrouperessource/${id}`);
  }

  // ---------- Priorite ----------
  getPriorites(): Observable<any> {
    return this.http.get(`${this.apiUrl}/priorite`);
  }

  addPriorite(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addpriorite`, data);
  }

  updatePriorite(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatepriorite/${id}`, data);
  }

  deletePriorite(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletepriorite/${id}`);
  }

  // ---------- Statut ----------
  getStatuts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getstatut`);
  }

  addStatut(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addstatut`, data);
  }

  updateStatut(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatestatut/${id}`, data);
  }

  deleteStatut(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletetstatut/${id}`);
  }

  // ---------- Relation Projet ----------
  getRelationProjets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/relprojet`);
  }

  addRelationProjet(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addrelprojet`, data);
  }

  updateRelationProjet(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updaterelprojet/${id}`, data);
  }

  deleteRelationProjet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleterelprojet/${id}`);
  }

  // ---------- Nature Job ----------
  getNatureJobs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/naturejob`);
  }

  addNatureJob(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addnaturejob`, data);
  }

  updateNatureJob(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatenaturejob/${id}`, data);
  }

  deleteNatureJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletenaturejob/${id}`);
  }

  // ---------- Nature Structure ----------
  getNatureStructures(): Observable<any> {
    return this.http.get(`${this.apiUrl}/naturestruc`);
  }

  addNatureStructure(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addnaturestruc`, data);
  }

  updateNatureStructure(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatenaturestruc/${id}`, data);
  }

  deleteNatureStructure(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletenaturestruc/${id}`);
  }

  // ---------- Nature Relation ----------
  getNatureRelations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/naturerelation`);
  }

  addNatureRelation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addnaturerelation`, data);
  }

  updateNatureRelation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatenaturerelation/${id}`, data);
  }

  deleteNatureRelation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletenaturerelation/${id}`);
  }

  // ---------- Type Equipement ----------
  getTypeEquipements(): Observable<any> {
    return this.http.get(`${this.apiUrl}/typeequipement`);
  }

  addTypeEquipement(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addtypeequipement`, data);
  }

  updateTypeEquipement(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatetypeequipement/${id}`, data);
  }

  deleteTypeEquipement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletetypeequipement/${id}`);
  }

  // ---------- Type Ressource ----------
  getTypeRessources(): Observable<any> {
    return this.http.get(`${this.apiUrl}/typeressource`);
  }

  addTypeRessource(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addtyperessource`, data);
  }

  updateTypeRessource(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatetyperessource/${id}`, data);
  }

  deleteTypeRessource(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletetyperessource/${id}`);
  }
}