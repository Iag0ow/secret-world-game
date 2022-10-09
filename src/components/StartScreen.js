import "./StartScreen.css";
const StartScreen = ({
  startGame,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  return (
    <div className="start">
      <h1>Palavra secreta</h1>
      <p>Clique no botão abaixo para começar</p>
      <button onClick={startGame}>Iniciar</button>
    </div>
  );
};

export default StartScreen;
