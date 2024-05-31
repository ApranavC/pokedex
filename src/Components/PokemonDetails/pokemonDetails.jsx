import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './pokemonDetails.css'
function PokemonDetails(){
    const {id} = useParams();
    const [pokemon ,setPokemon] = useState({});
    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name : response.data.name,
            image : response.data.sprites.other.dream_world.front_default,
            height : response.data.height,
            weight : response.data.weight,

        })
        
    }
    useEffect(()=> {downloadPokemon()}, []);
    
    return(
        <>
        <div className="pokemondetailsWrapper">
        <div className="pokemondetailsName">name : {pokemon.name}</div>
        <div className="pokemondetailsImage"><img src={pokemon.image} alt={pokemon.name} /></div>
        <div className="pokemondetailsHeight">height {pokemon.height}</div>
        <div className="pokemondetailsWeight">weight : {pokemon.weight}</div>
        </div>
        </>
    )
}
export default PokemonDetails 