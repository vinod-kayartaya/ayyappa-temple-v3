import React, { useState, useEffect } from 'react';
import ProductList from '../../components/masters/ProductList';
import ProductDetails from '../../components/masters/ProductDetails';
import ProductForm from '../../components/masters/ProductForm';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleSubmit = async (formData) => {
    try {
      if (isAdding) {
        const newProduct = await createProduct(formData);
        setProducts([...products, newProduct]);
      } else {
        const updatedProduct = await updateProduct(selectedProduct.id, formData);
        setProducts(
          products.map((prod) =>
            prod.id === selectedProduct.id ? updatedProduct : prod
          )
        );
        setSelectedProduct(updatedProduct);
      }
      setIsEditing(false);
      setIsAdding(false);
      setError(null);
    } catch (err) {
      setError(
        isAdding ? 'Failed to create product' : 'Failed to update product'
      );
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((prod) => prod.id !== id));
      setSelectedProduct(null);
      setError(null);
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className='container mt-4'>
        <div className='text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      <div className='row'>
        <div className='col-md-4'>
          <ProductList
            products={products}
            onSelect={setSelectedProduct}
            onAddNew={handleAddNew}
            selectedId={selectedProduct?.id}
          />
        </div>
        <div className='col-md-8'>
          {isEditing || isAdding ? (
            <ProductForm
              product={isEditing ? selectedProduct : null}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          ) : (
            <ProductDetails
              product={selectedProduct}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Products; 