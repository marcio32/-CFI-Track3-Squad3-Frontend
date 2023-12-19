// MainScreen.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserCard from '../UserCard/UserCard';
import AccountCard from '../AccountCard/AccountCard';
import { AuthContext } from '../../Auth/AuthContext';


const MainScreen = () => {
  const [userData, setUserData] = useState(null);
  const {isLogged} = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://localhost:7203/api/Accounts/GetAccountId/2', {headers:{"Authorization":`Baerer ${isLogged.token}`}}); //se agrega autorization con token para el endpoint potegido
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container">
      <div className="main-content">
        <h1>Perfil de Usuario</h1>
        <div className="side-cards">
        {userData ? (
          <>
            <div className="card1">
              <UserCard userId={userData.userId} />
            </div>
            <div className="card2">
              <AccountCard money={userData.money} id={userData.id} />
            </div>
          </>
        ) : (
          <p className="loading">Cargando...</p>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default MainScreen;
