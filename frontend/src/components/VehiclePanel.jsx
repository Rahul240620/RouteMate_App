import React from "react";
import Toycar from "../assets/Toycar.png";
import Toybike from "../assets/Toybike.png";
import Toyauto from "../assets/Toyauto.png";
const vehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose your rides </h3>
      <div
        onClick={() => {
          props.selectVehicle("car");
          props.setConfirmRidePanel(true);
        }}
        className="border-2 active:border-black mb-2 rounded-xl p-3 w-full flex items-center justify-between "
      >
        <img
          className="h-12"
          src={Toycar}
          alt="toycar"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base ">
            Car{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xsb text-gray-600">
            Affordable, Car rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
      </div>

      <div
        onClick={() => {
          props.selectVehicle("moto");
          props.setConfirmRidePanel(true);
        }}
        className="border-2 active:border-black mb-2 rounded-xl p-3 w-full flex items-center justify-between "
      >
        <img
          className="h-12"
          src={Toybike}
          alt="toymoto"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base ">
            Moto Bike{" "}
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xsb text-gray-600">
            Affordable, Moto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
      </div>

      <div
        onClick={() => {
          props.selectVehicle("auto");
          props.setConfirmRidePanel(true);
        }}
        className="border-2 active:border-black mb-2 rounded-xl p-3 w-full flex items-center justify-between "
      >
        <img
          className="h-12"
          src={Toyauto}
          alt="toyauto"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base ">
            Auto{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xsb text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default vehiclePanel;
