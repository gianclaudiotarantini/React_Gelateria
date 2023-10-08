import React from "react";

const GelatoModal = ({ gelato, onClose }) => {
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{gelato.nome}</h2>
        <p>{gelato.descrizione}</p>
      </div>
    </div>
  );
};

export default GelatoModal;

