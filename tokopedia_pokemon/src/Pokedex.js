import {react, useState, useEffect} from 'react';
import { AppBar , Toolbar, TextField} from "@material-ui/core"
import './App.css';
import SearchIcon from "@material-ui/icons/Search";
import Axios from 'axios'



const Pokedex = (props) => {


   const {history} = props; 
   const[allPokemons,setAllPokemons] = useState([])
   const[filter,setFilter] = useState([])
   const[loadMore,setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
   const[pokemon,setPokemon] = useState([])
  
  


   const handleSearchChange = (e) =>{
        setFilter(e.target.value)
   } 

   const getAllPokemon = async () =>{
     const res = await fetch(loadMore)
     const data = await res.json()

     setLoadMore(data.next)

    
     function createPokemon (results) {
        results.forEach( async(pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.json()

          setAllPokemons(currentList => [...currentList, data])
          
    
        })
     }

     createPokemon(data.results)

   }
   const getPokemonCount = () =>{
      

        console.log(pokemon)
      
   }


   useEffect(()=>{
      getAllPokemon()
      Axios.get('http://localhost:3001/api/get').then((response)=>{

        setPokemon(response.data)

    })
   },[])

  

    return(
          
    <div className="app-container">
            <AppBar position = "static">
                <Toolbar />
                <div className = 'search'>
                    <SearchIcon/>
                    <TextField onChange = {handleSearchChange} placeholder = " search"/>
                    <button className = "owned-pokemon" onClick ={()=>history.push(`/`)}>My Pokemon List</button>
                    <h2> Owned Pokemon :{pokemon.length}</h2>
                </div>
            </AppBar>
        <h1>Pokemon List</h1>

        <div className ="pokemon-container">
            <div className = "all-container">
            { allPokemons.map((pokemon, index) => 
                pokemon.name.includes(filter) &&
                
                <div className = "detail-container">

                    <img src = {pokemon.sprites.other.dream_world.front_default} width = "200" height ="200" alt = {pokemon.name} onClick={() => history.push(`${pokemon.id}`)} />
                    <div>
                        <h2>{pokemon.name}</h2>
            
                    </div>
                </div>
            )}
            </div>
            
            <button className = "load-more" onClick ={()=>getAllPokemon()}>Load More</button>
            
        </div>
    </div>

    )
}


export default Pokedex;