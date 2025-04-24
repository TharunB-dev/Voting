import React from 'react';

import ErrorMessage from '../components/ErrorMessage';
import TNHomePage from '../components/HomePage';
import '../styles/theme.css';

const HomePage = props => (
  <div>
    <ErrorMessage />
    <TNHomePage {...props} />
  </div>
);

export default HomePage;
