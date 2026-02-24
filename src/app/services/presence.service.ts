import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PresencesResponse } from '../home/Models/Presence';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // ✅ ADD THIS

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  
  // ✅ USE ENVIRONMENT URL
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  enregistrerPresence(data: any) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/presence/enregistrer`, data, { headers });
  }

  getPresenceParDates(userId: number, dates: string[]) {
    const headers = this.getAuthHeaders();
    let params = new HttpParams()
      .set('user_id', userId.toString());
    dates.forEach(date => {
      params = params.append('dates[]', date);
    });

    return this.http.get(`${this.baseUrl}/presence/getbydates`, { headers, params });
  }

  getTicketsRestoMois(userId: number) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/ticketresto/tickets-resto/${userId}/mois`, { headers });
  }

  getPresencesParSemaine(dateDebut: string, dateFin: string) {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('dateDebut', dateDebut)
      .set('dateFin', dateFin);
  
    return this.http.get(`${this.baseUrl}/projet/presence/admin`, { headers, params });
  }

  validerPresences(presences: { user_id: number; date: string }[]) {
    return this.http.post(`${this.baseUrl}/projet/presence/valider`, { presences });
  }

  getJoursTravailles(userId: number, mois: number, annee: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('user_id', userId.toString())
      .set('mois', mois.toString())
      .set('annee', annee.toString());
  
    return this.http.get(`${this.baseUrl}/projet/presence/jourstravailles`, { headers, params });
  }
  
  getPresencesParMois(mois: string, annee: string): Observable<PresencesResponse> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('mois', mois)
      .set('annee', annee);
  
    return this.http.get<PresencesResponse>(`${this.baseUrl}/projet/presence/getPresencesParMois`, { headers, params });
  }

  getJoursOuvres(userId: number, mois: number, annee: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('user_id', userId.toString())
      .set('mois', mois.toString())
      .set('annee', annee.toString());
  
    return this.http.get(`${this.baseUrl}/projet/presence/joursouvres`, { headers, params });
  }
  
  getJourFerie(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jourferie/affichejourferie`);
  }

  addJourFerie(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/jourferie/addjourferie`, data);
  }

  updatejourferie(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/jourferie/updatejourferie/${id}`, data);
  }
}