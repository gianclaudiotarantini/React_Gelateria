import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu } from './components';
import Carrello from './components/Carrello';
import ProductDetail from './components/ProductDetail';

function App() {
  // Recupero i dati del carrello da localStorage all'inizio dell'app
  useEffect(() => {
    const storedCarrello = JSON.parse(localStorage.getItem('carrello')) || [];
    setCarrello(storedCarrello);
    setContatoreCarrello(storedCarrello.length);
  }, []);

  const [carrello, setCarrello] = useState([]);
  const [contatoreCarrello, setContatoreCarrello] = useState(0);

  const aggiungiAlCarrello = (gelato) => {
    const nuovoCarrello = [...carrello, gelato];
    setCarrello(nuovoCarrello);
    setContatoreCarrello(nuovoCarrello.length);

    // Serializza e salva nel localStorage
    localStorage.setItem('carrello', JSON.stringify(nuovoCarrello));
  };

  const rimuoviDalCarrello = (gelatoId) => {
    const nuovoCarrello = carrello.filter((gelato) => gelato.id !== gelatoId);
    setCarrello(nuovoCarrello);
    setContatoreCarrello(nuovoCarrello.length);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Menu aggiungiAlCarrello={aggiungiAlCarrello} contatoreCarrello={contatoreCarrello} />} />
        <Route path="/carrello" element={<Carrello carrello={carrello} contatoreCarrello={contatoreCarrello} rimuoviDalCarrello={rimuoviDalCarrello}/>} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
