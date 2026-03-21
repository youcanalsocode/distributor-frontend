import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CartService } from '../../core/services/cart.service';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  readonly cartService = inject(CartService);
  readonly searchService = inject(SearchService);

  selectedLocation = 'Mumbai';
  isOpen = false;        // location dropdown
  mobileMenuOpen = false; // mobile hamburger drawer

  locations = ['Mumbai', 'Delhi', 'Bangalore', 'Pune'];

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('location');
      if (saved) {
        this.selectedLocation = saved;
      }
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
    if (this.isOpen) this.mobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) this.isOpen = false;
  }

  selectLocation(loc: string) {
    this.selectedLocation = loc;
    this.isOpen = false;
    localStorage.setItem('location', loc);
  }
}
