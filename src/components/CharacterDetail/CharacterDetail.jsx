import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterDetail = ({ character, apiKey, hash }) => {
  const [characterDetails, setCharacterDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters/${character.id}?ts=1&apikey=${apiKey}&hash=${hash}`
      );
      setCharacterDetails(response.data.data.results[0]); // Assuming single result
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (character) {
      handleClick(); // Fetch details on component mount
    }
  }, [character]); // Refetch details when character changes

  if (isLoading) {
    return <p>Loading character details...</p>;
  }

  if (error) {
    return <p>Error fetching character details: {error.message}</p>;
  }

  if (!characterDetails) {
    return null; // No character details to display yet
  }

  const { name, description, comics } = characterDetails;

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <h3>Comics:</h3>
      <ul>
        {comics.items.map((comic) => (
          <li key={comic.name}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;