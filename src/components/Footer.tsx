import runCatGif from '../assets/run-snake.gif';
import  "../index.css"

export const Footer = () => {
  return (
    <div className="absolute bottom-0 w-full h-24 overflow-hidden">
      <img src={runCatGif} alt="Бегущая змейка" className="snake-run" />
    </div>
  );
};
