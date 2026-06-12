import { Link } from "react-router-dom";
import Logo from "../../assets/marvel-logo.svg";
import { Container } from "./Container";
import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const { user, handleLogout } = useAuth();

  return (
    <header className="bg-void-950 h-17.5 sticky top-0 z-10">
      <Container className="flex items-center justify-between py-4">
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo Marvel" className="w-24" />
          </Link>
        </div>
        <nav className="flex items-center gap-10">
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
      </Container>
    </header>
  );
};
