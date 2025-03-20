import { Link } from 'react-router-dom';
import routes from '../routes/routes';
import GameBoard from '../components/GameBoard';
import { Footer } from '../components/Footer';
import Controls from '../components/Controls';
import { FC, useState } from 'react';
import { Direction } from '../types';

const GamePage: FC = () => {
  const [direction, setDirection] = useState(Direction.RIGHT);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-green-900 relative">
      <div className="flex flex-col items-center w-full max-w-2xl p-6 bg-white rounded-3xl shadow-lg text-center">
        <GameBoard direction={direction} />
        <Controls setDirection={setDirection} />

        <Link
          to={routes.home}
          className="mt-6 inline-block bg-red-400 px-6 py-3 text-lg rounded-full text-white shadow-md hover:bg-red-500 transition"
        >
          Выйти в меню
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default GamePage;
