import { useState , useEffect } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../pokemon/pokemon";
import Pokedex from "../pokedex/Pokedex";

function PokemonList(){
    const [pokemonList, setPokemonList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [pokedexurl, setPokedexurl] = useState('https://pokeapi.co/api/v2/pokemon');

    const [prevurl, setPrevurl] = useState('');
    const [nextrurl, setNextvurl] = useState('');



    async function downloadPokemon()
    {
        setIsLoading(true);
        const response = await axios.get(pokedexurl);
        const pokemonResults = response.data.results;
        const pokemonResultsPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultsPromise);
        console.log(pokemonData);
        const res = pokemonData.map((pokedata) => {
            const pokemon = pokedata.data;
            return{
                name : pokemon.name,
                image : pokemon.sprites.other.dream_world.front_default,
                types : pokemon.types,
                id : pokemon.id
            }
        })
        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
        setNextvurl(response.data.next);
        console.log(nextrurl);
        setPrevurl(response.data.previous);
    }

    useEffect(()=> {
        downloadPokemon();
    } ,[pokedexurl])
    return(
        <>
        <div className="PokemonList"> 
            {isLoading?  "...Loading" : 
            pokemonList.map((p)=> <Pokemon name= {p.name} image={p.image} key={p.id} id={p.id}/>)}
        
            <div className="btn">    
                <button disabled = {prevurl == null} className="prev" onClick={()      =>setPokedexurl(prevurl)}>Prev</button>
                <button disabled = {nextrurl == null} className="next" onClick={()=>setPokedexurl(nextrurl)}>Next</button>
                </div>
        </div>
        </>
        
    )

}

export default PokemonList