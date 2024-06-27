import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterList from './components/CharacterList/CharacterList';
import CharacterDetail from './components/CharacterDetail/CharacterDetail';

const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleCharacterClick = (id) => {
    setSelectedCharacterId(id);
  };

  return (
    <div className="App">
      <h1>Marvel Characters</h1>
      <CharacterList onCharacterClick={handleCharacterClick} />
      {selectedCharacterId && (
        <CharacterDetail selectedCharacterId={selectedCharacterId} />
      )}
    </div>
  );
};



export default App;