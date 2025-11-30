import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CaptainContext from "../context/CaptainContext";
import axios from "axios";
import RoutmateLogo2 from "../assets/RoutemateLogo2.png";
function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = CaptainContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="py-7 px-5 bg-white h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 mb-10" src={RoutmateLogo2} alt="" />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's name ?
          </h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              className="bg-[#eeeeee] w-1/2   rounded px-4 py-2 border  text-lg placeholder:text-base "
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              required
              className="bg-[#eeeeee] w-1/2   rounded px-4 py-2 border  text-lg placeholder:text-base "
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">
            What's your Captain's email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5  rounded px-4 py-2 border w-full text-lg placeholder:text-base "
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium  mb-2">Enter the password </h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5  rounded px-4 py-2 border w-full text-lg placeholder:text-base "
            type="password"
            placeholder="password"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 bordertext-lg placeholder:text-base "
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vehicle color"
            />
            <input
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 bordertext-lg placeholder:text-base "
              type="text"
              placeholder="Vehicle plate"
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 bordertext-lg placeholder:text-base "
              type="text"
              placeholder="Vehicle capacity"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 bordertext-lg placeholder:text-base "
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motor bike">Motor Bike</option>
            </select>
          </div>

          <button
            className="bg-[#111] text-white font-semibold mb-7  rounded px-4 py-2 w-full text-lg placeholder:text-base "
            type="email"
          >
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account ?
          <Link to="/captainlogin" className="text-blue-300">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] text-center leading-tight">
          his site is protected by reCAPTCHA and the
          <span className="underline">Google Privacy Policy</span> and
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup;
