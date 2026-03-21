import { Component, inject, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { environment } from '../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  categories: Category[] = [];
  isLoading = true;

  // Form Properties
  @ViewChild('fileInput') fileInput!: ElementRef;
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
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onSubmit() {
    console.log('[onSubmit] called. name:', this.name, 'category_id:', this.category_id);

    const catId = this.category_id !== null ? Number(this.category_id) : null;
    if (!this.name || this.price === null || this.stock === null || catId === null || isNaN(catId)) {
      console.warn('[onSubmit] guard failed');
      return;
    }

    this.isSubmitting = true;
    this.cdr.detectChanges();

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('price', this.price!.toString());
    formData.append('stock', this.stock!.toString());
    formData.append('category_id', catId.toString());
    if (this.description) formData.append('description', this.description);
    if (this.unit) formData.append('unit', this.unit);
    if (this.selectedFile) formData.append('image', this.selectedFile);

    const savedName = this.name;

    if (this.isEditing && this.currentProductId) {
      this.productService.updateProduct(this.currentProductId, formData)
        .pipe(finalize(() => { this.isSubmitting = false; this.cdr.detectChanges(); }))
        .subscribe({
          next: () => {
            console.log('[onSubmit] update success');
            this.messageService.add({ severity: 'success', summary: 'Product Updated', detail: `"${savedName}" updated.` });
            this.cancelEdit();
            this.loadData();
          },
          error: (err) => {
            console.error('[onSubmit] update error', err);
            this.messageService.add({ severity: 'error', summary: 'Update Failed', detail: err.error?.detail || err.message || 'Unknown error' });
          }
        });
    } else {
      this.productService.addProduct(formData)
        .pipe(finalize(() => { this.isSubmitting = false; this.cdr.detectChanges(); }))
        .subscribe({
          next: () => {
            console.log('[onSubmit] add success');
            this.messageService.add({ severity: 'success', summary: 'Product Added', detail: `"${savedName}" added.` });
            this.resetForm();
            this.loadData();
          },
          error: (err) => {
            console.error('[onSubmit] add error', err);
            this.messageService.add({ severity: 'error', summary: 'Add Failed', detail: err.error?.detail || err.message || 'Unknown error' });
          }
        });
    }
  }

  deleteProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Product Deleted', detail: `"${product?.name}" has been deleted.` });
          this.loadData();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Delete Failed', detail: err.error?.detail || err.message || 'Unknown error' });
        }
      });
    }
  }
}
