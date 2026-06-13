import { useState } from "react";
import { Login } from "../components/AuthTabs/Login";
import { Signup } from "../components/AuthTabs/Signup";
import { cn } from "../helpers/cn";

import Bg from "../assets/bg-auth.jpg";

type AuthTab = "login" | "signup";

export const Auth = () => {
  const [active, setActive] = useState<AuthTab>("login");

  return (
    <div className="flex h-full">
      <div className="w-1/2 h-[calc(100vh-70px)]">
        <img src={Bg} className="object-cover w-full min-h-full opacity-20" />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-[calc(100vh-70px)]">
        <div className="w-1/2">
          <div className="flex mb-6 ">
            {(["login", "signup"] as AuthTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors cursor-pointer",
                  "border-b-2 marvel-title",
                  active === tab
                    ? "border-marvel-500 text-marvel-500"
                    : "border-transparent text-steel-200 hover:text-steel-100",
                )}
              >
                {tab === "login" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>

          {active === "login" && <Login />}
          {active === "signup" && <Signup />}
        </div>
      </div>
    </div>
  );
};
