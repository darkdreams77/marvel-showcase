import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const LayoutFixed = () => {
  return (
    <div className="bg-void-950 min-h-screen lg:marvel-noise">
      <Header />
      <main className="min-h-[calc(100vh-128px)] relative overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const LayoutLoose = () => {
  return (
    <div className="min-h-screen h-auto marvel-noise">
      <Header />
      <main className="lg:min-h-[calc(100vh-128px)] ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
