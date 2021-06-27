
import Pokemon from './Pokemon';
import Pokedex from './Pokedex';
import MyPokemonList from './MyPokemonList'
import {Route, Switch} from 'react-router-dom';





function App() {

  return (
      
    <Switch>
        <Route exact path = "/pokedex" render = {(props) => <Pokedex {...props}/>} />
        <Route exact path = "/:pokemonId" render = {(props) => <Pokemon {...props}/>} />
        <Route exact path = "/" render = {(props) => <MyPokemonList {...props}/>} />
    </Switch>

 
  );
}

export default App;
