import Bg from "../assets/home-bg.jpg";
import Characters from "../assets/characters-card.jpg";
import Comics from "../assets/comic-card.jpg";
import { Link } from "react-router-dom";
import { SplitLayout } from "../components/Layout/SplitLayout";

export const Home = () => {
  return (
    <SplitLayout backgroundImg={Bg}>
      <div className="mb-10">
        <h1 className="text-3xl text-balance lg:text-5xl px:0 border-b-2 border-b-marvel-500">
          Bienvenue sur Marvel Showcase
        </h1>
        <p className="my-4">
          La source #1 des comics Marvel et de leurs personnages.
        </p>
      </div>
      <ul className="flex flex-col gap-10">
        <Link to="/personnages">
          <div className="relative h-50 md:h-60 lg:h-80 w-full overflow-hidden marvel-card">
            <img src={Characters} className="w-full h-full object-cover" />
            <div className="marvel-overlay absolute inset-0"></div>
            <div className="absolute bottom-0 p-4">
              <p className="marvel-eyebrow">voir tous les</p>
              <h2 className="text-4xl">Personnages</h2>
            </div>
          </div>
        </Link>
        <Link to="/comics">
          <div className="relative h-50 md:h-60 lg:h-80 w-full overflow-hidden marvel-card">
            <img src={Comics} className="w-full h-full object-cover" />
            <div className="marvel-overlay absolute inset-0"></div>
            <div className="absolute bottom-0 p-4">
              <p className="marvel-eyebrow">Voir tous les</p>
              <h2 className="text-4xl">Comics</h2>
            </div>
          </div>
        </Link>
      </ul>
    </SplitLayout>
  );
};
