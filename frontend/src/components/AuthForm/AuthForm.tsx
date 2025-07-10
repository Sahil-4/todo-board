import { useState } from "react";
import "./AuthForm.css";

type Props = {
  formHeading: string;
  submitButtonText?: string;
  onSubmit: (username: string, password: string) => void;
  toggleForm: () => void;
};

const AuthForm = (props: Props) => {
  const { formHeading, onSubmit, toggleForm, submitButtonText = "Submit" } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="auth-form">
      <h2>{formHeading}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">{submitButtonText}</button>
      </form>

      <p>
        {formHeading === "Login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={toggleForm}>{formHeading === "Login" ? "Register" : "Login"}</span>
      </p>
    </div>
  );
};

export default AuthForm;
