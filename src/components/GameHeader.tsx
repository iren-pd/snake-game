import { FC } from 'react';

type GameHeaderProps = {
  score: number;
  time: string;
};

const GameHeader: FC<GameHeaderProps> = ({ score, time }) => {
  return (
    <header className="w-full fixed top-0 left-0 flex justify-between items-center px-8 py-4 bg-white shadow-md z-50">
      <div>Score: {score || 0}</div>
      <div>Time: {time || 0}</div>
    </header>
  );
};

export default GameHeader;
