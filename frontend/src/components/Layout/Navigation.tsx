import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Navigation = () => {
  const { user, handleLogout } = useAuth();

  return (
    <nav className="absolute top-16 left-0 w-full md:w-auto bg-void-950 md:relative flex flex-col md:flex-row md:top-0 items-end md:items-center gap-10 p-10 md:p-0">
      <Link
        to="/personnages"
        className="cursor-pointer marvel-title underline-hover"
      >
        Personnages
      </Link>
      <Link
        to="/comics"
        className="cursor-pointer marvel-title underline-hover"
      >
        Comics
      </Link>
      {user ? (
        <>
          <Link
            to="/favoris"
            className="cursor-pointer marvel-title underline-hover"
          >
            Favoris
          </Link>
          <button
            onClick={handleLogout}
            className="cursor-pointer marvel-title underline-hover"
          >
            Déconnexion
          </button>
        </>
      ) : (
        <Link to="/login" className="cursor-pointer btn-marvel">
          Se connecter / S'inscrire
        </Link>
      )}
    </nav>
  );
};
