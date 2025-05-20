import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent],
  template: `<app-product-list></app-product-list>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InventoryFrontend';
}
