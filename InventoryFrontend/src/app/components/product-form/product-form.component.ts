import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantityInStock: [0, [Validators.required, Validators.min(0)]],
      category: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.loading = true;
        this.productService.getById(this.productId).subscribe({
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
    });
  }

onSubmit(): void {
  if (this.productForm.invalid) return;

  this.loading = true;
  this.errorMessage = '';

  const productData = this.productForm.value;

  if (this.isEditMode && this.productId != null) {
    productData.id = this.productId;  
  }

  const request = this.isEditMode && this.productId != null
    ? this.productService.update(this.productId, productData)
    : this.productService.create(productData);

  request.subscribe({
    next: () => {
      this.loading = false;
      this.router.navigate(['/products']);
    },
    error: () => {
      this.errorMessage = 'Failed to save product.';
      this.loading = false;
    }
  });
}
}
