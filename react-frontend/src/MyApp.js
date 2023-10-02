import React from "react";
import Table from "./Table";

import React, {useState} from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);
    
  function removeOneCharacter (index) {
      const updated = characters.filter((character, i) => {
          return i !== index
      });
    setCharacters(updated);
  }
    
return (
    <div className="container">
        <Table characterData={characters} 
          removeCharacter={removeOneCharacter} />
    </div>  
)
}

export default MyApp;