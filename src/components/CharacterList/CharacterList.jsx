import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharacterList.css';
import '../CharacterDetail/CharacterDetail'; 
import CharacterDetail from '../CharacterDetail/CharacterDetail';

const publicKey = 'e632f36798412a89cc237f61ed364dcd'; 
const hash = 'fe72205c6b60e63a1923f440932c53b8'; 

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`
        );
        setCharacters(response.data.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterClick = (id) => {
   
    setSelectedCharacter(id);
    console.log('Selected character ID:', id);
  };

  return (
    <div className="character-container">
      {isLoading && <p>Loading characters...</p>}
      {error && <p>Error: {error.message}</p>}
      {characters.length > 0 && (
        characters.map((character) => (
          <div className="characterCard" key={character.id}>
            <div></div>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              onClick={() => handleCharacterClick(character.id)}
            />
            <div className="card-body">
              <div>{character.name}</div>
              {selectedCharacter && (
              <CharacterDetail characterId={selectedCharacter.id} apiKey={publicKey} hash={hash} />
            )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CharacterList;

