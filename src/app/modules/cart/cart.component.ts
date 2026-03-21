import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { CartItem } from '../../core/models/cart-item.model';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
  `]
})
export class CartComponent {
  readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  get items(): CartItem[] {
    return this.cartService.items();
  }

  get totalItems() {
    return this.cartService.totalItems();
  }

  get totalPrice() {
    return this.cartService.totalPrice();
  }

  removeItem(productId: number): void {
    const item = this.items.find(i => i.productId === productId);
    if (!item) return;
  }

  increaseQuantity(item: CartItem): void {
    const product: Product = {
      id: item.productId,
      name: item.name,
      price: item.price,
      unit: item.unit || '',
      image_url: item.image_url || '',
      description: '',
      stock: 999, 
      category_id: 0,
      category: { id: 0, name: '' }
    };
    this.cartService.addToCart(product);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://placehold.co/100x100/e2e8f0/64748b?text=Image';
  }

  checkout(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Please login to place an order.');
      this.router.navigate(['/auth/restaurant'], { 
        queryParams: { returnUrl: '/cart' } 
      });
      return;
    }

    if (this.items.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const orderData = {
      total_amount: this.totalPrice,
      items: this.items.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (res) => {
        alert('Order placed successfully!');
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Order creation failed:', err);
        alert('Failed to place order. Please try again.');
      },
    });
  }
}
