import React, { useState, useEffect } from 'react';
import { fetchSuppliers, fetchCategories } from '../../services/api';

function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    unit: '',
    supplierId: '',
    categoryId: '',
    price: '',
    costPrice: '',
    commissionPercentage: '',
    taxPercentage: '',
    astPercentage: '',
    openingStock: '',
    blocked: ''
  });
  const [errors, setErrors] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const [suppliersData, categoriesData] = await Promise.all([
          fetchSuppliers(),
          fetchCategories()
        ]);
        setSuppliers(suppliersData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to load dropdown data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDropdownData();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        code: product.code,
        name: product.name,
        unit: product.unit,
        supplierId: product.supplierId,
        categoryId: product.categoryId,
        price: product.price,
        costPrice: product.costPrice,
        commissionPercentage: product.commissionPercentage,
        taxPercentage: product.taxPercentage,
        astPercentage: product.astPercentage,
        openingStock: product.openingStock,
        blocked: product.blocked
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) {
      newErrors.code = 'Code is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.unit.trim()) {
      newErrors.unit = 'Unit is required';
    }
    if (!formData.supplierId) {
      newErrors.supplierId = 'Supplier is required';
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.costPrice || formData.costPrice <= 0) {
      newErrors.costPrice = 'Valid cost price is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  if (loading) {
    return (
      <div className='card'>
        <div className='card-body text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='mb-0'>{product ? 'Edit Product' : 'New Product'}</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          {product && (
            <div className='mb-3'>
              <label className='form-label'>ID</label>
              <input
                type='text'
                className='form-control'
                value={product.id}
                readOnly
                disabled
              />
            </div>
          )}

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='code' className='form-label'>Code</label>
              <input
                type='text'
                className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                id='code'
                name='code'
                value={formData.code}
                onChange={handleChange}
              />
              {errors.code && <div className='invalid-feedback'>{errors.code}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='unit' className='form-label'>Unit</label>
              <input
                type='text'
                className={`form-control ${errors.unit ? 'is-invalid' : ''}`}
                id='unit'
                name='unit'
                value={formData.unit}
                onChange={handleChange}
              />
              {errors.unit && <div className='invalid-feedback'>{errors.unit}</div>}
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Name</label>
            <input
              type='text'
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='supplierId' className='form-label'>Supplier</label>
              <select
                className={`form-select ${errors.supplierId ? 'is-invalid' : ''}`}
                id='supplierId'
                name='supplierId'
                value={formData.supplierId}
                onChange={handleChange}
              >
                <option value=''>Select Supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors.supplierId && <div className='invalid-feedback'>{errors.supplierId}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='categoryId' className='form-label'>Category</label>
              <select
                className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
                id='categoryId'
                name='categoryId'
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value=''>Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <div className='invalid-feedback'>{errors.categoryId}</div>}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='price' className='form-label'>Price</label>
              <input
                type='number'
                step='0.01'
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                id='price'
                name='price'
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <div className='invalid-feedback'>{errors.price}</div>}
            </div>
            <div className='col-md-6'>
              <label htmlFor='costPrice' className='form-label'>Cost Price</label>
              <input
                type='number'
                step='0.01'
                className={`form-control ${errors.costPrice ? 'is-invalid' : ''}`}
                id='costPrice'
                name='costPrice'
                value={formData.costPrice}
                onChange={handleChange}
              />
              {errors.costPrice && <div className='invalid-feedback'>{errors.costPrice}</div>}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-4'>
              <label htmlFor='commissionPercentage' className='form-label'>Commission %</label>
              <input
                type='number'
                step='0.01'
                className='form-control'
                id='commissionPercentage'
                name='commissionPercentage'
                value={formData.commissionPercentage}
                onChange={handleChange}
              />
            </div>
            <div className='col-md-4'>
              <label htmlFor='taxPercentage' className='form-label'>Tax %</label>
              <input
                type='number'
                step='0.01'
                className='form-control'
                id='taxPercentage'
                name='taxPercentage'
                value={formData.taxPercentage}
                onChange={handleChange}
              />
            </div>
            <div className='col-md-4'>
              <label htmlFor='astPercentage' className='form-label'>AST %</label>
              <input
                type='number'
                step='0.01'
                className='form-control'
                id='astPercentage'
                name='astPercentage'
                value={formData.astPercentage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label htmlFor='openingStock' className='form-label'>Opening Stock</label>
              <input
                type='number'
                className='form-control'
                id='openingStock'
                name='openingStock'
                value={formData.openingStock}
                onChange={handleChange}
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='blocked' className='form-label'>Blocked</label>
              <input
                type='number'
                className='form-control'
                id='blocked'
                name='blocked'
                value={formData.blocked}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <button type='button' className='btn btn-secondary' onClick={onCancel}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              {product ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm; 