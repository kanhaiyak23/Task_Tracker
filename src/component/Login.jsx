import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from "../assets/bg.avif";

const mockCredentials = { username: "user", password: "password" };

const Login = () => {
  const [isDay, setIsDay] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsDay(!isDay);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page
    if (
      username === mockCredentials.username &&
      password === mockCredentials.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000); // After success, navigate to dashboard
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div
      className={`flex justify-center items-center h-screen transition-all duration-2000 ${
        isDay ? "bg-white" : "bg-black"
      }`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",  // Ensures the background image covers the whole page
        backgroundPosition: "center",  // Centers the image
      }}
    >
      <ToastContainer />
      <label className="absolute top-10 left-1/2 transform -translate-x-1/2 cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          checked={isDay}
          onChange={handleToggle}
        />
        <div
          className={`w-9 h-9 rounded-full relative transition-all duration-300 ${
            isDay ? "bg-yellow-400" : "bg-transparent"
          }`}
          style={{
            boxShadow: isDay
              ? "inset 32px -32px 0 0 #fff"
              : "inset 16px -16px 0 0 #fff",
            transform: isDay ? "scale(0.5)" : "scale(1) rotate(-2deg)",
          }}
        >
          <div
            className={`absolute w-full h-full rounded-full top-0 left-0 transition-all duration-300 ${
              isDay ? "bg-yellow-400" : ""
            }`}
          ></div>
          <div
            className={`absolute w-2 h-2 rounded-full bg-yellow-400 transition-all duration-500 ${
              isDay ? "scale-150" : "scale-0"
            }`}
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      </label>

      <div
        className={`w-96 h-[450px] border-2 rounded-2xl flex justify-center items-center backdrop-blur-lg ${
          isDay
            ? " bg-gradient-to-b from-transparent to-yellow-500 border-blue-500"
            : " bg-gradient-to-b from-transparent to-teal-400 border-blue-100"
        }`}
      >
        <form className="w-full" onSubmit={handleLogin}>
          <h2
            className={`text-2xl font-bold text-center mb-8 ${
              "text-white"
            }`}
          >
            Login Here 
          </h2>

          <div className="relative mb-8 w-72">
            <ion-icon
              name="mail-outline"
              className={`absolute top-1/2 left-2 transform -translate-y-1/2 ${
                isDay ? "text-black" : "text-white"
              } text-xl`}
            ></ion-icon>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full h-12 bg-transparent border-b-2 pl-10 focus:outline-none focus:ring-0 ${
                "text-white placeholder-white"
              }`}
            />
            <label
              className={`absolute left-2 text-xl transform -translate-y-1/2 top-4 -bottom-2/3 transition-all duration-300 ${
               "text-white"
              }`}
            >
              Username
            </label>
          </div>

          <div className="relative mb-8 w-72">
            <ion-icon
              name="lock-closed-outline"
              className={`absolute top-1/2 left-2 transform -translate-y-1/2 ${
                "text-white"
              } text-xl`}
            ></ion-icon>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-12 bg-transparent border-b-2 pl-10 focus:outline-none focus:ring-0 ${
                "text-white placeholder-white"
              }`}
            />
            <label
              className={`absolute left-2 text-xl transform -translate-y-1/2 transition-all duration-300 bottom-2/3 ${
                 "text-white"
              }`}
            >
              Password
            </label>
          </div>

          <div className="flex justify-between mb-6 text-sm">
            <label className={`${ "text-white"}`}>
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <label className={`${ "text-white"}`}>
              Forgot Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-10 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300 transition duration-200"
          >
            Log In
          </button>

          <div className="text-center text-sm mt-6">
            <p className={`${ "text-white"}`}>
              Don't have an account?{" "}
              <a href="#" className="font-bold hover:underline">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
