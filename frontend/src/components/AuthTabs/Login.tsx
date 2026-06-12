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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const handleFormLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await handleLogin(username, email, password);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setIsLoading(false);
        setErrors(error.message);
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

        {errors && <div className="text-marvel-500">{errors}</div>}

        <button
          type="submit"
          className="mt-4 btn-marvel basis-0"
          disabled={isLoading}
        >
          Se connecter
        </button>
      </form>
    </Container>
  );
};
