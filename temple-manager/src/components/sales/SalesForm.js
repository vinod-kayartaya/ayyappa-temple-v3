import React, { useState, useEffect, useRef } from 'react';
import { fetchProductByCode, createSale, printSalesBill } from '../../services/api';
import { toast } from 'react-toastify';

function SalesForm({ sale, onSubmit, onCancel }) {
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [saleItems, setSaleItems] = useState([{
    id: Date.now(),
    productId: '',
    productCode: '',
    productName: '',
    quantity: 1,
    unitPrice: 0,
    total: 0
  }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [shouldPrint, setShouldPrint] = useState(true);
  const [printLoading, setPrintLoading] = useState(false);
  
  const customerNameInputRef = useRef(null);
  const customerMobileInputRef = useRef(null);
  const saleDateInputRef = useRef(null);
  const productCodeInputRefs = useRef({});
  const quantityInputRefs = useRef({});

  // Add escape key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  // Focus on customer name field when component mounts
  useEffect(() => {
    setTimeout(() => {
      if (customerNameInputRef.current) {
        customerNameInputRef.current.focus();
      }
    }, 100);
  }, []);

  // Populate form with sale data if editing
  useEffect(() => {
    if (sale) {
      setCustomerName(sale.customerName || '');
      setCustomerMobile(sale.customerMobile || '');
      setSaleDate(new Date(sale.saleDate).toISOString().split('T')[0]);
      
      if (sale.items && sale.items.length > 0) {
        setSaleItems(sale.items.map(item => ({
          id: item.id || Date.now() + Math.random(),
          productId: item.productId,
          productCode: item.productCode,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.totalPrice || (item.quantity * item.unitPrice)
        })));
      }
    }
  }, [sale]);
  
  const addSaleItemRow = (rowId = Date.now()) => {
    setSaleItems((prev) => [
      ...prev,
      {
        id: rowId,
        productId: '',
        productCode: '',
        productName: '',
        quantity: 1,
        unitPrice: 0,
        total: 0
      }
    ]);

    // Focus on the new row's product code input after a short delay
    setTimeout(() => {
      if (productCodeInputRefs.current[rowId]) {
        productCodeInputRefs.current[rowId].focus();
      }
    }, 0);
  };

  const handleCustomerNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      customerMobileInputRef.current.focus();
    }
  };

  const handleCustomerMobileKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saleDateInputRef.current.focus();
    }
  };

  const handleSaleDateKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Focus on the first product code input
      const firstItemId = saleItems[0]?.id;
      if (firstItemId && productCodeInputRefs.current[firstItemId]) {
        productCodeInputRefs.current[firstItemId].focus();
      }
    }
  };

  const handleProductCodeSubmit = async (e, rowId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const productCode = e.target.value.trim();
      if (!productCode) return;

      try {
        // Find product by code using API
        const product = await fetchProductByCode(productCode);
        
        setSaleItems((prev) =>
          prev.map((item) => {
            if (item.id === rowId) {
              return {
                ...item,
                productId: product.id,
                productCode: product.code,
                productName: product.name,
                unitPrice: product.price,
                total: product.price * item.quantity
              };
            }
            return item;
          })
        );

        // Focus quantity input after a short delay
        setTimeout(() => {
          if (quantityInputRefs.current[rowId]) {
            quantityInputRefs.current[rowId].focus();
          }
        }, 0);
      } catch (err) {
        setError(`Product with code ${productCode} not found`);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handleQuantityChange = (e, rowId) => {
    const value = e.target.value;
    const quantity = value === '' ? '' : (parseInt(value) || 1);
    
    setSaleItems((prev) =>
      prev.map((item) => {
        if (item.id === rowId) {
          const total = item.unitPrice * (quantity || 0);
          return {
            ...item,
            quantity,
            total
          };
        }
        return item;
      })
    );
  };

  const handleQuantitySubmit = (e, rowId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Ensure quantity is at least 1 when moving to next row
      setSaleItems(prev => 
        prev.map(item => 
          item.id === rowId && (!item.quantity || item.quantity === '') 
            ? { ...item, quantity: 1, total: item.unitPrice * 1 }
            : item
        )
      );

      // Add a new row if this is the last row
      const currentIndex = saleItems.findIndex(item => item.id === rowId);
      if (currentIndex === saleItems.length - 1) {
        const newRowId = Date.now();
        addSaleItemRow(newRowId);
        
        // Focus will be set by addSaleItemRow
      } else if (currentIndex < saleItems.length - 1) {
        // If not the last row, focus on the next row's product code input
        const nextRowId = saleItems[currentIndex + 1]?.id;
        if (nextRowId && productCodeInputRefs.current[nextRowId]) {
          productCodeInputRefs.current[nextRowId].focus();
        }
      }
    }
  };

  const handleDelete = (rowId) => {
    setSaleItems((prev) => prev.filter((item) => item.id !== rowId));
  };

  const calculateTotal = () => {
    return saleItems.reduce((sum, item) => sum + item.total, 0);
  };

  const handlePrint = async (saleData) => {
    try {
      setPrintLoading(true);
      const response = await printSalesBill(saleData);
      toast.success(response.message || 'Receipt printed successfully');
    } catch (err) {
      console.error('Print error:', err);
      toast.error(err.message || 'Failed to print receipt');
    } finally {
      setPrintLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      // Validate form
      if (!customerName.trim()) {
        setError('Customer name is required');
        return;
      }

      if (!customerMobile.trim()) {
        setError('Customer mobile is required');
        return;
      }

      // Validate items
      const validItems = saleItems.filter(item => item.productId && item.quantity > 0);
      if (validItems.length === 0) {
        setError('At least one valid item is required');
        return;
      }

      setLoading(true);
      setError('');

      // Format the date to ISO-8601 format with time
      const formattedDate = new Date(saleDate);
      formattedDate.setHours(new Date().getHours());
      formattedDate.setMinutes(new Date().getMinutes());
      formattedDate.setSeconds(new Date().getSeconds());
      
      const saleData = {
        customerName,
        customerMobile,
        saleDate: formattedDate.toISOString(), // ISO-8601 format
        items: validItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        }))
      };

      // If editing, include the ID
      if (sale && sale.id) {
        saleData.id = sale.id;
      }

      // Use the onSubmit prop if provided (for transactions page)
      if (onSubmit) {
        onSubmit(saleData);
        return;
      }

      // Use the createSale API directly when used standalone
      const savedSale = await createSale(saleData);
      
      setSuccessMessage('Sale recorded successfully');

      // Print receipt if checkbox is checked (in add mode)
      if (shouldPrint) {
        await handlePrint(savedSale);
      }
      
      // Reset form
      setCustomerName('');
      setCustomerMobile('');
      setSaleDate(new Date().toISOString().split('T')[0]);
      setSaleItems([{
        id: Date.now(),
        productId: '',
        productCode: '',
        productName: '',
        quantity: 1,
        unitPrice: 0,
        total: 0
      }]);
      
      // Focus back on customer name field
      setTimeout(() => {
        if (customerNameInputRef.current) {
          customerNameInputRef.current.focus();
        }
      }, 100);
      
      // Clear success message after delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Save error:', err);
      setError(err.message || 'Failed to save sale');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='card mt-4 border-0'>
        <div className='card-body'>
          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}

          {successMessage && (
            <div className='alert alert-success' role='alert'>
              {successMessage}
            </div>
          )}

          {sale && (
            <div className='mb-4'>
              <h6 className='text-muted'>Bill #{sale.billNumber}</h6>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='row mb-3'>
              <div className='col-md-4'>
                <div className='mb-3'>
                  <label className='form-label'>Customer Name:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    onKeyPress={handleCustomerNameKeyPress}
                    placeholder='Enter customer name'
                    required
                    ref={customerNameInputRef}
                  />
                </div>
              </div>
              
              <div className='col-md-4'>
                <div className='mb-3'>
                  <label className='form-label'>Mobile Number:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                    onKeyPress={handleCustomerMobileKeyPress}
                    placeholder='Enter mobile number'
                    required
                    ref={customerMobileInputRef}
                  />
                </div>
              </div>

              <div className='col-md-4'>
                <div className='mb-3'>
                  <label className='form-label'>Sale Date:</label>
                  <input
                    type='date'
                    className='form-control'
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    onKeyPress={handleSaleDateKeyPress}
                    ref={saleDateInputRef}
                  />
                </div>
              </div>
            </div>

            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Product Code*</th>
                    <th>Product Name</th>
                    <th>Quantity*</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {saleItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          ref={(el) => (productCodeInputRefs.current[item.id] = el)}
                          type='text'
                          className='form-control'
                          value={item.productCode}
                          onChange={(e) => {
                            setSaleItems((prev) =>
                              prev.map((i) =>
                                i.id === item.id
                                  ? { ...i, productCode: e.target.value }
                                  : i
                              )
                            );
                          }}
                          onKeyPress={(e) => handleProductCodeSubmit(e, item.id)}
                          placeholder='Enter code & press Enter'
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          className='form-control'
                          value={item.productName}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          className='form-control'
                          value={item.quantity}
                          ref={(el) => (quantityInputRefs.current[item.id] = el)}
                          onChange={(e) => handleQuantityChange(e, item.id)}
                          onKeyPress={(e) => handleQuantitySubmit(e, item.id)}
                        />
                      </td>
                      <td>
                        <input
                          type='number'
                          className='form-control'
                          value={item.unitPrice}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type='number'
                          className='form-control'
                          value={item.total}
                          readOnly
                        />
                      </td>
                      <td className="align-middle">
                        <button 
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='d-flex justify-content-between align-items-center mt-3'>
              <div className='d-flex align-items-center gap-3'>
                <button
                  type="button"
                  className='btn btn-secondary'
                  onClick={() => addSaleItemRow()}
                  disabled={loading}
                >
                  + Add Product
                </button>

                {!sale && (
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="printReceipt"
                      checked={shouldPrint}
                      onChange={(e) => setShouldPrint(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="printReceipt">
                      Print receipt
                    </label>
                  </div>
                )}
              </div>

              <div className='text-end'>
                <div className='h5 mb-3'>
                  Total Amount: ₹{calculateTotal()}
                </div>
                <div className="d-flex gap-2 justify-content-end">
                  {sale && (
                    <button
                      type="button"
                      className='btn btn-info'
                      onClick={() => handlePrint(sale)}
                      disabled={printLoading}
                    >
                      {printLoading ? (
                        <>
                          <span
                            className='spinner-border spinner-border-sm me-2'
                            role='status'
                            aria-hidden='true'
                          ></span>
                          Printing...
                        </>
                      ) : (
                        'Print Receipt'
                      )}
                    </button>
                  )}
                  
                  {onCancel && (
                    <button
                      type="button"
                      className='btn btn-secondary'
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className='btn btn-primary'
                    disabled={loading || saleItems.length === 0}
                  >
                    {loading ? (
                      <>
                        <span
                          className='spinner-border spinner-border-sm me-2'
                          role='status'
                          aria-hidden='true'
                        ></span>
                        Saving...
                      </>
                    ) : (
                      sale ? 'Update' : 'Save'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesForm; 