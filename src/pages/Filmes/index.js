import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import "./filme-info.css";
import { toast } from 'react-toastify'

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "f8cada3c8ad75ee98ec9dc513be03e80",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("FILME NÃO ENCONTRADO");
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("COMPONENTE DESMONTADO");
    };
  }, [id, navigate]);

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    const filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if(hasFilme){
        toast.warn("Filme já foi adicionado na lista!")
        return
    }

    filmesSalvos.push(filme)
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success("Filme Salvo com sucesso!")

  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>carregando detalhes...</h1>
      </div>
    );
  }

  const formattedVoteAverage = filme.vote_average.toFixed(0);

  return (
    <div className="container">
      <div className="filme-info">
        <h1>{filme.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
          alt={filme.title}
        />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {formattedVoteAverage} / 10</strong>
        <div className="area-buttons">
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}trailer`}>Trailer</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filme;
