import { useState } from "react";
import { Login } from "../components/AuthTabs/Login";
import { Signup } from "../components/AuthTabs/Signup";
import { cn } from "../helpers/cn";

import Bg from "../assets/bg-auth.jpg";
import { SplitLayout } from "../components/Layout/SplitLayout";

type AuthTab = "login" | "signup";

export const Auth = () => {
  const [active, setActive] = useState<AuthTab>("login");

  return (
    <SplitLayout backgroundImg={Bg}>
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
    </SplitLayout>
  );
};
