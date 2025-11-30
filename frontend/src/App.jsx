import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import UserLogin from "./pages/UserLogin";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import { UserDataProvider } from "./context/UserContext";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import { CaptainDataProvider } from "./context/CaptainContext";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import "remixicon/fonts/remixicon.css";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <CaptainDataProvider>
      <UserDataProvider>
        <SocketProvider>
          <div>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/usersignup" element={<UserSignup />} />
              <Route path="/captainsignup" element={<CaptainSignup />} />
              <Route path="/captainlogin" element={<CaptainLogin />} />
              <Route path="/userlogin" element={<UserLogin />} />
              <Route path="/riding" element={<Riding />} />
              <Route path="/captain-riding" element={<CaptainRiding />} />
              <Route
                path="/home"
                element={
                  <UserProtectedWrapper>
                    <Home />
                  </UserProtectedWrapper>
                }
              />
              <Route
                path="/user/logout"
                element={
                  <UserProtectedWrapper>
                    <UserLogout />
                  </UserProtectedWrapper>
                }
              />
              <Route
                path="/captain-home"
                element={
                  <CaptainProtectedWrapper>
                    <CaptainHome />
                  </CaptainProtectedWrapper>
                }
              />
              <Route
                path="/captain/logout"
                element={
                  <CaptainProtectedWrapper>
                    <CaptainLogout />
                  </CaptainProtectedWrapper>
                }
              />
            </Routes>
          </div>
        </SocketProvider>
      </UserDataProvider>
    </CaptainDataProvider>
  );
}

export default App;
