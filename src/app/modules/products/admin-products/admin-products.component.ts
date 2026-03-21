import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products: Product[] = [];
  categories: Category[] = [];
  isLoading = true;

  // Form Properties
  isEditing = false;
  currentProductId: number | null = null;
  name = '';
  description = '';
  price: number | null = null;
  stock: number | null = null;
  category_id: number | null = null;
  unit = '';
  selectedFile: File | null = null;
  isSubmitting = false;

  get envApiUrl() {
    return environment.apiUrl;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });

    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  getCategoryName(catId: number): string {
    const cat = this.categories.find(c => c.id === catId);
    return cat ? cat.name : 'Unknown';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.currentProductId = product.id;
    this.name = product.name;
    this.description = product.description || '';
    this.price = product.price;
    this.stock = product.stock;
    this.category_id = product.category_id;
    this.unit = product.unit || '';
    this.selectedFile = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit() {
    this.isEditing = false;
    this.currentProductId = null;
    this.resetForm();
  }

  resetForm() {
    this.name = '';
    this.description = '';
    this.price = null;
    this.stock = null;
    this.category_id = null;
    this.unit = '';
    this.selectedFile = null;
  }

  onSubmit() {
    if (!this.name || this.price === null || this.stock === null || this.category_id === null) return;

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('price', this.price.toString());
    formData.append('stock', this.stock.toString());
    formData.append('category_id', this.category_id.toString());
    
    if (this.description) formData.append('description', this.description);
    if (this.unit) formData.append('unit', this.unit);
    if (this.selectedFile) formData.append('image', this.selectedFile);

    if (this.isEditing && this.currentProductId) {
      this.productService.updateProduct(this.currentProductId, formData).subscribe({
        next: () => {
          this.loadData();
          this.cancelEdit();
          this.isSubmitting = false;
        },
        error: (err) => {
          alert('Failed to update product: ' + (err.error?.detail || err.message));
          this.isSubmitting = false;
        }
      });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: () => {
          this.loadData();
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (err) => {
          alert('Failed to add product: ' + (err.error?.detail || err.message));
          this.isSubmitting = false;
        }
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadData(),
        error: (err) => alert('Error deleting product')
      });
    }
  }
}
