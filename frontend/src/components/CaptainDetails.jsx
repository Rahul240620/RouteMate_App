import React from "react";
import CaptainContext from "../context/CaptainContext";
import Driverimage from "../assets/Driverimage.png";
const CaptainDetails = (props) => {
  const { captain } = CaptainContext();
  props.setRidePopUpPanel(true);

  return (
    <div>
      <div className="h-2/5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-Start gap-3 ">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={Driverimage}
              alt="driverimage"
            />
            <h4 className="text-xl font-semibold capitalize">
              {captain.fullname.firstname + " " + captain.fullname.lastname}
            </h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">295.50 </h4>
            <p className="text-sm text-gray-600 ">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5">
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin  ri-timer-2-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 ">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 ">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 ">Hours Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
