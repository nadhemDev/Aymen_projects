import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';  // ✅ ADD THIS

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  
  // ✅ USE ENVIRONMENT URL
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Login method with proper CORS headers
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('Login attempt to:', `${this.apiUrl}/auth`);
    console.log('Credentials:', credentials);
    
    return this.http.post(`${this.apiUrl}/auth`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    })
    .pipe(
      tap(response => {
        console.log('Login response:', response);
        if (response.success && response.user.token) {
          localStorage.setItem('jwt_token', response.user.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          console.log('Token stored:', response.user.token.substring(0, 20) + '...');
        }
      })
    );
  }

  // Register method with CORS headers
  register(userData: { name: string; email: string; password: string; confirm_password?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true
    });
  }

  // Get all users with auth header
  getAllUsers(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
    
    return this.http.get(`${this.apiUrl}/allusers`, { 
      headers: headers,
      withCredentials: true 
    });
  }

  // Get user by ID
  getUserById(userId: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
    
    return this.http.get(`${this.apiUrl}/user/${userId}`, { 
      headers: headers,
      withCredentials: true 
    });
  }

  // Get user from localStorage
  getUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Set token
  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Logout - clear all auth data
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt_token');
    console.log('User logged out, all tokens cleared');
  }

  // Update user profile
  updateProfile(userData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    return this.http.put(`${this.apiUrl}/profile`, userData, { 
      headers: headers,
      withCredentials: true 
    });
  }
}