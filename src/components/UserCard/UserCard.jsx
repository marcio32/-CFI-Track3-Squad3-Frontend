import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';

function UserCard() {
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
   
    console.log('UserCard mounted');
  }, []);

  return (
    <div>
      {isLogged && isLogged.logged ? (
        <div>
          <h2>Bienvenido</h2>
          <p> {isLogged.data.firstName}</p>
          <p> {isLogged.data.lastName}</p>
        </div>
      ) : (
        <p>No se ha iniciado sesión</p>
      )}
    </div>
  );
}

export default UserCard;
