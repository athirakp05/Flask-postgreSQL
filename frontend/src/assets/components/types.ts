export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  in_stock: boolean;
  created_at: string; // ISO date string
}

// Form state type (price stays string for input handling)
export interface ProductFormData {
  name: string;
  price: string;
  description: string;
  in_stock: boolean;
  created_at: string;
}
