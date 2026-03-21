import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styles: [
    `
      .glass-panel {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
    `,
  ],
})
export class AdminLoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  submitForm() {
    this.authService.adminLogin({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/admin/orders']);
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Invalid credentials';
      },
    });
  }
}
