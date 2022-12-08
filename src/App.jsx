import React from 'react';
import { randomColorSet } from './utils/colorGenerator';

function App() {
  const [bgColor, setBgColor] = React.useState('');
  const [randoms, setRandoms] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [disabled, setDisabled] = React.useState([]);
  const colorsSet = new Set();

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  let randomized;
  React.useEffect(() => {
    randomColorSet(colorsSet);
    randomized = shuffleArray([...colorsSet]);
    const randomArrItem = Math.floor(Math.random() * randomized.length);
    setRandoms(randomized);
    setBgColor(randomized[randomArrItem]);
  }, []);

  const handleClick = (color) => {
    if (color === bgColor) {
      setDisabled([]);
      setIsCorrect(true);
      setMessage('Correct!');
      colorsSet.clear();
      randomColorSet(colorsSet);
      randomized = shuffleArray([...colorsSet]);
      const randomArrItem = Math.floor(Math.random() * randomized.length);
      setRandoms(randomized);
      setBgColor(randomized[randomArrItem]);
    } else {
      setDisabled((prev) => [...prev, color]);
      setIsCorrect(false);
      setMessage('Wrong! Try again.');
    }
  };

  return (
    <div className="bg-zinc-800 h-screen flex flex-col items-center justify-center gap-20">
      <h1 className="text-4xl text-zinc-100 font-semibold uppercase tracking-widest">
        Guess The Color
      </h1>

      <div className="bg-zinc-800 flex-col gap-8 flex items-center justify-center">
        <div
          className="h-60 w-80  rounded-lg border-solid border-4 border-zinc-200 relative"
          style={{ backgroundColor: `${bgColor}` }}
        >
          <p
            className={`absolute left-0 -top-1/4 text-2xl w-full flex justify-center text-zinc-200 ${
              isCorrect ? 'text-green-400' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        </div>
        <div className="flex gap-x-4">
          {randoms.map((item) => (
            <button
              className="bg-slate-300 py-2 px-4 text-xl font-normal rounded-lg leading-none hover:bg-black hover:text-white duration-300 disabled:bg-opacity-20 disabled:text-opacity-10 disabled:pointer-events-none"
              onClick={() => handleClick(item)}
              disabled={disabled.includes(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
