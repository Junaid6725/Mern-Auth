import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setOtpSubmited] = useState(false);

  const inputRef = useRef([]);
  const { backendURL, isLoggedIn, userData, getUserData } =
    useContext(AppContext);

  const handleInput = (e, index) => {
    if (e.target.value > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendURL + "/auth/send-reset-otp", {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();

    const otpArray = inputRef.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setOtpSubmited(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendURL + "/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.success);
        navigate("/login");
      } else {
        toast.error(data.success);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen  bg-linear-to-br from-blue-200 to-purple-400">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-5 sm:left-20 top-5  w-28 sm:w-32 cursor-pointer"
        />
        {!isEmailSent && (
          <form
            onSubmit={onSubmitEmail}
            className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          >
            <h1 className="text-white text-2xl font-semibold text-center mb-4">
              Reset Password
            </h1>
            <p className="text-center mb-6 text-indigo-600">
              Enter your registered email.
            </p>

            <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A57] mb-4">
              <img src={assets.mail_icon} alt="" className="w-3 h-3" />
              <input
                type="email"
                className="bg-transparent outline-none text-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="w-full py-3 bg-linear-to-r from-indigo-500 to-indigo-900 rounded-lg hover:cursor-pointer text-white">
              Submit
            </button>
          </form>
        )}

        {!isOtpSubmited && isEmailSent && (
          <form
            onSubmit={onSubmitOTP}
            className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          >
            <h1 className="text-white text-2xl font-semibold text-center mb-4">
              Reset Password OTP
            </h1>
            <p className="text-center mb-6 text-indigo-600">
              Enter the 6-digit code sent to your email.
            </p>
            <div className="flex justify-between mb-8" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    className="w-12 h-12 bg-[#333A57] text-white text-center text-xl rounded-md outline-none"
                    ref={(e) => (inputRef.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
            <button className="w-full py-2.5 bg-linear-to-r from-indigo-500 to-indigo-900 rounded-lg hover:cursor-pointer text-white">
              Submit
            </button>
          </form>
        )}

        {isEmailSent && isOtpSubmited && (
          <form
            onSubmit={onSubmitNewPassword}
            className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          >
            <h1 className="text-white text-2xl font-semibold text-center mb-4">
              New Password
            </h1>
            <p className="text-center mb-6 text-indigo-600">
              Enter your new password below.
            </p>

            <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A57] mb-4">
              <img src={assets.lock_icon} alt="" className="w-3 h-3" />
              <input
                type="password"
                className="bg-transparent outline-none text-white"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-3 bg-linear-to-r from-indigo-500 to-indigo-900 rounded-lg hover:cursor-pointer text-white">
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
