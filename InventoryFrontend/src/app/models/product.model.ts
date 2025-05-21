export interface Product {
  id?: number;
  name: string;
  description?: string | null;  
  price: number;
  quantityInStock: number;        
  category?: string | null;
}
