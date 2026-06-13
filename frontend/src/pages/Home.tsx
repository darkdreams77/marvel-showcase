import Bg from "../assets/home-bg.jpg";
import Characters from "../assets/characters-card.jpg";
import Comics from "../assets/comic-card.jpg";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex h-full">
      <div className="w-1/2 h-[calc(100vh-70px)]">
        <img
          src={Bg}
          className="object-cover w-full max-h-full min-h-full opacity-20"
        />
      </div>
      <div
        className="w-1/2 h-full
       px-20 py-16 flex flex-col justify-center"
      >
        <div className="mb-10">
          <h1 className="text-5xl px-4 border-b-2 border-b-marvel-500">
            Bienvenue sur Marvel Showcase
          </h1>
          <p className="my-4">
            La source #1 des comics Marvel et de leurs personnages.
          </p>
        </div>
        <ul className="flex flex-col gap-10">
          <Link to="/personnages">
            <div className="relative h-100 w-full overflow-hidden marvel-card">
              <img src={Characters} className="w-full h-full object-cover" />
              <div className="marvel-overlay absolute inset-0"></div>
              <div className="absolute bottom-0 p-4">
                <p className="marvel-eyebrow">voir tous les</p>
                <h2 className="text-4xl">Personnages</h2>
              </div>
            </div>
            {/* <li className="marvel-card">
              <div className="marvel-overlay">
                <img src={Characters} className="h-100 w-full object-cover " />
              </div>
              <div className="p-4">personnages</div>
            </li> */}
          </Link>
          <Link to="/comics">
            <div className="relative h-100 w-full overflow-hidden marvel-card">
              <img src={Comics} className="w-full h-full object-cover" />
              <div className="marvel-overlay absolute inset-0"></div>
              <div className="absolute bottom-0 p-4">
                <p className="marvel-eyebrow">Voir tous les</p>
                <h2 className="text-4xl">Comics</h2>
              </div>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
};
