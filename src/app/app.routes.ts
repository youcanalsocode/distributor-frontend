import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component/layout.component';
import { HomeComponent } from './modules/products/home/home.component';
import { ProductsComponent } from './modules/products/products/products.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { RestaurantLoginComponent } from './auth/restaurant-login/restaurant-login.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { CartComponent } from './modules/cart/cart.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminOrdersComponent } from './modules/orders/admin-orders/admin-orders.component';
import { AdminCategoriesComponent } from './modules/categories/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './modules/products/admin-products/admin-products.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent, canActivate: [authGuard] }
    ]
  },
  { path: 'auth/admin', component: AdminLoginComponent },
  { path: 'auth/restaurant', component: RestaurantLoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: '', redirectTo: 'orders', pathMatch: 'full' }
    ]
  },
  // Fallback route
  { path: '**', redirectTo: '' }
];
