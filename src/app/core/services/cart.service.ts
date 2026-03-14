import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalItems = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  addToCart(product: Product): void {
    const current = this._items();
    const existing = current.find(i => i.productId === product.id);

    if (existing) {
      this._items.set(
        current.map(i =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      this._items.set([
        ...current,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          image_url: product.image_url,
          quantity: 1
        }
      ]);
    }
  }

  removeFromCart(productId: number): void {
    const current = this._items();
    const existing = current.find(i => i.productId === productId);

    if (!existing) return;

    if (existing.quantity === 1) {
      this._items.set(current.filter(i => i.productId !== productId));
    } else {
      this._items.set(
        current.map(i =>
          i.productId === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      );
    }
  }

  getQuantity(productId: number): number {
    return this._items().find(i => i.productId === productId)?.quantity ?? 0;
  }

  clearCart(): void {
    this._items.set([]);
  }
}
