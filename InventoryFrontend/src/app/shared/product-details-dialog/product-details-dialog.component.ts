import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-product-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './product-details-dialog.component.html',
})

export class ProductDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; description: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
