import { FC } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import { formatTimeUnit } from '../utils/formatTime';

const GameHeader: FC = () => {
  const score = useSelector((state: RootState) => state.score);
  const time = useSelector((state: RootState) => state.time);

  const formattedTime = `${time.hours}:${formatTimeUnit(
    time.minutes
  )}:${formatTimeUnit(time.seconds)}`;

  return (
    <header className="w-full fixed top-0 left-0 flex justify-between items-center px-8 py-4 bg-white shadow-md z-50">
      <div>Score: {score || 0}</div>
      <div>Time: {formattedTime}</div>
    </header>
  );
};

export default GameHeader;
