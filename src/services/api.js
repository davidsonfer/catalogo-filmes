import axios from "axios";

// URL DA API = /movie/now_playing?api_key=f8cada3c8ad75ee98ec9dc513be03e80&language=pt-BR
// BASE DA URL = https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api