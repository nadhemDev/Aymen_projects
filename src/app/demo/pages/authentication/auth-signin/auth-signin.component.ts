import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserserviceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
  
      this.userService.login(credentials).subscribe({
        next: (res: any) => {
          if (res.success) {
            console.log('Login success:', res);
            localStorage.setItem('jwt_token', res.user.token); // 👈 corriger ici
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/dashboard/analytics']);
          } else {
            this.errorMessage = res.message || 'Échec de connexion.';
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
        }
      });
      
      
    }
  }
  
  
}
