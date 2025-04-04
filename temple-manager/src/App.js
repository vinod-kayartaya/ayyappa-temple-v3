import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Categories from './pages/masters/Categories';
import Suppliers from './pages/masters/Suppliers';
import Products from './pages/masters/Products';
import Vazhipadu from './pages/masters/Vazhipadu';
import Deities from './pages/masters/Deities';
import OfferingCategories from './pages/masters/OfferingCategories';
import DonationCategories from './pages/masters/DonationCategories';
import Role from './pages/user/Role';
import User from './pages/user/User';
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordForm from './components/auth/ResetPasswordForm';
import Sales from './pages/billing/Sales';
import BillingDonations from './pages/billing/Donations';
import DevoteeOffering from './components/offerings/DevoteeOffering';
import ExpenseEntries from './pages/transactions/ExpenseEntries';
import ExpensesReport from './pages/reports/ExpensesReport';
import ExpenseCategories from './pages/masters/ExpenseCategories';
import Donations from './pages/transactions/Donations';
import TransactionSales from './pages/transactions/Sales';
import Offerings from './pages/transactions/Offerings';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to='/' />;
};

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/get-password-reset-link' element={<ResetPassword />} />
          <Route path='/reset-password' element={<ResetPasswordForm />} />
          <Route path='/about' element={<About />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Master Routes */}
          <Route
            path='/masters/categories'
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path='/masters/suppliers'
            element={
              <ProtectedRoute>
                <Suppliers />
              </ProtectedRoute>
            }
          />
          <Route
            path='/masters/products'
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path='/masters/vazhipadu'
            element={
              <ProtectedRoute>
                <Vazhipadu />
              </ProtectedRoute>
            }
          />
          <Route
            path='/masters/deities'
            element={
              <ProtectedRoute>
                <Deities />
              </ProtectedRoute>
            }
          />
          <Route
            path='/masters/offering-categories'
            element={
              <ProtectedRoute>
                <OfferingCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path='/masters/expense-categories'
            element={
              <ProtectedRoute>
                <ExpenseCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path='/masters/donation-categories'
            element={
              <ProtectedRoute>
                <DonationCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/roles'
            element={
              <ProtectedRoute>
                <Role />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/users'
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path='/transactions/offerings'
            element={
              <ProtectedRoute>
                <Offerings />
              </ProtectedRoute>
            }
          />
          <Route
            path='/transactions/expenses'
            element={
              <ProtectedRoute>
                <ExpenseEntries />
              </ProtectedRoute>
            }
          />
          <Route
            path='/transactions/donations'
            element={
              <ProtectedRoute>
                <Donations />
              </ProtectedRoute>
            }
          />
          <Route
            path='/transactions/sales'
            element={
              <ProtectedRoute>
                <TransactionSales />
              </ProtectedRoute>
            }
          />
          {/* Billing Routes */}
          <Route
            path='/billing/vazhipadu'
            element={
              <ProtectedRoute>
                <DevoteeOffering />
              </ProtectedRoute>
            }
          />
          <Route
            path='/billing/sales'
            element={
              <ProtectedRoute>
                <Sales />
              </ProtectedRoute>
            }
          />
          <Route
            path='/billing/donations'
            element={
              <ProtectedRoute>
                <BillingDonations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/expenses"
            element={
              <ProtectedRoute>
                <ExpensesReport />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
