import React from "react";
import Carjump from "../assets/Carjump.gif";

const lookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehicleFound(false);
          props.setWaitingForDriver(true);
        }}
      >
        <i className=" text-3xl pt-15 text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 p-5">Looking for a Driver </h3>

      <div className="flex  gap-2 justify-between flex-col items-center">
        <img className="h-20" src={Carjump} alt="" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium"> 562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium"> 362/12-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  ">
            <i className=" text-lg ri-cash-line"></i>
            <div>
              {" "}
              <h3 className="text-lg font-medium">
                ₹{props.fare[props.vehicleType]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Total Fare</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default lookingForDriver;
