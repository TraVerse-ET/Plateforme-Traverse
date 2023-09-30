import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import "../styles/unityProject.css";
import Login from "./login";
import Popup from "./modals/Modal";

export const Visit = () => {
  const { token, setToken } = useToken();
  const [openPopup, setOpenPopup] = useState(false);
  const handlePopup = () => setOpenPopup(!openPopup);
  const navigate = useNavigate();

  const handleLogin = () => {
    handlePopup();
    console.log("user calling login");
  };
  const handleVisit = () => {
    navigate("/vr-visit");
  }

  return (
    <>
      <div id="visits">
        <div className="container w-500 h-300">
          <div className="section-title text-center">
            <h2>Demo de notre visite KOUTOUBIA</h2>
            {!token && <p> Vous devez être connectez pour voir la visite </p>}
          </div>

          <div
            className={`w-480 h-270 m-auto flex items-center border-10 border-gray-200 rounded-lg shadow-md relative`}
          >
            <div
              className="w-full h-fit"
              style={{
                filter:
                  token !== null && token !== undefined && token !== 0
                    ? "none"
                    : "blur(5px)",
              }}
            >
            <video 
                  className="border-10 border-gray-200 rounded-lg shadow-md"
    autoPlay
    controls
    width="480"
    height="270" // Spécifiez la hauteur souhaitée en pixels
            >
                <source src="/video/Musium.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
            </video>
            </div>
            {!token && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                <button
                  onClick={handleLogin}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Se connecter
                </button>
              </div>
            )}
             {token && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                <button
                  onClick={handleVisit}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Begin Visit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {openPopup && (
        <Popup onClose={handlePopup}>
          <Login onClose={handlePopup} />
        </Popup>
      )}
    </>
  );
};
