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
  const [searchQuery, setSearchQuery] = useState(""); // Nuovo stato per la query di ricerca

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
    <div className="App">
      <section className="section-center">
        <div className="container">
          
          <Navigation onSearch={searchProducts} /> {/* Passa la funzione di ricerca al componente Navigation */}
          <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>
            Le Nostre Scelte
          </h4>
          <div className="lista-categorie">
            {categorie.map((categoria, index) => (
              <button
                className={`btn btn-selector ${
                  selected === index && "active"
                }`}
                key={index}
                data-categoria={categoria}
                onClick={() => filtraProdotti(categoria, index)}
              >
                {categoria}
              </button>
            ))}
          </div>
          <hr />
          <div className="vetrina">
            {filterProducts.map((el) => (
              <Gelato key={el.id} {...el} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
