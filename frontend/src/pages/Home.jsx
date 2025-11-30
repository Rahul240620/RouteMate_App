import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import SocketContext from "../context/SocketContext";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Routematelogo2 from "../assets/Routematelogo2.png";
import StartBackground3 from "../assets/StartBackground3.png";
import { Link } from "react-router-dom";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeFeild, setActiveFeild] = useState("null");
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState("null");
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { socket } = SocketContext();
  const { user } = UserContext();

  useEffect(() => {
    if (!user || !user._id) return;
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log("ride");
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
  });

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  {
    /* loaction search  panel */
  }
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "50%",
        padding: 24,
        // opacity: 1
      });

      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  {
    /* Vehice panel */
  }
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  {
    /* Confirm ride panel */
  }
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  {
    /* Looking for a driver panel */
  }
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  {
    /* Waiting for a driver panel */
  }
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data);
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="fixed pt-1 px-6 top-0 flex items-center justify-between w-screen ">
        <img className="w-16 " src={Routematelogo2} alt="" />
        <Link
          to="/user/logout"
          className="h-8 w-8  bg-white flex items-center justify-center rounded-full "
        >
          <i className="text-sm font-medium ri-logout-box-line"></i>
        </Link>
      </div>

      <div className="h-screen w-screen">
        <img
          className="w-full h-full object-cover"
          src={StartBackground3}
          alt=""
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-10 w-full">
        <div className="bg-white h-36% p-6 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form className="relative py-3" onSubmit={(e) => submitHandler(e)}>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveFeild("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveFeild("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text- rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter Your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-2 mb-6 w-full"
          >
            Find Trip
          </button>
        </div>

        {/* location search Panel */}
        <div ref={panelRef} className="bg-white h-0 ">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            suggestions={
              activeFeild === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            activeFeild={activeFeild}
            setPickup={setPickup}
            setDestination={setDestination}
          />
        </div>
      </div>

      {/* Vehicle panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full bg-white z-10 -bottom-5 translate-y-full px-3 py-10 pt-12 mt-20 "
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      {/* ConfirmRide panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full bg-white  z-10 -bottom-10 translate-y-full px-3 py-12  pt-10 mt-20  "
      >
        <ConfirmRide
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Looking for a driver panel */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full bg-white  z-10 -bottom-10 translate-y-full  px-3 py-12  pt-12 mt-20  "
      >
        <LookingForDriver
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

      {/* Waiting for a driver panel */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full h-[65%] bg-white  z-10 -bottom-5 translate-y-full px-3 py-6  pt-12 mt-20 "
      >
        <WaitingForDriver
          setRide={setRide}
          setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
}
export default Home;
