import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './CharacterDetails.module.css'

import '../CharacterList/CharacterList'



const CharacterDetail = ({ character, publicKey, hash }) => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const characterId = character?.id;
  
  

  useEffect(() => {
    const fetchData = async () => {
      if (!characterId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`
        );
        
        setDetails(response.data.data.results[0]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [characterId, publicKey, hash]);

  const handleClick = () => {
    if (!characterId) return;
    fetchData();
  };

  if (isLoading) {
    return <p>Loading character details...</p>;
  }

  if (error) {
    return <p>Error fetching character details: {error.message}</p>;
  }

  if (!character || !details) {
    return null;
  }

  const { name, description, comics } = details;

  const comicsList = comics?.items?.map((comic) => comic.name).join(', ');

  return (
    <div  onClick={handleClick}>
      <div className='detailsCard'>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Comics: {comicsList || 'No comics available'}</p>
      </div>
    </div>
  );
};

export default CharacterDetail;