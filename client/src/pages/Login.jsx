import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(backendURL + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-5 sm:left-20 top-5  w-28 sm:w-32 cursor-pointer"
        />
        <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
          <h2 className="text-3xl font-semibold text-white text-center mb-3">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-sm text-center mb-6">
            {state === "Sign Up"
              ? "Create Your Account"
              : "Login To Your Account"}
          </p>

          <form onSubmit={onSubmitHandler}>
            {state === "Sign Up" && (
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="" className="" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="bg-transparent outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="" className="" />
              <input
                type="email"
                placeholder="Email"
                required
                className="bg-transparent outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" className="" />
              <input
                type="text"
                placeholder="Password"
                required
                className="bg-transparent outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p
              className="mb-4 text-indigo-500 cursor-pointer"
              onClick={() => navigate("/reset-password")}
            >
              Forgot Password?
            </p>
            <button className="w-full py-2.5 rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 hover:cursor-pointer text-white font-medium">
              {state}
            </button>
          </form>
          {state === "Sign Up" ? (
            <p className="mt-3 text-gray-400 text-center text-xs ">
              Already have an account?
              <span
                onClick={() => setState("Login")}
                className="pl-1 text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="mt-3 text-gray-400 text-center text-xs ">
              Don't have an account?
              <span
                onClick={() => setState("Sign Up")}
                className="pl-1 text-blue-400 cursor-pointer underline"
              >
                Register here
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
