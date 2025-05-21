import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const isAlphanumeric = (str) => /^[a-z0-9]+$/i.test(str);
  const isAlpha = (str) => /^[a-zA-Z\s]+$/.test(str.trim());


    const validateInput = (field, label) => {
    if (!field) return `${label} is required.`;
    if (field.length > 12) return `${label} must be at most 12 characters.`;

    if (label === "Name" && !isAlpha(field)) return `${label} must contain only letters.`;
    if ((label === "Username" || label === "Password") && !isAlphanumeric(field))
        return `${label} must be alphanumeric.`;

    return null;
    };

  const handleLogin = () => {
    const errors = [
      validateInput(name, "Name"),
      validateInput(username, "Username"),
      validateInput(password, "Password"),
    ].filter(Boolean);

    if (errors.length > 0) {
      setMessage(errors[0]);
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password); // 🚨 demo only

    navigate("/home");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {message && (
          <div className="alert alert-danger py-2 text-center" role="alert">
            {message}
          </div>
        )}

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Login;
