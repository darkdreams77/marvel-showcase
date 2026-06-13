import { Link } from "react-router-dom";
import { Divide as HamburgerDivide } from "hamburger-react";

import { Container } from "./Container";
import Logo from "../../assets/marvel-logo.svg";
import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Navigation } from "./Navigation";

export const Header = () => {
  const isMobile = useIsMobile();
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

  return (
    <header className="px-4 bg-void-950 h-16 sticky top-0 z-80 border-b border-b-void-500">
      <Container className="flex items-center justify-between h-full">
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo Marvel" className="w-24" />
          </Link>
        </div>
        {isMobile && (
          <HamburgerDivide onToggle={() => setDisplayMobileMenu((v) => !v)} />
        )}
        {displayMobileMenu && isMobile && <Navigation />}
        {!isMobile && <Navigation />}
      </Container>
    </header>
  );
};
