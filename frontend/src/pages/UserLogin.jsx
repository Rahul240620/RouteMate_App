import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoutmateLogo2 from "../assets/RoutemateLogo2.png";
function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = UserContext();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    setEmail("");
    setPassword("");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
  };

  return (
    <div className="p-7 bg-white h-screen flex flex-col justify-between">
      <div>
        <img className=" h-14 w-17 mb-10" src={RoutmateLogo2} alt="" />
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

          <h3 className="text-xl mb-2">Enter the password </h3>

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
          {" "}
          New here ?{" "}
          <Link to="/usersignup" className="text-blue-300">
            {" "}
            Create New Account{" "}
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/captainlogin"
          className="bg-[#10b461] flex items-center justify-center  text-white font-semibold mb-5  rounded px-4 py-2 w-full text-lg placeholder:text-base "
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
