import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharacterList.css';
import CharacterDetail from '../CharacterDetail/CharacterDetail';

const publicKey = 'e632f36798412a89cc237f61ed364dcd';
const hash = 'fe72205c6b60e63a1923f440932c53b8';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

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

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="character-container">
      {isLoading && <p>Loading characters...</p>}
      {error && <p>Error: {error.message}</p>}
      {characters.length > 0 && (
        characters.map((character) => (
          <div className="characterCard" key={character.id}>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              onClick={() => handleCharacterClick(character)}
            />
            <div className="card-body">{character.name}</div>
          </div>
        ))
      )}
      <div className='detailsCard'>
      {selectedCharacter && <CharacterDetail character={selectedCharacter} apiKey={publicKey} hash={hash} />}
      </div>
    </div>
  );
};

export default CharacterList;
