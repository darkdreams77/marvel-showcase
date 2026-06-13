import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="min-h-screen marvel-noise">
      <Header />
      <main className="h-[calc(100vh-128px)] relative z-80 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
