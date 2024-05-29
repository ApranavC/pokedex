import { useState , useEffect } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../pokemon/pokemon";

function PokemonList(){
    const [pokemonList, setPokemonList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    async function downloadPokemon()
    {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
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
    }

    useEffect(()=> {
        downloadPokemon();
    } ,[])
    return(
        <>
        <div className="PokemonList"> 
        Pokemon List
            {isLoading?  "...Loading" : 
            pokemonList.map((p)=> <Pokemon name= {p.name} image={p.image} key={p.id}/>)}
        </div></>
    )

}

export default PokemonList