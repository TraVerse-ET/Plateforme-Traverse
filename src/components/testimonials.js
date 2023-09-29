import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import useToken from "../hooks/useToken";
import "../styles/unityProject.css";
import Login from "./login";
import Popup from "./modals/Modal";

export const Testimonials = () => {
  const { token, setToken } = useToken();
  const [openPopup, setOpenPopup] = useState(false);
  const handlePopup = () => setOpenPopup(!openPopup);

  const { unityProvider } = useUnityContext({
    loaderUrl: "./traverse_koutoubia/Build/WebGL.loader.js",
    dataUrl: "./traverse_koutoubia/Build/webgl.data",
    frameworkUrl: "./traverse_koutoubia/Build/build.framework.js",
    codeUrl: "./traverse_koutoubia/Build/build.wasm",
  });

  const handleLogin = () => {
    handlePopup();
    console.log("user calling login");
  };

  return (
    <>
      <div id="testimonials">
        <div className="container">
          <div className="section-title text-center">
            <h2>Demo de notre visite KOUTOUBIA</h2>
            {!token && <p> Vous devez être connectez pour voir la visite </p>}
          </div>

          <div
            className={`w-1200 h-600 m-auto flex items-center border-10 border-gray-200 rounded-lg shadow-md relative`}
          >
            <div
              className="w-full h-full"
              style={{
                filter:
                  token !== null && token !== undefined && token !== 0
                    ? "none"
                    : "blur(5px)",
              }}
            >
              <Unity
                unityProvider={unityProvider}
                className="w-full h-full border-10 border-gray-200 rounded-lg shadow-md"
              />
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
