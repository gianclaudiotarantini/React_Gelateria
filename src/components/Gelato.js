// Gelato.js
import React from "react";
import { Link } from "react-router-dom";

const Gelato = ({ id, nome, img, prezzo, categoria, addToCart }) => {
  const handleImageClick = () => {
    console.log(`Hai cliccato sull'immagine di ${nome} (ID: ${id})`);
  };

  const handleAggiungiAlCarrello = () => {
    console.log(`Aggiungi al carrello: ${nome}`);
    addToCart({ id, nome, img, prezzo, categoria, addToCart });
  };

  return (
    <article className="gelato">
      <Link to={`/product/${id}`}>
        <div className="img-container" onClick={handleImageClick}>
          <img src={img} alt={nome} className="img" />
        </div>
      </Link>

      <div className="prd-info">
        <header className="prd-header">
          <div>
            <h5>{nome}</h5>
            <h6>{categoria}</h6>
          </div>
          <span className="prd-prezzo">
            <h6>{(prezzo / 100).toFixed(2)}€</h6>
          </span>
        </header>
        <button onClick={handleAggiungiAlCarrello} className="bn60 btn">Aggiungi</button>
        <hr />
        
      </div>
    </article>
  );
};

export default Gelato;
