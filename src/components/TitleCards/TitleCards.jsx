import './TitleCards.css';
// import cards_data from '../../assets/cards/Cards_data';  `
import { useRef, useState } from 'react';
import { useEffect } from 'react';

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  // const api = "a800701f0bcfcafdfad587b25f415f6d";

  const [options] = useState({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODAwNzAxZjBiY2ZjYWZkZmFkNTg3YjI1ZjQxNWY2ZCIsIm5iZiI6MTczNjMzODkwMC44ODksInN1YiI6IjY3N2U2ZGQ0ZTBkNTY0OTNlNGJiMDc3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1s9bbljwa4xZrAReoJS7Y_eq-fH4lz4IYPasfuxVrX8'
    }
  })


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY; 
  }

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(category ? category:"game")}&apikey=c8a14e9a`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        console.log("Response status:", res.status);
        return res.json()
      })
      .then((data) => {
        // console.log(data);
        setApiData(data.Search);
      })
      .catch(err => console.error(err));

    // console.log(apiData)

    cardsRef.current.addEventListener('wheel', handleWheel)
  })


  console.log(apiData)

  return (
    <div className='title-cards'>
      <h2>
        {title ? title :"Popular on Netflix"}
      </h2>
      <div className='card-list' ref={cardsRef}>

        {
          apiData.length > 0 ? (apiData.map((card, index) => (
            <div className='card' key={index}>

              <img src={card.Poster} alt='kk' />
              <p>{card.Title}</p>
            </div>
          ))
          ) : (null

          )}

      </div>
    </div>
  )
}

export default TitleCards