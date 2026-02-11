import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) {}

  // Login method with proper CORS headers
  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('Login attempt to:', `${API_URL}/auth`);
    console.log('Credentials:', credentials);
    
    return this.http.post(`${API_URL}/auth`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true  // Important for CORS with credentials
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
    return this.http.post(`${API_URL}/register`, userData, {
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
    
    return this.http.get(`${API_URL}/allusers`, { 
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
    
    return this.http.get(`${API_URL}/user/${userId}`, { 
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

  // Set token (corrected to use 'jwt_token' consistently)
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

  // Optional: Add method to update user profile
  updateProfile(userData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    return this.http.put(`${API_URL}/profile`, userData, { 
      headers: headers,
      withCredentials: true 
    });
  }
}