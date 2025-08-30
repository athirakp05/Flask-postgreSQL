import React from "react";
import type { Product } from "./types";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - ₹{p.price} - {p.in_stock ? "In stock" : "Out of stock"} - 📅{" "}
          {p.created_at}
          <button onClick={() => onEdit(p)}>Edit</button>
          <button onClick={() => onDelete(p.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
