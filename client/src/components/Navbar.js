import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../store/actions';
import '../styles/theme.css';

const Navbar = ({ auth, logout }) => {
  const [menuActive, setMenuActive] = useState(false);
  
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className={`tn-navbar ${menuActive ? 'active' : ''}`}>
      <div className="tn-container">
        <div className="tn-navbar-content">
          <Link to="/" className="tn-navbar-brand">
            <img 
              src="/images/tn-govt-logo.png" 
              alt="Tamil Nadu Government" 
              className="tn-navbar-logo"
              onError={(e) => {
                e.target.onerror = null;
                // Try SVG as fallback
                e.target.src = "/images/tn-govt-logo.svg";
                // If that fails too, show text fallback
                e.target.onerror = () => {
                  e.target.style.display = "none";
                  document.querySelector('.tn-logo-fallback').style.display = "flex";
                };
              }}
            />
            <div className="tn-logo-fallback" style={{
              width: "40px",
              height: "40px",
              backgroundColor: "var(--tn-primary)",
              color: "white",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              marginRight: "1rem",
              fontWeight: "bold",
              fontSize: "16px"
            }}>TN</div>
            <div className="tn-brand-text">
              <span className="tn-brand-name">TN E-Vote</span>
              <span className="tn-tamil-text tn-brand-tamil">தமிழ்நாடு மின்-வாக்குப்பதிவு</span>
            </div>
          </Link>
          
          <div className="tn-navbar-links">
            <Link to="/" className="tn-nav-link">Home</Link>
            <Link to="/polls" className="tn-nav-link">Constituencies</Link>
            <Link to="/rules" className="tn-nav-link">Rules</Link>
            <Link to="/tn-vote" className="tn-nav-link">Vote Now</Link>
            {auth.isAuthenticated && (
              <Link to="/polls/new" className="tn-nav-link">New Poll</Link>
            )}
            {auth.isAuthenticated && (
              <Link to="/results" className="tn-nav-link">Results</Link>
            )}
          </div>
          
          <div className="tn-navbar-auth">
            {!auth.isAuthenticated ? (
              <React.Fragment>
                <Link to="/register" className="tn-btn tn-btn-premium tn-btn-premium-outline tn-btn-sm">
                  <React.Fragment>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Register
                  </React.Fragment>
                </Link>
                <Link to="/login" className="tn-btn tn-btn-premium tn-btn-premium-primary tn-btn-sm">
                  <React.Fragment>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Login
                  </React.Fragment>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span className="tn-user-greeting">
                  <span className="tn-greeting-text">Welcome, </span>
                  <strong>{auth.user.username}</strong>
                </span>
                <button onClick={logout} className="tn-btn tn-btn-premium tn-btn-premium-secondary tn-btn-sm">
                  <React.Fragment>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Logout
                  </React.Fragment>
                </button>
              </React.Fragment>
            )}
          </div>
          
          <button className="tn-navbar-toggle" aria-label="Toggle navigation" onClick={toggleMenu}>
            <span className="tn-navbar-toggle-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default connect(
  store => ({
    auth: store.auth,
  }),
  { logout }
)(Navbar);

// Add this CSS to your theme.css or create a separate navbar.css file
const style = document.createElement('style');
style.innerHTML = `
  .tn-navbar {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .tn-navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    position: relative;
  }
  
  .tn-navbar-brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--tn-primary);
  }
  
  .tn-navbar-logo {
    height: 40px;
    margin-right: 1rem;
  }
  
  .tn-brand-text {
    display: flex;
    flex-direction: column;
  }
  
  .tn-brand-name {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.2;
  }
  
  .tn-brand-tamil {
    font-size: 0.85rem;
    color: var(--tn-text-secondary);
  }
  
  .tn-navbar-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .tn-nav-link {
    color: var(--tn-text-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    position: relative;
  }
  
  .tn-nav-link:hover {
    color: var(--tn-primary);
  }
  
  .tn-nav-link:hover::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--tn-primary);
    transition: width 0.2s;
  }
  
  .tn-navbar-auth {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .tn-user-greeting {
    display: flex;
    align-items: center;
    color: var(--tn-text-secondary);
    margin-right: 0.5rem;
  }
  
  .tn-greeting-text {
    margin-right: 0.25rem;
  }
  
  .tn-btn-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
  
  .tn-navbar-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .tn-navbar-toggle-icon {
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--tn-text-primary);
    position: relative;
  }
  
  .tn-navbar-toggle-icon::before,
  .tn-navbar-toggle-icon::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: var(--tn-text-primary);
    left: 0;
  }
  
  .tn-navbar-toggle-icon::before {
    top: -6px;
  }
  
  .tn-navbar-toggle-icon::after {
    bottom: -6px;
  }
  
  @media (max-width: 768px) {
    .tn-navbar-links,
    .tn-navbar-auth {
      display: none;
    }
    
    .tn-navbar-toggle {
      display: block;
    }
    
    .tn-navbar.active .tn-navbar-links,
    .tn-navbar.active .tn-navbar-auth {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      gap: 1rem;
      z-index: 100;
    }
    
    .tn-navbar.active .tn-navbar-auth {
      padding-top: 0;
    }
    
    .tn-brand-tamil {
      display: none;
    }
  }
`;
document.head.appendChild(style); 