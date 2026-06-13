import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const LayoutFixed = () => {
  return (
    <div className="h-auto bg-void-950 lg:h-screen lg:marvel-noise">
      <Header />
      <main className="lg:h-[calc(100vh-128px)] relative overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const LayoutLoose = () => {
  return (
    <div className="min-h-screen marvel-noise">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
