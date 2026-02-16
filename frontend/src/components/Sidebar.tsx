import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../auth/authService';
import '../assets/styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar-container">
      <h3 className="sidebar-brand">FinTrack</h3>

      <div className="sidebar-top-actions">
        <button
          className="sidebar-top-icon"
          data-tooltip="AI Support"
          onClick={() => navigate('/ai-insights')}
        >
          <i className="bi bi-robot"></i>
        </button>

        <button
          className="sidebar-top-icon"
          data-tooltip="Settings"
          onClick={() => navigate('/settings')}
        >
          <i className="bi bi-gear"></i>
        </button>

        <button
          className="sidebar-top-icon logout-mini"
          data-tooltip="Logout"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>

      <hr className="sidebar-divider" />

      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <a className="sidebar-link" href="/dashboard">
            <i className="bi bi-speedometer2 sidebar-icon"></i>
            Dashboard
          </a>
        </li>

        <li className="sidebar-item">
          <div
            className="sidebar-link sidebar-dropdown-toggle"
            onClick={() => toggleMenu('transactions')}
          >
            <i className="bi bi-wallet2 sidebar-icon"></i>
            Transactions
            <i
              className={`bi ${openMenu === 'transactions' ? 'bi-chevron-up ml-auto' : 'bi-chevron-down ml-auto'
                }`}
            ></i>
          </div>
          <ul
            className={`sidebar-dropdown ${openMenu === 'transactions' ? 'sidebar-dropdown-open' : ''
              }`}
          >
            <li className="sidebar-dropdown-item">
              <Link className="sidebar-link" to="/transactions">
                View Transactions
              </Link>
            </li>
          </ul>
        </li>

        <li className="sidebar-item">
          <div
            className="sidebar-link sidebar-dropdown-toggle"
            onClick={() => toggleMenu('reports')}
          >
            <i className="bi bi-graph-up sidebar-icon"></i>
            Reports
            <i
              className={`bi ${openMenu === 'reports' ? 'bi-chevron-up ml-auto' : 'bi-chevron-down ml-auto'
                }`}
            ></i>
          </div>
          <ul
            className={`sidebar-dropdown ${openMenu === 'reports' ? 'sidebar-dropdown-open' : ''
              }`}
          >
            <li className="sidebar-dropdown-item">
              <Link to="/reports/monthly" className="sidebar-link">
                Monthly
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link to="/reports/annual" className="sidebar-link">
                Annual
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;