import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <a routerLink="/" class="absolute top-8 left-8 flex items-center text-gray-500 hover:text-gray-900 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Home
      </a>
      
      <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div class="w-16 h-16 mx-auto bg-gradient-to-tr from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-900/40 mb-4">
          <span class="text-2xl font-bold text-white tracking-widest">A</span>
        </div>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">Admin Portal</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to manage inventory, orders, and restaurants safely.
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form class="space-y-6" (ngSubmit)="login()">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-all">
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-all">
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded">
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-gray-900 hover:text-gray-700">Forgot your password?</a>
              </div>
            </div>

            <div>
              <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 active:scale-[0.98]">
                Sign in to Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AdminLoginComponent {
  login() {
    alert('Admin Login successful (Mock!). In future, this will connect to the backend.');
  }
}
