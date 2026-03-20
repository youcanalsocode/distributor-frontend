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
  isOpen = false;
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
}

selectLocation(loc: string) {
  this.selectedLocation = loc;
  this.isOpen = false;

  // Save for later
  localStorage.setItem('location', loc);
}
}
