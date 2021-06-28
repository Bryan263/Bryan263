import {react,useState,useEffect} from 'react'
import Axios from 'axios'
import './MyPokemonList.css';
import { AppBar , Toolbar, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";


const MyPokemonList = (props) =>{

    const {history} = props
    
    const[pokemon,setPokemon] = useState([])
    const[newNickName ,setNewNickName] = useState("")
    const[image,setImage] = useState([])
    const[filter,setFilter] = useState([])


    useEffect(() =>{
        Axios.get('http://localhost:3001/api/get').then((response)=>{
            setPokemon(response.data)
            
   
        })

        
    },[])

    const removePokemon = (pokemonId) =>{
        Axios.delete(`http://localhost:3001/api/delete/${pokemonId}`)
           
        setPokemon(pokemon.filter((pokemon)=>{
            return pokemon.pokemonID != pokemonId  
        }))
    }
    const handleSearchChange = (e) =>{
        setFilter(e.target.value)
   } 

    const updatePokemonNickName = (pokemonID) =>{

        Axios.put('http://localhost:3001/api/update',{
            pokemonID : pokemonID,
            pokemonNickName : newNickName
        })
      
        setPokemon(pokemon.map((pokemon)=>{
            return pokemon.pokemonID == pokemonID ? 
            {pokemonName : pokemon.pokemonName,
            pokemonID : pokemon.pokemonID,     
            pokemonHeight : pokemon.pokemonHeight, 
            pokemonWeight : pokemon.pokemonWeight, 
            pokemonType : pokemon.pokemonType,
            pokemonNickName : newNickName} : pokemon
        }))
   
    }
    const getPokemon = ()=>{
        

        return(
            
            <div className ="container">
                <AppBar position = "static">
                <Toolbar />
                <div className = 'search'>
                    <SearchIcon/>
                    <TextField onChange = {handleSearchChange} placeholder = " search"/>
                    <button className = "owned-pokemon" onClick ={()=>history.push(`/pokedex`)}>Back to pokedex</button>
                    <h2> Owned Pokemon :{pokemon.length}</h2>
                </div>
            </AppBar>
            <h1 className="tulisan-list">My Pokemon List  <button onClick ={()=> history.push(`/pokedex`)}>Back to pokedex</button></h1>
        
            {pokemon.map((pokemon) =>
                    pokemon.pokemonName.includes(filter) &&
                    <div className = "pokemon_card">
                        <h2>Pokemon Name : {pokemon.pokemonName}</h2>
                        <h2>Pokemon Height : {pokemon.pokemonHeight}</h2>
                        <h2>Pokemon Weight : {pokemon.pokemonWeight}</h2>
                        <div className = "pokemon_image">
                            <img src = {"https://pokeres.bastionbot.org/images/pokemon/" + pokemon.pokemonID + ".png"} height = "200" weight = "200"/>
                        </div>
                        
                        <h2>Pokemon type : {pokemon.pokemonType}</h2>
                        <h2>Pokemon NickName : {pokemon.pokemonNickName}</h2>

                        <h2>Pokemon Nick Name :<input type = "text" onChange ={(event)=>{setNewNickName(event.target.value)}}/> <button onClick = {()=>updatePokemonNickName(pokemon.pokemonID)}>Update Nick Name</button></h2>
                        <button className = "button-remove" onClick ={()=>{removePokemon(pokemon.pokemonID)}}>Remove pokemon</button>
                    </div>
                    
                
               
            )}
          
        </div>
        )
    }

    return(
        <div>
            {getPokemon()}
        </div>
      
    )
       
    

}

export default MyPokemonList;