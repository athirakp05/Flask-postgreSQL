import React, { useState, useEffect } from "react";
import type { Product, ProductFormData } from "./types";
import ProductForm from "./assets/components/ProductForm";
import ProductList from "./assets/components/ProductList";  
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    name: "",
    price: "",
    description: "",
    in_stock: true,
    created_at: new Date().toISOString().split("T")[0], // today by default
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load products
  useEffect(() => {
    fetch("http://127.0.0.1:8000/product/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Create or Update product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert price back to number before sending
    const productToSend = {
      ...newProduct,
      price: parseFloat(newProduct.price),
    };

    if (editingId) {
      const response = await fetch(`http://127.0.0.1:8000/product/${editingId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToSend),
      });

      if (response.ok) {
        const updated = await response.json();
        setProducts(products.map((p) => (p.id === editingId ? updated : p)));
        setEditingId(null);
      }
    } else {
      const response = await fetch("http://127.0.0.1:8000/product/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productToSend),
      });

      if (response.ok) {
        const created = await response.json();
        setProducts([...products, created]);
      }
    }

    // Reset form
    setNewProduct({
      name: "",
      price: "",
      description: "",
      in_stock: true,
      created_at: new Date().toISOString().split("T")[0],
    });
  };

  // Delete product
  const handleDelete = async (id: number) => {
    const response = await fetch(`http://127.0.0.1:8000/product/${id}/`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Edit product
  const handleEdit = (product: Product) => {
    setNewProduct({
      name: product.name,
      price: String(product.price),
      description: product.description,
      in_stock: product.in_stock,
      created_at: product.created_at,
    });
    setEditingId(product.id);
  };

  return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Product CRUD
        </h1>
      <ProductForm
        newProduct={newProduct}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
    </div>
  );
}

export default App;
