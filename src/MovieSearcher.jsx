import React, { useState } from 'react'

const MovieSearcher = ()=> {
    
    const urlBase='https://api.themoviedb.org/3/search/movie'
    const api_key='e25cdb95cf675bc05353541ff1df1195'

    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const handleInputChange = (e) =>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async ()=>{
        try{
            const response = await fetch(`${urlBase}?query=${search}&api_key=${api_key}`)
            const data = await response.json()
            if (Array.isArray(data.results)) {
                setMovies(data.results);
            } else {
                console.error('La respuesta de la API no es un arreglo de películas válido', data);
            }
        }catch(error){
            console.error('An error has ocurred', error)
        }
    } 

  return (
    <div>
        <h1>Movie Searcher</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder='Search a movie'
            value= {search}
            onChange={handleInputChange}
            />
            <button type='submit' >Search</button>
            {/* puedo hacer que en vez de tener un boton de search que aparezca una lupita en la parte derecha del input*/}

            <div className='movieList'>
                {movies.map((movie)=>(
                    <div key={movie.id} className='movie'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
            
        </form>
    </div>
  )
}

export default MovieSearcher 