import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.component.html'
})
export class AdminCategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);

  categories: Category[] = [];
  
  // Form properties
  name = '';
  description = '';
  selectedFile: File | null = null;
  
  isSubmitting = false;

  get envApiUrl() {
    return environment.apiUrl;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error fetching categories', err)
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (!this.name) return;
    
    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('name', this.name);
    if (this.description) {
      formData.append('description', this.description);
    }
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.categoryService.addCategory(formData).subscribe({
      next: () => {
        this.loadCategories(); // Refresh list
        this.name = '';
        this.description = '';
        this.selectedFile = null;
        this.isSubmitting = false;
        // Reset file input is visual only
      },
      error: (err) => {
        console.error('Error adding category', err);
        this.isSubmitting = false;
        alert('Failed to add category: ' + (err.error?.detail || err.message));
      }
    });
  }

  deleteCategory(id: number) {
    if(confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories(),
        error: (err) => alert('Error deleting category: ' + (err.error?.detail || err.message))
      });
    }
  }
}
