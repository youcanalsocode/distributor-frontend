import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component/layout.component';
import { HomeComponent } from './modules/products/home/home.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { RestaurantLoginComponent } from './auth/restaurant-login/restaurant-login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  { path: 'auth/admin', component: AdminLoginComponent },
  { path: 'auth/restaurant', component: RestaurantLoginComponent },
  // Fallback route
  { path: '**', redirectTo: '' }
];
