import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'quantityInStock', 'category', 'actions'];

  loading = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.errorMessage = '';
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  editProduct(id?: number) {
    if (id != null) {
      this.router.navigate(['/products/edit', id]);
    }
  }

  deleteProduct(id?: number) {
    if (id == null) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this product?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.productService.delete(id).subscribe({
          next: () => this.loadProducts(),
          error: () => alert('Failed to delete product.')
        });
      }
    });
  }
}
