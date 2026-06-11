import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../Layout/Container";
import { Input } from "../atoms/Input";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await handleLogin(username, email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <Container className="py-10">
      <form
        onSubmit={handleFormLogin}
        className="flex flex-col w-full gap-6 mx-auto md:w-2/3"
      >
        <Input
          label="Nom d'utilisateur"
          type="text"
          id="username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          autoComplete="username"
        />

        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          autoComplete="email"
        />

        <Input
          label="Mot de passe"
          type="password"
          id="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit" className="mt-4 btn-marvel">
          Se connecter
        </button>
      </form>
    </Container>
  );
};
