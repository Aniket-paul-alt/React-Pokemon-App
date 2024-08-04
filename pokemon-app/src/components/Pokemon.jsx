import { useEffect, useState } from "react"
import "../index.css"
import { PokemonCards } from "./PokemonCards"
import pokelogo from '../assets/pokelogo.webp'

export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

    const fetchPokemon = async() => {
        try {
            const res = await fetch(API)
            const data = await res.json()
            // console.log(data);

            const detailedPokemonData = data.results.map(async (currPokemon) => {
                const res = await fetch(currPokemon.url)
                const data = await res.json()
                // console.log(data);
                return data;
            })
            // console.log(detailedPokemonData);

            const detailedResponses = await Promise.all(detailedPokemonData)
            // console.log(detailedResponses);
            
            setPokemon(detailedResponses)
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error)
        }
    }

    useEffect(()=>{
        fetchPokemon()
    },[])


    //Search Function
    const searchData = pokemon.filter(currPokemon => currPokemon.name.toLowerCase().includes(search.toLowerCase()))
    
    if(loading){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    
    if(error){
        return(
            <div>
                <h1>Check your URL :{error.message}</h1>
            </div>
        )
    }
    

    return (
        <>
            <section className="container">
                <header>
                    <h1>Let's Catch Pokemon</h1>
                    <h2>made by 😎 Aniket</h2>
                </header>

                <div className="pokemon-search">
                    <input type="text" placeholder="Search Pokemon" value={search} onChange={(e)=> setSearch(e.target.value)} />
                </div>

                <div>
                    <ul className="cards">
                        {
                            //pokemon.map....
                            searchData.map((currPokemon)=>(
                                <PokemonCards key={currPokemon.id} pokemonData ={ currPokemon } />
                            ))
                        }
                    </ul>
                </div>
            </section><footer>
                <img src={pokelogo} alt="" />
            </footer>
        </>
    )
}


// "https://pokeapi.co/api/v2/"