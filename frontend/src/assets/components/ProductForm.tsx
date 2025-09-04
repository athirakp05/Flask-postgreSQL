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
    <form
      onSubmit={onSubmit}
      className="gap-4 mb-6 bg-gray-50 p-4 rounded-lg shadow-inner"
    >
      <div className="flex gap-4 mb-4">
        <input
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={onChange}
        className="p-2 border rounded-md focus:ring focus:ring-blue-300"
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={newProduct.price}
        onChange={onChange}
        className="p-2 border rounded-md focus:ring focus:ring-blue-300"
      />
      </div>
      <div className="flex flex-col gap-4 mb-4">
        <textarea
        name="description"
        placeholder="Description"
        value={newProduct.description}
        onChange={onChange}
        className="p-2 border rounded-md focus:ring focus:ring-blue-300"
      />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        {editingId ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
