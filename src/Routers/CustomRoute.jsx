import {Routes , Route} from 'react-router-dom'
import PokemonList from '../Components/Pokemon List/PokemonList'
import PokemonDetails from '../Components/PokemonDetails/pokemonDetails';

function CustomRoute (){
    return(
        <>
        <Routes>

            <Route path = "/" element = {<PokemonList/>}></Route> 
            <Route path = "/pokemon/:id" element = {<PokemonDetails/>}></Route> 
        </Routes>
        </>
    )
}
export default CustomRoute;