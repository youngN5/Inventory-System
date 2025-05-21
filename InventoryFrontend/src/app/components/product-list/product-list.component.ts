import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { debounceTime, Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ProductDetailsDialogComponent } from '../../shared/product-details-dialog/product-details-dialog.component';


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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'quantityInStock', 'category', 'actions'];

  loading = false;
  errorMessage = '';  
  searchName: string = '';
  searchCategory: string = '';

  private searchSubject = new Subject<void>();

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
        this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.loadProducts();
    });
  }

loadProducts() {
  this.loading = true;
  this.errorMessage = '';

  this.productService.searchProducts(this.searchName, this.searchCategory).subscribe({
    next: (data: Product[]) => {
        this.products = data;
      this.loading = false;
    },
      error: () => {
      this.errorMessage = 'Failed to load products.';
      this.loading = false;
    }
  });
}
  onSearchChange() {
    this.searchSubject.next();
  }

  clearSearch() {
    this.searchName = '';
    this.searchCategory = '';
    this.loadProducts();
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
  viewDetails(product: Product) {
  this.dialog.open(ProductDetailsDialogComponent, {
    width: '400px',
    data: {
      name: product.name,
      description: product.description
    }
  });
}
}
