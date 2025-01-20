import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import trailers from '../../trailers.json'

const Player = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    Title:"",
    Type:"",
    Year:"",
  })

  const {id} = useParams();
  console.log(id);

  useEffect(() => {
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=c8a14e9a`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
          }
  
          return res.json()

          
        })
        .then((data) => {
        
            const trailer = trailers.find(t => t.imdbID === id);
            const mergedData = 
            {
              ...data,
              trailerURL : trailer ? trailer.trailerURL : null,
            };
            setApiData(mergedData);
         
          
        // console.log(mergedData)
        
        })
        .catch(err => console.error(err));
  
      
    },[])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={()=>navigate('/')}/>
      <iframe width="90%" height="90%" src={apiData.trailerURL} title="trailer" frameBorder="0" allowFullScreen></iframe>
     
      <div className="player-info">
      
        <p>Name: {apiData.Title}</p>
        <p>Published In: {apiData.Year}</p>
        <p>Type: {apiData.Type}</p>
      </div>
    </div>
  )
}

export default Player