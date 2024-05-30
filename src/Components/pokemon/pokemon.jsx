import { Link } from 'react-router-dom'
import './pokemon.css'
function Pokemon({name ,image , id}){
    return(
        <div>
            <Link className='div' to={`/pokemon/${id}`}>
                <img src={image} alt="pokemon" />
                <span className='name'>{name}</span>
            </Link>
        </div>
    )
}
export default Pokemon