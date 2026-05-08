import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-brand">
          TaskOrbit
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link badge badge-admin">
                  Admin Panel
                </Link>
              )}
              <span className="nav-link">Hello, {user.name}</span>
              <button onClick={onLogout} className="btn btn-danger flex items-center" style={{ padding: '0.5rem 1rem' }}>
                <FiLogOut style={{ marginRight: '0.5rem' }} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
