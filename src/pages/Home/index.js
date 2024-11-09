import { useState, useEffect } from "react";
import "../../services/api";
import api from "../../services/api";
import { Link } from 'react-router-dom'
import './home.css'

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "f8cada3c8ad75ee98ec9dc513be03e80",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 12));
      setLoading(false)
    }

    loadFilmes();
  }, []);

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando Filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
