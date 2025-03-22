import { Link } from 'react-router-dom';
import routes from '../routes/routes';
import GameBoard from '../components/GameBoard';
import { Footer } from '../components/Footer';
import Controls from '../components/Controls';
import { FC, useState } from 'react';
import { Direction } from '../types';

const GamePage: FC = () => {
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [key, setKey] = useState(0);

  const restartGame = () => {
    setKey((prevKey) => prevKey + 1);
    setDirection(Direction.RIGHT);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-blue-900 relative">
      <div className="flex flex-col items-center w-full max-w-xl p-6 bg-white rounded-3xl shadow-lg text-center">
        <GameBoard key={key} direction={direction} />
        <Controls setDirection={setDirection} />

        <div className="flex gap-4 mt-6">
          <Link
            to={routes.home}
            className="bg-blue-400 px-6 py-3 text-lg rounded-full text-white shadow-md hover:bg-blue-500 transition"
          >
            Выйти в меню
          </Link>
          <button
            onClick={restartGame}
            className="bg-blue-600 px-6 py-3 text-lg rounded-full text-white shadow-md hover:bg-blue-700 transition"
          >
            Начать сначала
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GamePage;
