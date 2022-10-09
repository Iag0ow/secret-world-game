// CSS
import "./App.css";
//React
import { useCallback, useEffect, useState } from "react";
// Data
import { wordsList } from "./data/words";
//Componentes
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;
function App() {
  const [words] = useState(wordsList);
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [pickedCategory, setCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  //pick the category and word of the game
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);
  console.log(letters);
  //starts the secret word game
  const startGame = useCallback(() => {
    //clear all letters
    clearGame();
    //pick word and pick category
    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    setGameStage(stages[1].name);
    setCategory(category);
    setLetters(wordLetters);
  }, [pickWordAndCategory]);
  //reset all states
  function clearGame() {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    //check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((arrayOfCorretlyLetters) => [
        ...arrayOfCorretlyLetters,
        normalizedLetter,
      ]);
      console.log("acerto", guessedLetters);
    } else {
      setWrongLetters((arrayOfWrongLetters) => [
        ...arrayOfWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    } //setGameStage(stages[2].name);
  };

  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearGame();
      setGameStage(stages[2].name);
    }
  }, [guesses]);
  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((atualScore) => (atualScore += 100));
      //restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);
  //restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
