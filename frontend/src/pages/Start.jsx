import React from "react";
import { Link } from "react-router-dom";
import Routematelogo2 from "../assets/Routematelogo2.png";
import StartBackground3 from "../assets/StartBackground3.png";
function Start() {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${StartBackground3})` }}
        className="bg-cover bg-center bg-[url(../assets/StartBackground.png)] h-screen pt-8 flex justify-between flex-col w-full "
      >
        <img className="w-16 ml-8" src={Routematelogo2} alt="" />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-2xl font-bold">Get Started with Routemate</h2>
          <Link
            to="/userlogin"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
