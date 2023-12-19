// Layout.js
import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { types } from '../../types/types';
import Login from '../Login/Login';
import MainScreen from '../mainScreen/mainScreen';
import Navbar from '../Navbar/Navbar'


function Layout() {
  const { isLogged, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('isLogged');
    dispatch({ type: types.logout });
  };

  return (
    <>
      {isLogged.logged ? (
        <>
          <Navbar handleLogout={handleLogout} />
          <MainScreen />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Layout;
