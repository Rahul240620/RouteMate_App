import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Userimage from "../assets/Userimage.png";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride `,
      {
        params: {
          rideId: props.ride_id,
          otp: otp,
        },

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      props.setConfirmRidePopUpPanel(false);
      props.setRidePopUpPanel(false);
      navigate("/captain-riding", { state: { ride: props.ride } });
    }
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5  ">
        Confirm this ride to start
      </h3>
      <div className=" flex items-center justify-between p-3 rounded-lg    bg-yellow-400 mt-4 ">
        <div className=" flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover "
            src={Userimage}
            alt="userimage"
          />
          <h2 className="text-xl font-medium">
            {props.ride?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-xl font-semibold "> 2.2 KM</h5>
      </div>
      <div className="flex  gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium"> 562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium"> 362/12-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  ">
            <i className=" text-lg ri-cash-line"></i>
            <div>
              {" "}
              <h3 className="text-lg font-medium">₹ {props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
            </div>
          </div>
        </div>
        <div className=" mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text- rounded-lg w-full mt-5"
              placeholder="Enter OTP"
            />

            <button
              onClick={() => {
                navigate("/captain-riding");
              }}
              className="w-full mt-5 flex justify-center font-semibold p-2 rounded-lg text-white bg-green-500"
            >
              Confirm
            </button>

            <button
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}
              className="w-full mt-3 font-semibold p-2 rounded-lg text-white bg-orange-500"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
