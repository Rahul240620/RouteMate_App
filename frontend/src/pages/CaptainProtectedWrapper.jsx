import React, { useEffect, useState } from "react";
import CaptainContext from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = CaptainContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate("/captainlogin");
    }
  }, [token]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem("token");
      navigate("/captainlogin");
    });

  if (isLoading) {
    return <div>Loading....</div>;
  }
  return <>{children}</>;
};

export default CaptainProtectedWrapper;
