import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurant-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-orange-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <a routerLink="/" class="absolute top-8 left-8 flex items-center text-orange-600 hover:text-orange-900 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Home
      </a>
      
      <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div class="w-16 h-16 mx-auto bg-gradient-to-tr from-amber-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/40 mb-4">
          <span class="text-2xl font-bold text-white tracking-widest">R</span>
        </div>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-orange-900">Partner Login</h2>
        <p class="mt-2 text-center text-sm text-orange-700/80">
          Sign in to purchase wholesale supplies for your restaurant.
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-orange-100">
          <form class="space-y-6" (ngSubmit)="login()">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Business Email / Phone</label>
              <div class="mt-1">
                <input id="email" name="email" type="text" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all" placeholder="Enter registered business info">
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-all" placeholder="Enter your password">
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded">
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-orange-600 hover:text-orange-500">Need help signing in?</a>
              </div>
            </div>

            <div>
              <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm shadow-orange-500/30 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 active:scale-[0.98]">
                Sign in to Restaurant
              </button>
            </div>
          </form>
          
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">New partner?</span>
              </div>
            </div>

            <div class="mt-6">
              <a href="#" class="w-full flex justify-center py-2.5 px-4 border border-orange-200 rounded-lg text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 transition-all">
                Register Food Business
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class RestaurantLoginComponent {
  login() {
    alert('Restaurant Login successful (Mock!). You can now place orders.');
  }
}
