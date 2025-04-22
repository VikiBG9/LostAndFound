import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  setUser: (user: string | null) => void;
};

export const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login",
        { username, password },
        { withCredentials: true }
      );

      console.log("Login success:", response.data);
      console.log("Login success:", response);

      setUser(response.data.username);

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto text-foreground">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full text-black"
            required
          />
        </div>
        <Button type="submit" variant="default" className="w-full">Login</Button>
      </form>
      <p className="mt-4">
        Don't have an account? <a href="/register" className="text-blue-500">Register</a>
      </p>
    </div>
  );
};

export default Login;