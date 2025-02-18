import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container'>
        <Link className='navbar-brand' to='/dashboard'>
          Temple Manager
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarMain'
          aria-controls='navbarMain'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarMain'>
          {isAuthenticated ? (
            <>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item dropdown'>
                  <button
                    className='nav-link dropdown-toggle border-0 bg-transparent'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Masters
                  </button>
                  <ul className='dropdown-menu'>
                    <li>
                      <Link className='dropdown-item' to='/masters/categories'>
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/masters/suppliers'>
                        Suppliers
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/masters/deities'>
                        Deities
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='dropdown-item'
                        to='/masters/offering-categories'
                      >
                        Offering Categories
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/masters/products'>
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/masters/vazhipadu'>
                        Vazhipadu
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className='nav-item dropdown'>
                  <button
                    className='nav-link dropdown-toggle border-0 bg-transparent'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Transactions
                  </button>
                  <ul className='dropdown-menu'>
                    <li>
                      <Link
                        className='dropdown-item'
                        to='/transactions/bookings'
                      >
                        Bookings
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='dropdown-item'
                        to='/transactions/donations'
                      >
                        Donations
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/transactions/offerings'>
                        Offerings
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className='nav-item dropdown'>
                  <button
                    className='nav-link dropdown-toggle border-0 bg-transparent'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    User Management
                  </button>
                  <ul className='dropdown-menu'>
                    <li>
                      <Link className='dropdown-item' to='/user/roles'>
                        Role
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/user/users'>
                        Users
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className='nav-item dropdown'>
                  <button
                    className='nav-link dropdown-toggle border-0 bg-transparent'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Utilities
                  </button>
                  <ul className='dropdown-menu'>
                    <li>
                      <Link className='dropdown-item' to='/utilities/backup'>
                        Backup
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/utilities/settings'>
                        Settings
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className='nav-item dropdown'>
                  <button
                    className='nav-link dropdown-toggle border-0 bg-transparent'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Reports
                  </button>
                  <ul className='dropdown-menu'>
                    <li>
                      <Link className='dropdown-item' to='/reports/bookings'>
                        Booking Reports
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/reports/donations'>
                        Donation Reports
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/reports/revenue'>
                        Revenue Reports
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className='navbar-nav ms-auto'>
                <li className='nav-item'>
                  <span className='nav-link'>
                    Welcome {user.firstname} {user.lastname}
                  </span>
                </li>
                <li className='nav-item'>
                  <button
                    className='btn btn-outline-light ms-2'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/about'>
                  About
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
