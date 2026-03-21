import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CartService } from '../../core/services/cart.service';
import { SearchService } from '../../core/services/search.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  readonly cartService = inject(CartService);
  readonly searchService = inject(SearchService);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  selectedLocation = 'Mumbai';
  isOpen = false;        // location dropdown
  mobileMenuOpen = false; // mobile hamburger drawer
  isProfileOpen = false;  // user profile dropdown

  locations = ['Mumbai', 'Delhi', 'Bangalore', 'Pune'];

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('location');
      if (saved) {
        this.selectedLocation = saved;
      }
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    if (confirm('Do you really want to logout?')) {
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }

  get searchQuery(): string {
    return this.searchService.searchQuery();
  }

  set searchQuery(value: string) {
    this.searchService.setQuery(value);
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.mobileMenuOpen = false;
      this.isProfileOpen = false;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      this.isOpen = false;
      this.isProfileOpen = false;
    }
  }

  toggleProfileDropdown() {
    this.isProfileOpen = !this.isProfileOpen;
    if (this.isProfileOpen) {
      this.isOpen = false;
      this.mobileMenuOpen = false;
    }
  }

  selectLocation(loc: string) {
    this.selectedLocation = loc;
    this.isOpen = false;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('location', loc);
    }
  }
}
