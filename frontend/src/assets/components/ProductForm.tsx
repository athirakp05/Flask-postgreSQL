import React from "react";
import type { ProductFormData } from "./types";

interface ProductFormProps {
  newProduct: ProductFormData;
  editingId: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  newProduct,
  editingId,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="name"
        placeholder="Name"
        value={newProduct.name}
        onChange={onChange}
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={newProduct.price}
        onChange={onChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={newProduct.description}
        onChange={onChange}
      />
      <input
        type="date"
        name="created_at"
        value={newProduct.created_at}
        onChange={onChange}
      />
      <button type="submit">
        {editingId ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
