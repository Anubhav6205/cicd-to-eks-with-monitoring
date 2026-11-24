import React, { useEffect, useState } from 'react'
import tmdbAxiosInstance from '../tmdbAxiosInstance'
import './Row.css'
function Row({title,fetchUrl}) {
const [allMovies,setAllMovies]=useState([])
const [error,setError]=useState(null)
const base_url="https://image.tmdb.org/t/p/original/"

const fetchData=async()=>{
   if(!process.env.REACT_APP_TMDB_API_KEY){
      setError("No TMDB API key is configured for this deployment, so movie rows are not loaded.")
      return
   }
   try{
      const {data}= await tmdbAxiosInstance.get(fetchUrl)
      setAllMovies(data.results)
   }catch(e){
      setError("Could not load movies from TMDB.")
   }
}
useEffect(()=>{
    fetchData()
},[])

  return (
    <div className='row'>
        <h1>{title}</h1>
        {error && <p style={{color:"#aaa",padding:"0 20px"}}>{error}</p>}
        <div className="all_movies">

            {

                allMovies.map((item,index)=>(
                    <>
                    
                    
                    <div className='ba'>
                       <div className='iim'> <img className='movie' src={`${base_url}/${item.poster_path}`} alt="" />
                        
                            <div className='back'>
            
                                    <img className='bacimg' src={`${base_url}/${item.backdrop_path}`} alt="" />
                                    <div style={{padding: "10px"}}>
                                        <div className='butt'>
                                            
                                              <button className='watchnow'>Watch now</button> <button className='plus'>+</button>                     
        
                                        </div>
                                        <h2>{item.original_title}</h2>
                                        <div style={{display:"flex"}}>
                                            <h3>{(item.release_date||'').slice(0,4)}</h3>
                                            <h3> &nbsp;.&nbsp; </h3>
                                            <h3>Rating: {item.vote_average}</h3>
                                        </div>
                                        <p>
                                            {(item.overview||'').slice(0,80)}
                                        </p>
                                    </div>
            
                                </div>
                                </div>
                        </div>
                    </>
                ))
            }
           
        </div>


    </div>
  )
}

export default Row