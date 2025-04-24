import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import decode from 'jwt-decode';

import { store } from '../store';
import { setToken, setCurrentUser, addError } from '../store/actions';

import NavBar from './NavBar';
import RouteViews from './RouteViews';
import '../styles/theme.css';

// Create a global style element for Tamil Nadu app theme
const setupGlobalStyle = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      background-color: var(--tn-background);
      margin: 0;
      padding: 0;
      font-family: 'Inter', 'Noto Sans Tamil', sans-serif;
      line-height: 1.5;
    }
    
    #root {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .tn-app {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-image: 
        linear-gradient(to bottom, 
          rgba(248, 249, 250, 0.97), 
          rgba(248, 249, 250, 0.97)
        );
      position: relative;
    }
    
    .tn-app::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 200px;
      background-image: linear-gradient(to bottom, transparent, var(--tn-primary));
      opacity: 0.1;
      pointer-events: none;
      z-index: 0;
    }
    
    /* Override any existing container styles */
    .container {
      max-width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      width: 100% !important;
    }
    
    main {
      flex: 1;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);
};

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}

// Initialize global styles
setupGlobalStyle();

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="tn-app">
        <NavBar />
        <RouteViews />
      </div>
    </Router>
  </Provider>
);

export default App;
