import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import Toast from "./Toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      dispatch(loginFailure("Please enter a valid email"));
      return false;
    }
    if (!password || password.length < 6) {
      dispatch(loginFailure("Password must be at least 6 characters"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      dispatch(loginSuccess(response.data.token));
      navigate("/users");
    } catch (err) {
      dispatch(loginFailure("Invalid credentials"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-3">
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-3xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
      {error && <Toast />} {/* Show toast for auth errors */}
    </div>
  );
};

export default Login;