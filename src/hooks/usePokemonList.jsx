import { useEffect, useState } from "react";
import axios from "axios";
function usePokemonList(url , type){
    const [pokemonStates, setPokemonStates] = useState({
            pokemonList : [],
            isLoading : false,
            pokedexurl : url,
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
    if(type){
        setPokemonStates((state)=>({
            ...state,
            pokemonList : response.data.pokemon.slice(0,5)
            
        }))
    }
    else{
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

    return {pokemonStates , setPokemonStates}
    }
}

export default usePokemonList;