import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:5000/api/register", { username, password });
      window.location.href = "/login"; 
      console.log("Registering with:", { username, password })
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Register error:", err);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="reg-username" className="block">Username</label>
          <input
            id="reg-username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reg-password" className="block">Password</label>
          <input
            id="reg-password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 w-full text-black"
            required
          />
        </div>
        <Button type="submit" variant="default" className="w-full">Register</Button>
      </form>
      <p className="mt-4">
        Already have an account? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </div>
  );
};

export default Register;