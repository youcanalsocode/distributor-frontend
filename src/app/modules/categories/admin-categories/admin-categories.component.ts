import { Component, inject, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { environment } from '../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.component.html'
})
export class AdminCategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  categories: Category[] = [];
  isLoading = true;

  // Form properties
  @ViewChild('fileInput') fileInput!: ElementRef;
  isEditing = false;
  currentCategoryId: number | null = null;
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
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  editCategory(category: Category) {
    this.isEditing = true;
    this.currentCategoryId = category.id;
    this.name = category.name;
    this.description = category.description || '';
    this.selectedFile = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.isEditing = false;
    this.currentCategoryId = null;
    this.resetForm();
  }

  resetForm() {
    this.name = '';
    this.description = '';
    this.selectedFile = null;
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onSubmit() {
    if (!this.name) return;

    this.isSubmitting = true;
    this.cdr.detectChanges();

    const formData = new FormData();
    formData.append('name', this.name);
    if (this.description) formData.append('description', this.description);
    if (this.selectedFile) formData.append('image', this.selectedFile);

    const savedName = this.name;

    if (this.isEditing && this.currentCategoryId) {
      this.categoryService.updateCategory(this.currentCategoryId, formData)
        .pipe(finalize(() => { this.isSubmitting = false; this.cdr.detectChanges(); }))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Category Updated', detail: `"${savedName}" updated.` });
            this.cancelEdit();
            this.loadCategories();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Update Failed', detail: err.error?.detail || err.message || 'Unknown error' });
          }
        });
    } else {
      this.categoryService.addCategory(formData)
        .pipe(finalize(() => { this.isSubmitting = false; this.cdr.detectChanges(); }))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Category Added', detail: `"${savedName}" added.` });
            this.resetForm();
            this.loadCategories();
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Add Failed', detail: err.error?.detail || err.message || 'Unknown error' });
          }
        });
    }
  }

  deleteCategory(id: number) {
    const category = this.categories.find(c => c.id === id);
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Category Deleted', detail: `"${category?.name}" has been deleted.` });
          this.loadCategories();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Delete Failed', detail: err.error?.detail || err.message || 'Unknown error' });
        }
      });
    }
  }
}
