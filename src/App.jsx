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
    <div className="flex flex-col bg-slate-900 h-screen items-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-20">
        <h1 className="text-4xl text-slate-300 font-semibold uppercase tracking-widest text-center">
          Guess The <br className="block sm:hidden" /> Color
        </h1>

        <div className="flex flex-col gap-8 items-center justify-center">
          <div
            className="h-48 w-64 m-auto rounded-lg border-solid border-4 border-slate-300 relative sm:w-80 sm:h-60 duration-700"
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
          <div className="flex flex-col gap-4 sm:flex-row">
            {randoms.map((item) => (
              <button
                className="bg-slate-300 text-slate-900 py-2 px-4 text-xl font-normal rounded-lg leading-none hover:-translate-y-0.5 hover:bg-slate-50  duration-300 disabled:bg-opacity-25 disabled:pointer-events-none"
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
      <footer className="bottom-4 text-slate-500 p-4">
        <a
          href="https://batuhankendirli.netlify.app/"
          target="_blank"
          className="relative text-xl text-slate-300 duration-300 after:w-0 after:h-[1px] after:absolute after:left-0 after:-bottom-[2px] after:bg-slate-50 after:duration-300 hover:text-slate-50 hover:after:w-full "
        >
          Batuhan Kendirli
        </a>{' '}
        - 2022
      </footer>
    </div>
  );
}

export default App;
