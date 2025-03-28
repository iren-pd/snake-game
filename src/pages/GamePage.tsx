import { Link } from 'react-router-dom';
import routes from '../routes/routes';
import GameBoard from '../components/GameBoard';
import { Footer } from '../components/Footer';
import Controls from '../components/Controls';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../redux/store';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import GameHeader from '../components/GameHeader';
import { setGameStatus } from '../redux/features/gameStatusSlice';
import GameResultModal from '../components/Popup';
import { restartGame } from '../utils/restartGame';
import { GameStatus } from '../constants';

const GamePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gameStatus = useSelector((state: RootState) => state.gameStatus.type);

  useEffect(() => {
    restartGame(dispatch);
  }, []);

  useKeyboardControls();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-blue-900 relative">
        <GameHeader />
        <div className="flex flex-col items-center w-full max-w-xl p-6 bg-white rounded-3xl shadow-lg text-center">
          <GameBoard />
          <Controls />

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
        <Footer />
      </div>

      {(gameStatus === GameStatus.LOSE || gameStatus === GameStatus.WIN) && (
        <GameResultModal />
      )}
    </>
  );
};

export default GamePage;
