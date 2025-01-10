import './TitleCards.css';
// import cards_data from '../../assets/cards/Cards_data';  `
import { useRef, useState } from 'react';
import { useEffect } from 'react';

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

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

        return res.json()
      })
      .then((data) => {
      
        setApiData(data.Search);
      })
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  })


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