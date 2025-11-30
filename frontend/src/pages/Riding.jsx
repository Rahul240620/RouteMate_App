import React from "react";
import { Link, useLocation } from "react-router-dom";
import SocketContext from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import Toycar from "../assets/Toycar.png";
import Livepage from "../assets/Livepage.gif";

function Riding() {
  const location = useLocation();
  const { ride } = location.state || {}; // Retrieve ride data
  const { socket } = SocketContext();
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });
  return (
    <div className="h-screen ">
      <Link
        to="/home"
        className="fixed  h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <img className="w-full h-full object-cover" src={Livepage} alt="" />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between ">
          <img className="h-14" src={Toycar} alt="Toycar" />
          <div className="text-right">
            <h2 className="text-lg -mt-2 -mb-1  font-medium ">
              {ride?.captain.fullname.firstname}
            </h2>
            <h4 className=" text-lg font-semibold">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto </p> 
          </div>
        </div>

        <div className="flex  gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className=" text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium"> 362/12-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3  ">
              <i className=" text-lg ri-cash-line"></i>
              <div>
                {" "}
                <h3 className="text-lg font-medium">₹ {ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full mt-5 font-semibold p-2 rounded-lg text-white bg-green-500">
          Make a Payment
        </button>
      </div>
    </div>
  );
}

export default Riding;
