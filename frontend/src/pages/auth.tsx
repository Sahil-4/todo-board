import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import AuthForm from "../components/AuthForm/AuthForm";

const Auth = () => {
  const { login, register } = useAppContext();

  const [state, setState] = useState("login");
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    login({ username, password }).then(() => {
      navigate("/");
    });
  };

  const handleRegister = (username: string, password: string) => {
    register({ username, password }).then(() => {
      navigate("/");
    });
  };

  const toggleForm = () => {
    setState((prevState) => (prevState === "login" ? "register" : "login"));
  };

  return (
    <main>
      {state === "login" ? (
        <AuthForm
          formHeading="Login"
          onSubmit={handleLogin}
          toggleForm={toggleForm}
          submitButtonText="Login"
        />
      ) : (
        <AuthForm
          formHeading="Register"
          onSubmit={handleRegister}
          toggleForm={toggleForm}
          submitButtonText="Sign up"
        />
      )}
    </main>
  );
};

export default Auth;
