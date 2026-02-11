import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api/parametrage'; // adapte l'URL selon ton environnement

@Injectable({
  providedIn: 'root'
})
export class ParametrageService {

  constructor(private http: HttpClient) {}

  // ---------- TypeProjet ----------
  getTypeProjets(): Observable<any> {
    return this.http.get(`${API_URL}/showtypeprojet`);
  }

  addTypeProjet(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addtypeprojet`, data);
  }

  updateTypeProjet(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updatetypeprojet/${id}`, data);
  }

  deleteTypeProjet(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deletetypeprojet/${id}`);
  }

  // ---------- GroupeRessource ----------
  getGroupeRessources(): Observable<any> {
    return this.http.get(`${API_URL}/grouperessource`);
  }

  addGroupeRessource(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addgrouperessource`, data);
  }

  updateGroupeRessource(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updategrouperessource/${id}`, data);
  }

  deleteGroupeRessource(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deletegrouperessource/${id}`);
  }

  // ---------- Priorite ----------
  getPriorites(): Observable<any> {
    return this.http.get(`${API_URL}/priorite`);
  }

  addPriorite(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addpriorite`, data);
  }

  updatePriorite(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updatepriorite/${id}`, data);
  }

  deletePriorite(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deletepriorite/${id}`);
  }

  // ---------- Statut ----------
  getStatuts(): Observable<any> {
    return this.http.get(`${API_URL}/getstatut`);
  }

  

  addStatut(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addstatut`, data);
  }

  updateStatut(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updatestatut/${id}`, data);
  }

  deleteStatut(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deletetstatut/${id}`);
  }

  // ---------- Relation Projet ----------
  getRelationProjets(): Observable<any> {
    return this.http.get(`${API_URL}/relprojet`);
  }

  addRelationProjet(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addrelprojet`, data);
  }

  updateRelationProjet(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updaterelprojet/${id}`, data);
  }

  deleteRelationProjet(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deleterelprojet/${id}`);
  }

  // ---------- Nature Job ----------
  getNatureJobs(): Observable<any> {
    return this.http.get(`${API_URL}/naturejob`);
  }

  addNatureJob(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addnaturejob`, data);
  }

  updateNatureJob(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updatenaturejob/${id}`, data);
  }

  deleteNatureJob(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deletenaturejob/${id}`);
  }

  // ---------- Nature Structure ----------
  getNatureStructures(): Observable<any> {
    return this.http.get(`${API_URL}/naturestruc`);
  }

  addNatureStructure(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addnaturestruc`, data);
  }

  updateNatureStructure(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updatenaturestruc/${id}`, data);
  }

  deleteNatureStructure(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deletenaturestruc/${id}`);
  }

  // ---------- Nature Relation ----------
  getNatureRelations(): Observable<any> {
    return this.http.get(`${API_URL}/naturerelation`);
  }

  addNatureRelation(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addnaturerelation`, data);
  }

  updateNatureRelation(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updatenaturerelation/${id}`, data);
  }

  deleteNatureRelation(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deletenaturerelation/${id}`);
  }

  // ---------- Type Equipement ----------
  getTypeEquipements(): Observable<any> {
    return this.http.get(`${API_URL}/typeequipement`);
  }

  addTypeEquipement(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addtypeequipement`, data);
  }

  updateTypeEquipement(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updatetypeequipement/${id}`, data);
  }

  deleteTypeEquipement(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deletetypeequipement/${id}`);
  }

  // ---------- Type Ressource ----------
  getTypeRessources(): Observable<any> {
    return this.http.get(`${API_URL}/typeressource`);
  }

  addTypeRessource(data: any): Observable<any> {
    return this.http.post(`${API_URL}/addtyperessource`, data);
  }

  updateTypeRessource(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/updatetyperessource/${id}`, data);
  }

  deleteTypeRessource(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deletetyperessource/${id}`);
  }

}
