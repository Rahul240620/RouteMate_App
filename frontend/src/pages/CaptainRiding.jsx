import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import SocketContext from "../context/SocketContext";
import RoutemateLogo2 from "../assets/RoutemateLogo2.png";
import Livepage from "../assets/Livepage.gif";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen ">
        <img className="w-16 " src={RoutemateLogo2} alt="RoutemateLogo2" />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full "
        >
          <i className="text-lg font-medium ri-home-9-fill"></i>
        </Link>
      </div>

      <div className="h-4/5">
        <img
          className="w-full h-full object-cover"
          src={Livepage}
          alt="Live Map"
        />
      </div>

      <div
        className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5
          className="p-1 text-center w-[95%] absolute top-0"
          onClick={() => {}}
        >
          <i className=" text-3xl text-gray-500 ri-arrow-up-wide-line"></i>
        </h5>

        <h4 className=" text-xl font-semibold"> 4 KM away</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full  z-10 bottom-0  translate-y-full  px-3 py-10 pt-12 bg-white "
      >
        <FinishRide
          ride={rideData}
          finishRidePanel={finishRidePanel}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
