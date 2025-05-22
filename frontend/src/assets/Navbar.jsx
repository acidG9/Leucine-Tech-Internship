import { Link, useNavigate } from 'react-router-dom';
import { logout } from './logout';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav className="navbar">
      <h2>User Access Management</h2>

      <ul className="nav-links">
        {!token && (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

        {token && (
          <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
