import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { authUser } from '../store/actions';
import ErrorMessage from './ErrorMessage';
import '../styles/theme.css';

const AuthForm = ({ authType, authUser, error, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [voterID, setVoterID] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [constituency, setConstituency] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const isRegister = authType === 'register';
  const title = isRegister ? 'Register' : 'Login';
  const tamilTitle = isRegister ? 'பதிவு செய்க' : 'உள்நுழைய';
  
  const constituencies = [
    'Chennai South',
    'Chennai North',
    'Chennai Central',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Tirunelveli',
    'Vellore',
    'Kancheepuram'
  ];

  const handleSubmit = e => {
    e.preventDefault();
    
    const data = { username, password };
    
    if (isRegister) {
      Object.assign(data, { 
        voter_id: voterID,
        aadhaar,
        constituency,
        phone_number: phoneNumber
      });
    }
    
    authUser(authType, data)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        // Error handling is managed by Redux
      });
  };

  return (
    <div className="tn-auth-page tn-temple-bg">
      <div className="tn-kolam-bg"></div>
      <div className="tn-container">
        <div className="tn-auth-container">
          <div className="tn-auth-card tn-glass">
            <div className="tn-auth-header">
              <div className="tn-auth-title-container">
                <h2 className="tn-auth-title">{title}</h2>
                <span className="tn-tamil-text tn-auth-title-tamil">{tamilTitle}</span>
              </div>
              <div className="tn-govt-logo-container">
                <img src="/images/tn-govt-logo.png" alt="Tamil Nadu Government Logo" className="tn-auth-govt-logo" />
              </div>
            </div>
            
            <div className="tn-auth-body">
              <form onSubmit={handleSubmit} className="tn-auth-form">
                <div className="tn-form-group">
                  <label htmlFor="username" className="tn-form-label">
                    Username
                    <span className="tn-tamil-text tn-form-label-tamil"> (பயனர்பெயர்)</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="tn-form-control"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                  />
                </div>
                
                <div className="tn-form-group">
                  <label htmlFor="password" className="tn-form-label">
                    Password
                    <span className="tn-tamil-text tn-form-label-tamil"> (கடவுச்சொல்)</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="tn-form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    required
                  />
                </div>
                
                {isRegister && (
                  <React.Fragment>
                    <div className="tn-form-group">
                      <label htmlFor="voterID" className="tn-form-label">
                        Voter ID
                        <span className="tn-tamil-text tn-form-label-tamil"> (வாக்காளர் அடையாள அட்டை)</span>
                      </label>
                      <input
                        type="text"
                        id="voterID"
                        className="tn-form-control"
                        value={voterID}
                        onChange={e => setVoterID(e.target.value)}
                        placeholder="Enter your Voter ID"
                        autoComplete="off"
                        required
                      />
                    </div>
                    
                    <div className="tn-form-group">
                      <label htmlFor="aadhaar" className="tn-form-label">
                        Aadhaar Number
                        <span className="tn-tamil-text tn-form-label-tamil"> (ஆதார் எண்)</span>
                      </label>
                      <input
                        type="text"
                        id="aadhaar"
                        className="tn-form-control"
                        value={aadhaar}
                        onChange={e => setAadhaar(e.target.value)}
                        placeholder="Enter your Aadhaar number"
                        autoComplete="off"
                        required
                      />
                    </div>
                    
                    <div className="tn-form-group">
                      <label htmlFor="constituency" className="tn-form-label">
                        Constituency
                        <span className="tn-tamil-text tn-form-label-tamil"> (தொகுதி)</span>
                      </label>
                      <select
                        id="constituency"
                        className="tn-form-control"
                        value={constituency}
                        onChange={e => setConstituency(e.target.value)}
                        required
                      >
                        <option value="">Select your constituency</option>
                        {constituencies.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="tn-form-group">
                      <label htmlFor="phoneNumber" className="tn-form-label">
                        Phone Number
                        <span className="tn-tamil-text tn-form-label-tamil"> (தொலைபேசி எண்)</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        className="tn-form-control"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </React.Fragment>
                )}
                
                {error && <ErrorMessage error={error} />}
                
                <div className="tn-form-group">
                  <button type="submit" className="tn-btn tn-btn-premium tn-btn-premium-primary tn-btn-premium-block">
                    {isRegister ? (
                      <React.Fragment>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Register
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Login
                      </React.Fragment>
                    )}
                  </button>
                </div>
                
                {isRegister && (
                  <div className="tn-feature-ribbon">
                    <span className="tn-feature-ribbon-content new">New</span>
                  </div>
                )}
              </form>
              
              <div className="tn-auth-footer">
                {isRegister ? (
                  <p>
                    Already have an account?{' '}
                    <a href="/login" className="tn-auth-link">Login</a>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{' '}
                    <a href="/register" className="tn-auth-link">Register</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(
  connect(
    store => ({
      error: store.error
    }),
    { authUser }
  )(AuthForm)
);

// Add this CSS to your theme.css file or create a separate auth.css
const style = document.createElement('style');
style.innerHTML = `
  .tn-auth-page {
    min-height: calc(100vh - 100px);
    padding: 4rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--tn-background);
    position: relative;
  }
  
  .tn-auth-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(19, 136, 8, 0.1) 100%);
    z-index: 1;
  }
  
  .tn-auth-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .tn-auth-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.9);
  }
  
  .tn-auth-header {
    background-color: var(--tn-primary);
    padding: 1.5rem;
    color: white;
    text-align: center;
  }
  
  .tn-auth-title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tn-auth-title {
    margin: 0;
    font-size: 1.75rem;
    color: white;
  }
  
  .tn-auth-title-tamil {
    font-size: 1.25rem;
    margin-top: 0.25rem;
    opacity: 0.9;
  }
  
  .tn-auth-body {
    padding: 2rem;
  }
  
  .tn-auth-form {
    margin-bottom: 1.5rem;
  }
  
  .tn-form-label-tamil {
    font-size: 0.875rem;
    opacity: 0.8;
  }
  
  .tn-btn-block {
    display: block;
    width: 100%;
    padding: 0.75rem;
    font-size: 1.125rem;
    margin-top: 1.5rem;
  }
  
  .tn-auth-footer {
    text-align: center;
    color: var(--tn-text-secondary);
    border-top: 1px solid var(--tn-border);
    padding-top: 1.5rem;
    margin-top: 1rem;
  }
  
  .tn-auth-link {
    color: var(--tn-primary);
    font-weight: 500;
    text-decoration: none;
  }
  
  .tn-auth-link:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 576px) {
    .tn-auth-page {
      padding: 2rem 0;
    }
    
    .tn-auth-body {
      padding: 1.5rem;
    }
  }
`;
document.head.appendChild(style); 