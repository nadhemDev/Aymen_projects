import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Indicateurmois } from '../home/Models/Indictauemois';
import { Observable } from 'rxjs';
import { Pivot } from '../home/Models/Pivot';
import { environment } from '../../environments/environment';  // ✅ ADD THIS

@Injectable({
  providedIn: 'root'
})
export class IndicateurmoisService {
  
  // ✅ USE ENVIRONMENT URL
  private baseUrl = `${environment.apiUrl}/projetdetail`;

  constructor(private http: HttpClient) {}
  
  getIndicateursParAnnee(annee: number): Observable<Indicateurmois[]> {
    return this.http.get<Indicateurmois[]>(`${this.baseUrl}/indicateur-par-annee/${annee}`);
  }
}