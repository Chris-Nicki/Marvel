import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterDetail = ({ character, apiKey, hash }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(null);

  const fetchCharacterDetails = async (characterId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${apiKey}&hash=${hash}`
      );
      setDetails(response.data.data.results[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (character) {
      fetchCharacterDetails(character.id);
    }
  }, [character]);
  const renderDetails = () => {
    if (!details) {
      return null;
    }

    const { name, description, comics } = details;

    return (
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <h3>Comics</h3>
        <ul>
          {comics.items.map((comic) => (
            <li key={comic.name}>{comic.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {character && (
        <img
          src={character.thumbnail.path + '.' + character.thumbnail.extension}
          alt={character.name}
          onClick={() => fetchCharacterDetails(character.id)}
          style={{ cursor: 'pointer' }} 
        />
      )}
      {isLoading ? <p>Loading...</p> : renderDetails()}
    </div>
  );
};

export default CharacterDetail;