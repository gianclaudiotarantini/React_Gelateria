import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Importa useParams da React Router DOM


const ProductDetail = () => {
  const { id } = useParams(); // Ottieni l'ID del prodotto dall'URL

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Esegui una chiamata API per ottenere i dettagli del prodotto
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `https://react--course-api.herokuapp.com/api/v1/data/gelateria/${id}`
          
        );
        setProduct(response.data.data);
        
        setIsLoading(false);
        console.log("Chiamata API riuscita:", response.data.data); // Aggiungi questo console.log
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching product details.</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
    
  }
  

  return (
    <div>
        
      <h2>{product.nome}</h2>
      <img src={product.immagine} alt={product.nome} />
      <p>{product.descrizione}</p>
      <p>Prezzo: ${product.prezzo}</p>
      <p>Categoria: {product.categoria}</p>
    </div>
  );
};

export default ProductDetail;
