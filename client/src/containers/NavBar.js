import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../store/actions';
import Navbar from '../components/Navbar';
import '../styles/theme.css';

const NavBarContainer = ({ auth, logout }) => (
  <Navbar auth={auth} logout={logout} />
);

export default connect(
  store => ({
    auth: store.auth,
  }),
  { logout },
)(NavBarContainer);
