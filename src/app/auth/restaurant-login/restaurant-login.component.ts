import { Component } from '@angular/core';

import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-restaurant-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './restaurant-login.component.html',
})
export class RestaurantLoginComponent {
  isLoginMode = true;
  error: string = '';
  successMsg: string = '';

  loginData = {
    mobile: '',
    password: '',
  };

  registerData = {
    mobile: '',
    password: '',
    name: '',
    address: '',
    security_question: '',
    security_answer: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
    this.successMsg = '';
  }

  onSubmit() {
    this.error = '';
    this.successMsg = '';

    if (this.isLoginMode) {
      if (!this.loginData.mobile || !this.loginData.password) {
        this.error = 'Please fill in all fields';
        return;
      }
      this.authService.login(this.loginData).subscribe({
        next: (res) => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (err) => {
          this.error = err.error?.detail || 'Login failed';
          alert(this.error);
        },
      });
    } else {
      if (!this.registerData.mobile || !this.registerData.password || !this.registerData.name || !this.registerData.security_question || !this.registerData.security_answer) {
        this.error = 'Please fill in all required fields';
        return;
      }
      this.authService.register(this.registerData).subscribe({
        next: (res) => {
          this.isLoginMode = true;
          this.loginData.mobile = this.registerData.mobile;
          this.successMsg = 'Registration successful! You can now sign in.';
          alert('Registration successful! You can now sign in.');
          this.registerData = { mobile: '', password: '', name: '', address: '', security_question: '', security_answer: '' };
        },
        error: (err) => {
          this.error = err.error?.detail || 'Registration failed';
          alert(this.error);
        },
      });
    }
  }
}
