import { Component, inject } from '@angular/core';

import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.adminLogout();
    this.router.navigate(['/auth/admin']);
  }
}
