import './pokemon.css'
function Pokemon({name ,image}){
    return(
        <div>
        <img src={image} alt="pokemon" />
        <span className='name'>{name}</span>
        
        </div>
    )
}
export default Pokemon