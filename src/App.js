import { useState } from 'react';
import './App.css';
import {newCharacter} from './util.js';
import { Character } from './character-components/Character';
import  store  from './store/store';
import axios from 'axios';
const {
  v4: uuidv4,
} = require('uuid');

function App() {
  const [characters, setCharaters] = useState([]);
  const handleAddCharacter = () => {
    console.log('handleAddCharacter');
    let newChar =newCharacter;
    newChar.id = uuidv4();
    setCharaters([...characters, newChar]);
  }
  const handleResetAllCharacters = () => {
    console.log('handleResetAllCharacters');
  }
  const handleSaveAllCharacters = () => {
    console.log('handleSaveAllCharacters');
    axios.post('https://recruiting.verylongdomaintotestwith.ca/api/{joshidiv04}/character', characters)
    .then((response) => {
      alert('Characters saved successfully');
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          <button onClick={()=> handleAddCharacter()}>Add New Character</button>
          <button onClick={()=> handleResetAllCharacters()}>Reset All Characters</button>
          <button onClick={()=> handleSaveAllCharacters()}>Save All Characters</button>
        </div>
        <div>
          {
            characters.map((character, index) => {
              store.dispatch({type:'ADD_CHARACTER', payload:{character:character}});
              return (
                <div>
                  <h2>Character {index + 1}</h2>
                  <Character key={character.id} characterIndex={index}/>
                </div>)
            })
          }
        </div>
      </section>
    </div>
  );
}

export default App;
