import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import SocketContext from "../context/SocketContext";
import CaptainContext from "../context/CaptainContext";
import axios from "axios";
import Routematelogo2 from "../assets/Routematelogo2.png";
import StartBackground3 from "../assets/StartBackground3.png";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const confirmRidePopUpPanelRef = useRef(null);

  const [ride, setRide] = useState(null);

  const { socket } = SocketContext();
  const { captain } = CaptainContext();

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, []);

  socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopUpPanel(true);
  });
  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  }

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div className="h-screen w-screen relative overflow-hidden  ">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen ">
        <img className="w-16 " src={Routematelogo2} alt="" />
        <Link
          to="/captain/logout"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full "
        >
          <i className="text-lg font-medium ri-logout-box-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="w-full h-full object-cover"
          src={StartBackground3}
          alt=""
        />
      </div>
      <div className=" h=2/5 p-6">
        <CaptainDetails setRidePopUpPanel={setRidePopUpPanel} />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full  z-10 bottom-0 translate-y-full  px-3 py-10 pt-12 bg-white "
      >
        <RidePopUp
          ride={ride}
          ridePopUpPanel={ridePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed w-full  z-10 bottom-0 h-screen translate-y-full pt-12  px-3 py-10 bg-white "
      >
        <ConfirmRidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          confirmRidePopUpPanel={confirmRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
    </div>
  );
};
export default CaptainHome;
