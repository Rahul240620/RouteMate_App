import React, { useState } from "react";
import { Link } from "react-router-dom";
import CaptainContext from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RoutmateLogo2 from "../assets/RoutemateLogo2.png";
function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = CaptainContext();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captainData
    );
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 bg-white h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 mb-10" src={RoutmateLogo2} alt="" />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base "
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-xl font-medium mb-2">Enter the password </h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base "
            type="password"
            placeholder="password"
          />

          <button
            className="bg-[#111] text-white font-semibold mb-7  rounded px-4 py-2 w-full text-lg placeholder:text-base "
            type="email"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet ?
          <Link to="/captainsignup" className="text-blue-300">
            Register as Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/userlogin"
          className="bg-[#d5622d] flex items-center justify-center  text-white font-semibold mb-5  rounded px-4 py-2 w-full text-lg placeholder:text-base "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;
