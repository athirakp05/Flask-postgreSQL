import React, { useState, useEffect } from "react";
import type { Product } from "./types";
import ProductTable from "./assets/components/ProductTable";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", in_stock: true });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/product/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => { /* same as before */ };
  const handleDelete = async (id: number) => { /* same as before */ };
  const handleEdit = (product: Product) => { /* same as before */ };

  return (
    <div className="app-container">
  <h1>Product CRUD</h1>

  <form className="product-form" onSubmit={handleSubmit}>
    <input name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} />
    <input name="price" type="number" placeholder="Price" value={newProduct.price} onChange={handleChange} />
    <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} />
    <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
  </form>

  <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
</div>

  );
}

export default App;
