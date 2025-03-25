import { FC } from 'react';
import { GameStatus } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setGameStatus } from '../redux/features/gameStatusSlice';
import { Link } from 'react-router-dom';
import routes from '../routes/routes';
import { restartGame } from '../utils/restartGame';

const GameResultModal: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.gameStatus.type);
  const score = useSelector((state: RootState) => state.score);
  const time = useSelector((state: RootState) => state.time);

  const formattedTime = `${time.hours}:${time.minutes
    .toString()
    .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;

  const title =
    status === GameStatus.WIN
      ? 'Победа 🎉'
      : status === GameStatus.LOSE
      ? 'Проигрыш 😿'
      : '';

  if (status === GameStatus.PLAYING || status === GameStatus.IDLE) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">{title}</h2>
        
        <p className="text-lg mb-2">
          Счёт: <strong>{score}</strong>
        </p>
        <p className="text-lg mb-6">Время:{formattedTime}</p>

        <div className="flex gap-4 mt-6">
          <Link
            to={routes.home}
            onClick={() => dispatch(setGameStatus(GameStatus.IDLE))}
            className="bg-blue-400 px-6 py-3 text-lg rounded-full text-white shadow-md hover:bg-blue-500 transition"
          >
            Выйти в меню
          </Link>
          <button
            onClick={() => restartGame(dispatch)}
            className="bg-blue-600 px-6 py-3 text-lg rounded-full text-white shadow-md hover:bg-blue-700 transition"
          >
            Начать сначала
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameResultModal;
