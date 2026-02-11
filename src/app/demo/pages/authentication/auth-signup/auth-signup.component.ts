import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../../../../services/userservice.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent {
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  formData = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  constructor(
    private userService: UserserviceService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    console.log('=== FORM SUBMIT STARTED ===');
    console.log('Form data:', this.formData);
    
    // Check if passwords match
    if (this.formData.password !== this.formData.confirm_password) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    console.log('Calling userService.register()...');
    
    this.userService.register(this.formData).subscribe(
      (response: any) => {
        console.log('=== REGISTRATION SUCCESS ===');
        console.log('Response:', response);
        this.isLoading = false;
        
        // Fixed: Remove optional chaining
        if (response && response.success) {
          this.successMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/auth/signin']);
          }, 2000);
        } else {
          // Fixed: Use traditional null check
          this.errorMessage = (response && response.message) 
            ? response.message 
            : 'Registration failed. Please try again.';
        }
      },
      (error: any) => {
        console.error('=== REGISTRATION ERROR ===');
        console.error('Error object:', error);
        this.isLoading = false;
        
        if (error && error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please check: 1) Laravel backend is running, 2) CORS is configured';
        } else if (error && error.status === 422) {
          // Laravel validation errors
          if (error.error && error.error.errors) {
            const errors = error.error.errors;
            const firstErrorKey = Object.keys(errors)[0];
            const firstError = errors[firstErrorKey];
            this.errorMessage = Array.isArray(firstError) ? firstError[0] : 'Validation error';
          } else {
            // Fixed: Use traditional null check
            this.errorMessage = (error.error && error.error.message) 
              ? error.error.message 
              : 'Validation failed';
          }
        } else {
          // Fixed: Use traditional null check
          this.errorMessage = (error.error && error.error.message) 
            ? error.error.message 
            : 'Server error. Please try again.';
        }
      }
    );
  }
}