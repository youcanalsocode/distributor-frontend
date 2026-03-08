import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in-up">
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Wholesale Ingredients & Supplies</h1>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">Premium quality produce and essentials for your restaurant, delivered fresh every day.</p>
      </div>

      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        
        <div *ngFor="let product of products" class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <img [src]="product.image" [alt]="product.name" class="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div class="p-5 flex-grow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ product.category }}
                </span>
                <span class="text-sm font-medium text-gray-400">{{ product.unit }}</span>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-1">{{ product.name }}</h3>
              <p class="mt-1 text-sm text-gray-500 line-clamp-2">{{ product.description }}</p>
            </div>
            
            <div class="mt-4 flex items-center justify-between">
              <p class="text-2xl font-bold text-gray-900">₹{{ product.price }}</p>
            </div>

            <button (click)="addToCart(product)" class="mt-5 w-full bg-gray-50 text-gray-900 border border-gray-200 py-2.5 px-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
               </svg>
               Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.5s ease-out forwards;
    }
  `]
})
export class HomeComponent {
  products = [
    {
      id: 1,
      name: 'Farm Fresh Tomatoes',
      description: 'Hand-picked, locally sourced premium red tomatoes perfect for gravies and salads.',
      price: 45.00,
      unit: '1 kg',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Basmati Rice Premium XXL',
      description: 'Aged long-grain basmati rice, yields fluffy and aromatic biryani.',
      price: 1800.00,
      unit: '25 kg Bag',
      category: 'Grains',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'Refined Sunflower Oil',
      description: 'High-quality cooking oil perfect for deep frying and general cooking.',
      price: 1550.00,
      unit: '15 Litre Tin',
      category: 'Oil & Ghee',
      image: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'Paneer (Cottage Cheese)',
      description: 'Soft, malai paneer vacuum-packed for freshness.',
      price: 360.00,
      unit: '1 kg',
      category: 'Dairy',
      image: 'https://plus.unsplash.com/premium_photo-1663852297125-97e3fb610de5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  addToCart(product: any) {
    alert('Please log in as a Restaurant to add items to your cart.');
  }
}
