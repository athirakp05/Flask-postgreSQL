import React, { useState } from "react";
import type { Product } from "./types";
interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const [filterInStock, setFilterInStock] = useState<boolean | null>(null);

  const filteredProducts = products.filter((p) => {
    if (filterInStock === null) return true;
    return p.in_stock === filterInStock;
  });

  return (
    <div>
      {/* Filter buttons */}
      <div className="filter-buttons mb-4">
        <button className="all" onClick={() => setFilterInStock(null)}>All</button>
        <button className="in-stock" onClick={() => setFilterInStock(true)}>In Stock</button>
        <button className="out-of-stock" onClick={() => setFilterInStock(false)}>Out of Stock</button>
      </div>

      {/* Product table */}
      <table className="product-table min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">In Stock</th>
            <th className="border border-gray-300 px-4 py-2">Date Added</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{p.name}</td>
              <td className="border border-gray-300 px-4 py-2">₹{p.price}</td>
              <td className="border border-gray-300 px-4 py-2">{p.description}</td>
              <td className="border border-gray-300 px-4 py-2">{p.in_stock ? "Yes" : "No"}</td>
              <td className="border border-gray-300 px-4 py-2">{p.created_at}</td>
              <td className="actions border border-gray-300 px-4 py-2 flex gap-2">
                <button
                  className="px-2 py-1 bg-yellow-300 rounded hover:bg-yellow-400"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
