import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
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
