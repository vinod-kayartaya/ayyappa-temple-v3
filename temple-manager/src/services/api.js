const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Categories API
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error('Failed to create category');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error('Failed to update category');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete category');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Suppliers API
export const fetchSuppliers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/suppliers`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch suppliers');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createSupplier = async (supplierData) => {
  try {
    const response = await fetch(`${BASE_URL}/suppliers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(supplierData),
    });

    if (!response.ok) {
      throw new Error('Failed to create supplier');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateSupplier = async (id, supplierData) => {
  try {
    const response = await fetch(`${BASE_URL}/suppliers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(supplierData),
    });

    if (!response.ok) {
      throw new Error('Failed to update supplier');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/suppliers/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete supplier');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Deities API
export const fetchDeities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/deities`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch deities');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createDeity = async (deityData) => {
  try {
    const response = await fetch(`${BASE_URL}/deities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(deityData),
    });

    if (!response.ok) {
      throw new Error('Failed to create deity');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateDeity = async (id, deityData) => {
  try {
    const response = await fetch(`${BASE_URL}/deities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(deityData),
    });

    if (!response.ok) {
      throw new Error('Failed to update deity');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteDeity = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/deities/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete deity');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Products API
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Offering Categories API
export const fetchOfferingCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/offering-categories`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch offering categories');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createOfferingCategory = async (offeringCategoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/offering-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(offeringCategoryData),
    });

    if (!response.ok) {
      throw new Error('Failed to create offering category');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateOfferingCategory = async (id, offeringCategoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/offering-categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(offeringCategoryData),
    });

    if (!response.ok) {
      throw new Error('Failed to update offering category');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteOfferingCategory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/offering-categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete offering category');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Vazhipadu API
export const fetchVazhipadus = async () => {
  try {
    const response = await fetch(`${BASE_URL}/vazhipadu`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vazhipadus');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createVazhipadu = async (vazhipaduData) => {
  try {
    const response = await fetch(`${BASE_URL}/vazhipadu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(vazhipaduData),
    });

    if (!response.ok) {
      throw new Error('Failed to create vazhipadu');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateVazhipadu = async (id, vazhipaduData) => {
  try {
    const response = await fetch(`${BASE_URL}/vazhipadu/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(vazhipaduData),
    });

    if (!response.ok) {
      throw new Error('Failed to update vazhipadu');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteVazhipadu = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/vazhipadu/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete vazhipadu');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const fetchVazhipaduById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/vazhipadus/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vazhipadu details');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Roles API
export const fetchRoles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/roles`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch roles');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await fetch(`${BASE_URL}/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) {
      throw new Error('Failed to create role');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateRole = async (id, roleData) => {
  try {
    const response = await fetch(`${BASE_URL}/roles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(roleData),
    });

    if (!response.ok) {
      throw new Error('Failed to update role');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/roles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete role');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Users API
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Password reset request failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/update-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        newPassword,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Password reset failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getDevoteeNames = async (phoneNumber) => {
  try {
    const response = await fetch(
      `${BASE_URL}/devotee-offerings/devotee-names?phoneNumber=${phoneNumber}`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('authState')).token
          }`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch devotee names');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getVazhipaduByCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/vazhipadu/by-code/${code}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vazhipadu');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createDevoteeOffering = async (offeringData) => {
  try {
    const response = await fetch(`${BASE_URL}/devotee-offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(offeringData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create offering');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchDevoteeOfferings = async (startDate, endDate) => {
  try {
    let url = `${BASE_URL}/devotee-offerings`;
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch offerings');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchExpensesReport = async (startDate, endDate, expenseType) => {
  let url = `${process.env.REACT_APP_API_URL}/cash-expenses?startDate=${startDate}&endDate=${endDate}`;
  
  if (expenseType !== 'ALL') {
    url += `&expenseType=${expenseType}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch expenses report');
  }

  return response.json();
};

// Add these functions alongside other API functions
export const fetchExpenseCategories = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/expense-categories`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch expense categories');
  }
  return response.json();
};

export const createExpenseCategory = async (categoryData) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/expense-categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
    },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create expense category');
  }
  return response.json();
};

export const updateExpenseCategory = async (id, categoryData) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/expense-categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
    },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update expense category');
  }
  return response.json();
};

export const deleteExpenseCategory = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/expense-categories/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete expense category');
  }
};

// Donation Categories API
export const fetchDonationCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/donation-categories`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch donation categories');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createDonationCategory = async (categoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/donation-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error('Failed to create donation category');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateDonationCategory = async (id, categoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/donation-categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error('Failed to update donation category');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteDonationCategory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/donation-categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete donation category');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Donations API
export const fetchDonations = async ({ page = 0, size = 10, startDate, endDate }) => {
  try {
    let url = `${BASE_URL}/donations?page=${page}&size=${size}`;
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch donations');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createDonation = async (donationData) => {
  try {
    const response = await fetch(`${BASE_URL}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(donationData),
    });

    if (!response.ok) {
      throw new Error('Failed to create donation');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateDonation = async (id, donationData) => {
  try {
    const response = await fetch(`${BASE_URL}/donations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(donationData),
    });

    if (!response.ok) {
      throw new Error('Failed to update donation');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteDonation = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/donations/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete donation');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const fetchProductByCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/products/code/${code}`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product by code');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createSale = async (saleData) => {
  try {
    const response = await fetch(`${BASE_URL}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(saleData),
    });

    if (!response.ok) {
      throw new Error('Failed to create sale');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchSales = async (params = {}) => {
  try {
    const { page = 0, size = 10, startDate, endDate } = params;
    let url = `${BASE_URL}/sales?page=${page}&size=${size}`;
    
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('authState')
            ? JSON.parse(localStorage.getItem('authState')).token
            : ''
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sales');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateSale = async (id, saleData) => {
  try {
    const response = await fetch(`${BASE_URL}/sales/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(saleData),
    });

    if (!response.ok) {
      throw new Error('Failed to update sale');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteSale = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/sales/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete sale');
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const updateDevoteeOffering = async (id, offeringData) => {
  try {
    const response = await fetch(`${BASE_URL}/devotee-offerings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(offeringData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update offering');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const printBill = async (billData) => {
  try {
    const response = await fetch('http://localhost:5000/print-offerings-bill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('authState')).token
        }`,
      },
      body: JSON.stringify(billData),
    });

    if (!response.ok) {
      throw new Error('Failed to print bill');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const printSalesBill = async (saleData) => {
  try {
    const response = await fetch('http://localhost:5000/print-sales-bill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
      },
      body: JSON.stringify(saleData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to print receipt');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
