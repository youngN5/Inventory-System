import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId?: number;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      quantityInStock: [0, [Validators.required, Validators.min(1)]],
      category: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.loadProduct(this.productId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getById(id).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue(product);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load product.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const productData: Product = this.productForm.value;

    if (this.isEditMode && this.productId != null) {
        const updatedProduct: Product = {
        ...productData,
        id: this.productId  
      };
      this.productService.update(this.productId, updatedProduct).subscribe({
        next: () => {
          this.loading = false;
          this.showNotification('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        error: () => {
          this.errorMessage = 'Failed to update product.';
          this.loading = false;
        }
      });
    } else {
      this.productService.create(productData).subscribe({
        next: () => {
          this.loading = false;
          this.showNotification('Product created successfully!');
          this.router.navigate(['/products']);
        },
        error: () => {
          this.errorMessage = 'Failed to create product.';
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center', 
      verticalPosition: 'top'
    });
  }
}
