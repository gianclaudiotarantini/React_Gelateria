import React, { useState, useEffect } from "react";
import Gelato from "./Gelato";
import axios from "axios";
import Navigation from "./Navigation"; // Assicurati di importare il componente Navigation
import { Link } from "react-router-dom";

const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";

const Home = () => {

  const [isLoading, setIsLoading] = useState(true); // Attivato il loading

  const [isError, setIsError] = useState(false); // Disattivato l'errore

  const [prodotti, setProdotti] = React.useState(); // Setto solo i prodotti

  const [filterProducts, setFilterProducts] = useState(); // Setto solo il filtro dei prodotti

  const [selected, setSelected] = useState(0); // Per selezionare il prodotto, che parte da 0

  const [categorie, setCategorie] = useState([]); // Setto le categorie con []

  const filtraProdotti = (categoria, index) => {  //Filtro prodotti e modifico valore di selected
    
    setSelected(index); // Settaggio del setSelected che cerca index

    if (categoria === "all") {     //Se indico all mostra tutti i prodotti
      setFilterProducts(prodotti); // Mostra tutti i prodotti col metodo del filtraggio
    }
    
    else {               //Altrimenti uso filter Method che filtra i prodotti per categorie
      const prodottiFiltrati = prodotti.filter(
        (
          el // Operatore ternario che cerca solo per categoria
        ) => (el.categoria === categoria ? el : "")
      );
      setFilterProducts(prodottiFiltrati);
    }
  };

  useEffect(() => {
    
    (async () => {
      //Reimposto valori allo stato inziale prima di incominciare data fetching
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(url); // Se la chiamata va a buon fine allora:
        setProdotti(response.data.data); // Richiamo il setProdotti e do una risposta
        setFilterProducts(response.data.data); // Idem per setfilter

        //Ottengo Array di elementi non ripetibili
        const nuoveCategorie = Array.from(
          // Creazione di un array
          new Set(response.data.data.map((el) => el.categoria)) // Iterazione degli elementi per categoria
        );

        //Aggiungo all'inizio termine all
        nuoveCategorie.unshift("all");
        setCategorie(nuoveCategorie);

        //Termino Caricamento
        setIsLoading(false); // Disattivare il loading
      } catch (error) {
        //Errore
        setIsError(true);
        setIsLoading(false);
        console.log(error);
      }
    })();
  }, []);

  // Funzione per filtrare i prodotti in base alla query di ricerca
  const searchProducts = (query) => {
    const lowerCaseQuery = query.toLowerCase(); // Prendi i dati in minuscolo
    const filteredProducts = prodotti.filter(
      (
        el // Imposta i risultati filtrati
      ) => el.nome.toLowerCase().includes(lowerCaseQuery)
    );
    setFilterProducts(filteredProducts);
  };

  return (
    <>
      <Navigation onSearch={searchProducts} />{" "}
      {/* Passa la funzione di ricerca al componente Navigation */}
      <div className="container">
        <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>
          {" "}
          {/* Proprietà css */}
          Le Nostre Scelte
        </h4>
        {
          //Se non sto caricando e non ci sono Errori
          !isLoading && !isError ? (
            <>
              <div className="lista-categorie mt-3">
                {categorie.map(
                  (
                    categoria,
                    index // Itera le categorie
                  ) => (
                    <button // Allora creami un bottone con active
                      className={`btn btn-selector ${
                        selected === index && "active" //Per fare in modo che la pagina mostri tutti i prodotti
                      }`}
                      key={index} // key di index
                      data-categoria={categoria} // Nell'array è data-categoria
                      onClick={() => filtraProdotti(categoria, index)} // Al click filtra i prodotti per categoria
                    >
                      {categoria} {/* Mostra le categorie */}
                    </button>
                  )
                )}
              </div>

              <div className="vetrina justify-content-center">
                {filterProducts.map(
                  (
                    el // Settaggio e iterazione del filterproduct che chiama el
                  ) => (
                    <Link
                      to={`/product/${el.id}`} // Specifica l'URL con l'ID del prodotto
                      key={el.id}
                    >
                      <Gelato {...el} />{" "}   {/*Chiama il componente gelato con key id e spred op. di el*/}                
                    </Link>
                  )
                )}
              </div>
            </>
          ) : //Se non sto caricando ma sono presenti errori
          !isLoading && isError ? (
            <h4
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Errore...
            </h4>
          ) : (
            // Altrimenti loading
            <h4
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Loading...
            </h4>
          )
        }
      </div>
    </>
  );
};

export default Home;
