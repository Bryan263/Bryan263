import {react, useState, useEffect}  from 'react';
import './pokemon.css';
import Axios from 'axios'




const Pokemon = (props) =>{

    const {history} = props;

    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon,setPokemon] = useState([])
    const[pokemonObject, setPokemonObject] = useState({})
    const [show ,setShow] = useState(false)

   const getPokemonByID = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        const data = await res.json()
            
        setPokemon(currentList => [...currentList, data])
        setPokemonObject(data)

    }
    const catchPokemon = () => {

        const random = Math.floor(Math.random() * 2)

        console.log(random)
        if(random == 1)
        {
            Axios.post('http://localhost:3001/api/insert',{
                pokemonID: pokemonObject.id,
                pokemonName : pokemonObject.name,
                pokemonWeight : pokemonObject.weight,
                pokemonHeight : pokemonObject.height,
                pokemonType : pokemonObject.types[0].type.name,
              
            }).then(()=>{
                alert('successfull insert')
            })
            
            alert("Congrats you got the pokemon! , you can view it at my pokemon list and give a nickname!")
        
        
        }
        else
        {
            alert("The pokemon got away!")
        }
    
    }
               
    const generatePokemon = () => {
        const {name,id,height,weight,types} = pokemon;
       

        return(

            <div className = "all_container">
            {pokemon.map((pokemon,index)=>
          
            <div className = "pokemon_container">
                 <h2>{pokemon.name}</h2>
                 <div className = "pokemon_detail">
                    <img src = {pokemon.sprites.other.dream_world.front_default} alt = {pokemon.name} />
                    <div className = "pokemon_text">
                        <h2>Pokemon Height: {pokemon.height}</h2>
                        <h2>Pokemon Weight: {pokemon.weight}</h2>
                        <h2>Pokemon Types:</h2>
                        {pokemon.types.map(type => {
                            return <div><ul><li><h2>{type.type.name}</h2></li></ul></div>
                        })}
                        <h2>Pokemon Abilities:</h2>
                        {pokemon.abilities.map(ability => {
                            return <div><ul><li><h2>{ability.ability.name}</h2></li></ul></div>
                        })}

                    </div>
               
                </div>
            
                <div>
                    <button className = "catch-button" onClick ={catchPokemon}>Try Catch Pokemon</button>
                    <button onClick ={()=> history.push(`/pokedex`)}>Back to pokedex</button>
                </div>
             

            </div>
            )}
             
            </div>

        )
    
       
    }
    

    

    
    useEffect(() =>{
        getPokemonByID()
    },[])

    return(
       <div>
           {generatePokemon()}
       </div>
    )
}


export default Pokemon;