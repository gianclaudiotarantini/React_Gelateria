// Carrello.js
import React from 'react';

const Carrello = ({ carrello }) => {
  console.log("Prop carrello ricevuto:", carrello);
  // Verifica se carrello è undefined o null
  if (!carrello) {
    return <div>Il carrello è vuoto</div>;
  }

  return (
    
    <div className='container'>
      
      <h1> CARRELLO </h1>
      
      <ul>
        {carrello.map((gelato) => (
          <li key={gelato.id}>{gelato.nome} € {(gelato.prezzo / 100).toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Carrello;

