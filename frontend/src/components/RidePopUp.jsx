import React from "react";
import Userimage from "../assets/Userimage.png";

const RidePopUp = (props) => {
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
      <h3 className="text-2xl font-semibold mb-5  "> New Ride Available </h3>
      <div className=" flex items-center justify-between p-3 rounded-lg    bg-white mt-4 ">
        <div className=" flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover "
            src={Userimage}
            alt=""
          />
          <h2 className="text-xl font-medium">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
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
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
            </div>
          </div>
        </div>
        <div className=" flex mt-5 w-full items-center justify-between">
          <button
            onClick={() => {
              props.setConfirmRidePopUpPanel(true);
              props.confirmRide();
            }}
            className="  font-semibold p-3 px-10 rounded-lg text-white bg-green-600"
          >
            Accept
          </button>

          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className=" mt-1  font-semibold p-3 px-10 rounded-lg text-white bg-orange-500"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
