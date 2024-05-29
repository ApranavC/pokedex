import './Pokedex.css'
import Search from '../search/Search';
function Pokedex (){
    return(
        <>
        <div className='pokedexWrapper'>
        <h1>Pokedex</h1>
        <Search/>
        </div>
        </>
    )
}
export default Pokedex