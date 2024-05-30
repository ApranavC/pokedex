import { useState , useEffect } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../pokemon/pokemon";

function PokemonList(){
    const [pokemonStates, setPokemonStates] = useState({
        pokemonList : [],
        isLoading : false,
        pokedexurl : 'https://pokeapi.co/api/v2/pokemon',
        prevurl : '',
        nexturl : ''
    })
    async function downloadPokemon()
    {
        setPokemonStates((state) => ({
            ... state,
            isLoading : true
        }));
        const response = await axios.get(pokemonStates.pokedexurl);
        const pokemonResults = response.data.results;
        console.log(pokemonResults);
        const pokemonResultsPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultsPromise);
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
        setPokemonStates((state) => ({
            ... state,
            isLoading : false,
            pokemonList : res,
            nexturl : response.data.next,
            prevurl : response.data.previous
        }));
    }
    console.log(pokemonStates);
    useEffect(()=> {
        downloadPokemon();
    } ,[pokemonStates.pokedexurl])
    return(
        <>
        <div className="PokemonList"> 
            {pokemonStates.isLoading?  "...Loading" : 
            pokemonStates.pokemonList.map((p)=> <Pokemon name= {p.name} image={p.image} key={p.id} id={p.id}/>)}
            <div className="btn">  

            <button disabled={pokemonStates.prevurl == null} onClick={() => setPokemonStates({...pokemonStates, 
                pokedexurl: pokemonStates.prevurl})}>Prev</button>
                
                <button disabled={pokemonStates.nexturl == null} onClick={() => setPokemonStates({...pokemonStates, 
                    pokedexurl: pokemonStates.nexturl})}>Next</button>
                </div>
                {console.log(pokemonStates.pokedexurl)}
        </div>
        </>
        
    )

}

export default PokemonList