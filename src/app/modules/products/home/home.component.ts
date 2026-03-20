import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { SearchService } from '../../../core/services/search.service';
import { Product } from '../../../core/models/product.model';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,CarouselModule],
  templateUrl: './home.component.html',
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
    @keyframes shimmer {
      0%   { background-position: -700px 0; }
      100% { background-position: 700px 0; }
    }
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 700px 100%;
      animation: shimmer 1.3s infinite linear;
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);
  readonly cartService = inject(CartService);
  private readonly searchService = inject(SearchService);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  selectedCategory = signal<string>('All');
  searchQuery = this.searchService.searchQuery;

  /** Responsive options for PrimeNG Carousel */
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '992px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '576px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  /** Featured products for the carousel (top 6 items) */
  featuredProducts = computed(() => this.products().slice(0, 6));

  /** Unique category names derived from products */
  categories = computed(() => {
    const names = this.products().map(p => p.category.name);
    return ['All', ...Array.from(new Set(names))];
  });

  /** Products filtered by category and search query */
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    return this.products().filter(p => {
      const matchCat =
        this.selectedCategory() === 'All' ||
        p.category.name === this.selectedCategory();
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        (p.description ?? '').toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  });

  skeletons = Array(8).fill(0);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: err => {
        console.error('Failed to load products', err);
        this.error.set('Could not load products. Please make sure the backend is running.');
        this.loading.set(false);
      }
    });
  }

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  getQuantity(productId: number): number {
    return this.cartService.getQuantity(productId);
  }

  /** Fallback when image_url is missing or broken */
  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image';
  }
}
