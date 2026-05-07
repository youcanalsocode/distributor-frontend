import { Component, ChangeDetectorRef, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  // Step 1: Enter mobile, Step 2: Answer security question, Step 3: Set new password
  step = signal(1);
  error = signal('');
  successMsg = signal('');
  loading = signal(false);
  mobileNotFound = signal(false);

  mobile = '';
  securityQuestion = '';
  securityAnswer = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  // Step 1: Fetch security question for the given mobile
  fetchSecurityQuestion() {
    this.error.set('');
    this.successMsg.set('');
    this.mobileNotFound.set(false);

    if (!this.mobile) {
      this.error.set('Please enter your mobile number');
      return;
    }

    this.loading.set(true);
    this.authService.getSecurityQuestion(this.mobile).subscribe({
      next: (res) => {
        this.securityQuestion = res.security_question;
        this.step.set(2);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 404) {
          this.mobileNotFound.set(true);
          this.error.set('');
        } else {
          this.error.set(err.error?.detail || 'Something went wrong. Please try again.');
        }
        this.loading.set(false);
        this.cdr.detectChanges();
      },
    });
  }

  // Step 2: Submit security answer + new password
  resetPassword() {
    this.error.set('');
    this.successMsg.set('');

    if (!this.securityAnswer) {
      this.error.set('Please enter your security answer');
      return;
    }
    if (!this.newPassword) {
      this.error.set('Please enter a new password');
      return;
    }
    if (this.newPassword.length < 4) {
      this.error.set('Password must be at least 4 characters');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.error.set('Passwords do not match');
      return;
    }

    this.loading.set(true);
    this.authService
      .resetPassword({
        mobile: this.mobile,
        security_answer: this.securityAnswer,
        new_password: this.newPassword,
      })
      .subscribe({
        next: () => {
          this.step.set(3);
          this.loading.set(false);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error.set(err.error?.detail || 'Password reset failed');
          this.loading.set(false);
          this.cdr.detectChanges();
        },
      });
  }

  goToLogin() {
    this.router.navigate(['/auth/restaurant']);
  }

  goToSignup() {
    this.router.navigate(['/auth/restaurant']);
  }
}
