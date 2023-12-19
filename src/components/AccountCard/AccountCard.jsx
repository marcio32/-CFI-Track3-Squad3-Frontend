import React, { useState } from 'react';
import axios from 'axios';

const AccountCard = ({ money, id }) => {
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [transferData, setTransferData] = useState({
    amount: '',
    destinationAccountId: '',
  });

  const handleTransferClick = () => {
    setShowTransferForm(true);
  };

  const handleInputChange = (e) => {
    setTransferData({
      ...transferData,
      [e.target.name]: e.target.value,
    });
  };

  

    const handleTransferSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const loggedInUserData = JSON.parse(localStorage.getItem('isLogged'));
          const sourceAccountId = loggedInUserData.data.id;
      
          // Obtener datos de la cuenta de origen
          const sourceAccountResponse = await axios.get(`https://localhost:7203/api/Accounts/GetAccountId/${id}`);
          const sourceAccountData = sourceAccountResponse.data.data;
      
          // Verificar si hay suficiente dinero en la cuenta de origen
          if (sourceAccountData.money < transferData.amount) {
            console.error('No hay suficiente dinero en la cuenta de origen para realizar la transferencia.');
            return;
          }
      
          // Actualizar la cuenta de origen restando el monto transferido
          const updatedSourceAccountResponse = await axios.put(
            `https://localhost:7203/api/Accounts/UpdateAccount?id=${id}`,
            {
              money: sourceAccountData.money - transferData.amount,
            }
          );
      
          console.log('Cuenta de origen actualizada:', updatedSourceAccountResponse.data);
      
          // Obtener datos de la cuenta de destino
          const destinationAccountResponse = await axios.get(`https://localhost:7203/api/Accounts/GetAccountId/${transferData.destinationAccountId}`);
          const destinationAccountData = destinationAccountResponse.data.data;
      
          // Actualizar la cuenta de destino sumando el monto transferido
          const updatedDestinationAccountResponse = await axios.put(
            `https://localhost:7203/api/Accounts/UpdateAccount?id=${transferData.destinationAccountId}`,
            {
              money: destinationAccountData.money + transferData.amount,
            }
          );
      
          console.log('Cuenta de destino actualizada:', updatedDestinationAccountResponse.data);
      
          console.log('Transferencia exitosa.');
          setShowTransferForm(false);
        } catch (error) {
          console.error('Error en la transferencia:', error);
        }
      };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <h2>Información de la cuenta</h2>
      <p>Dinero disponible: ${money}</p>
      <button onClick={handleTransferClick}>Transferir Dinero</button>

      {showTransferForm && (
        <form onSubmit={handleTransferSubmit}>
          <label>
            Monto a transferir:
            <input
              type="number"
              name="amount"
              value={transferData.amount}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label style={{ paddingLeft:'100px'}}>
            ID de la cuenta destino:
            <input
              type="text"
              name="destinationAccountId"
              value={transferData.destinationAccountId}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Transferir</button>
        </form>
      )}

      <button onClick={() => console.log('Crear plazo fijo')}>Crear Plazo Fijo</button>
    </div>
  );
};

export default AccountCard;
