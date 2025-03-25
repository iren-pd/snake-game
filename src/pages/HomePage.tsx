import { Link } from 'react-router-dom';
import routes from '../routes/routes';
import { Footer } from '../components/Footer';
import { GameStatus } from '../types';
import { setGameStatus } from '../redux/features/gameStatusSlice';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../redux/store';

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 text-blue-900 relative overflow-hidden">
      <div className="bg-white p-10 rounded-3xl shadow-lg flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-6 font-[Poppins]">Змейка</h1>
        <p className="text-lg mb-6 text-blue-700">
          Выбери уровень и начни играть!
        </p>
        <Link
          to={routes.game}
          className="bg-blue-400 px-8 py-4 text-lg rounded-full shadow-md hover:bg-blue-500 transition transform hover:scale-105"
          onClick={() => dispatch(setGameStatus(GameStatus.PLAYING))}
        >
          Начать игру
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
