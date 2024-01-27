// Carrello.js
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Navigation from "./Navigation";

const Carrello = ({ carrello, rimuoviDalCarrello, contatoreCarrello }) => {
  console.log("Prop carrello ricevuto:", carrello);
  
  if (!carrello || carrello.length === 0) {
    return <>
              <Navigation contatoreCarrello={contatoreCarrello} /> {" "}
              <h1 className="d-flex justify-content-center style-h1 mt-2">Il carrello è vuoto</h1>
          </>
  }

  return (
    <>
    <Navigation contatoreCarrello={contatoreCarrello} /> {" "}
    <div className="container">
      <div className="d-flex justify-content-center style-h1 mt-2">
        <h1> CARRELLO </h1>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Immagine</th>
            <th scope="col">Nome Prodotto</th>
            <th scope="col">Categoria</th>
            <th scope="col">Prezzo</th>
            <th scope="col">Elimina</th>
          </tr>
        </thead>
        <tbody>
          {carrello.map((gelato) => (
            <tr key={gelato.id}>
              <th scope="row">{gelato.id}</th>
              <td>
                <div className="img-container">
                  <img src={gelato.img} alt={gelato.nome} className="img" />
                </div>
              </td>
              <td>{gelato.nome}</td>
              <td>{gelato.categoria}</td>
              <td>€ {(gelato.prezzo / 100).toFixed(2)}</td>
              <td>
                <button onClick={() => rimuoviDalCarrello(gelato.id)}>
                  <FontAwesomeIcon icon={faTimes} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Carrello;

