import React, { useState, useEffect } from "react";
import Gelato from "./Gelato";
import axios from "axios";
import Navigation from "./Navigation"; // Assicurati di importare il componente Navigation

const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [prodotti, setProdotti] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selected, setSelected] = useState(0);
  const [categorie, setCategorie] = useState([]);

  const filtraProdotti = (categoria, index) => {
    setSelected(index);
    if (categoria === "all") {
      setFilterProducts(prodotti);
    } else {
      const prodottiFiltrati = prodotti.filter((el) =>
        el.categoria === categoria ? el : ""
      );
      setFilterProducts(prodottiFiltrati);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(url);
        const data = response.data.data;
        setProdotti(data);
        setFilterProducts(data);

        const nuoveCategorie = Array.from(
          new Set(data.map((el) => el.categoria))
        );
        nuoveCategorie.unshift("all");
        setCategorie(nuoveCategorie);

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.log(error);
      }
    })();
  }, []);

  // Funzione per filtrare i prodotti in base alla query di ricerca
  const searchProducts = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredProducts = prodotti.filter((el) =>
      el.nome.toLowerCase().includes(lowerCaseQuery)
    );
    setFilterProducts(filteredProducts);
  };

  return (
    <div className="container">
<Navigation onSearch={searchProducts} /> {/* Passa la funzione di ricerca al componente Navigation */}
      <h4 style={{ textAlign: "center", textTransform: "uppercase" }}> {/* Proprietà css */}
        Le Nostre Scelte
      </h4>
      {
        //Se non sto caricando e non ci sono Errori
        !isLoading && !isError ? (
          <>
            <div className="lista-categorie">
              {categorie.map((categoria, index) => ( // Itera le categorie
                <button         // Allora creami un bottone con active
                  className={`btn btn-selector ${
                    selected === index && "active" //Per fare in modo che la pagina mostri tutti i prodotti 
                  }`}
                  key={index}         // key di index
                  data-categoria={categoria} // Nell'array è data-categoria
                  onClick={() => filtraProdotti(categoria, index)}  // Al click filtra i prodotti per categoria
                >
                  {categoria}   {/* Mostra le categorie */}
                </button>
              ))}
            </div>
            <hr />
            <div className="vetrina">
              {filterProducts.map((el) => (         // Settaggio e iterazione del filterproduct che chiama el
                <Gelato key={el.id} {...el} />      // Chiama il componente gelato con key id e spred op. di el
              ))}
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
        ) : (           // Altrimenti loading
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
  );
};

export default Home;
