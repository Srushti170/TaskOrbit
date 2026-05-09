import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function DashboardHeader() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-header fade-in">
      <div className="header-greeting">
        <h1>Good Morning, {user?.name?.split(' ')[0] || 'User'}!</h1>
      </div>
      <div className="header-profile" onClick={handleLogout} title="Click to logout">
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=111827&color=fff`} 
            alt="Profile" 
            className="avatar" 
            style={{ width: '40px', height: '40px' }}
          />
          <span>{user?.name || 'User'}</span>
          <FiLogOut className="text-muted ml-2" />
      </div>
    </div>
  );
}

export default DashboardHeader;
