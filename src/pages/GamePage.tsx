import { Link } from 'react-router-dom';
import routes from '../routes/routes';
import GameBoard from '../components/GameBoard';
import { Footer } from '../components/Footer';
import Controls from '../components/Controls';
import { FC, useState } from 'react';
import { Direction } from '../types';
import { setDirection } from '../redux/features/directionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../redux/store';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import GameHeader from '../components/GameHeader';

const GamePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const snake = useSelector((state: RootState) => state.snake);
  const [key, setKey] = useState(0);

  const restartGame = () => {
    setKey((prevKey) => prevKey + 1);
    dispatch(setDirection(Direction.RIGHT));
  };

  useKeyboardControls();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-blue-900 relative">
      <GameHeader score={snake.length - 1} time="00:45" />
      <div className="flex flex-col items-center w-full max-w-xl p-6 bg-white rounded-3xl shadow-lg text-center">
        <GameBoard key={key} />
        <Controls />

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
