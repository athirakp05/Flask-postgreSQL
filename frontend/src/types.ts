// src/types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  in_stock: boolean;
  created_at: string;  // Added created_at field
}
