import React, { useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = UserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/userlogin");
    }
  }, [token]);
  
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/userlogin");
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
