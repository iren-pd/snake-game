import runCatGif from '../assets/run-snake.gif';
import  "../index.css"

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full h-26 overflow-hidden">
      <img src={runCatGif} alt="Бегущая змейка" className="snake-run w-[100px] md:w-[150px]" />
    </footer>
  );
};
