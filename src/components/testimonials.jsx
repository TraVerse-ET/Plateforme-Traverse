import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import useToken from "../hooks/useToken";
import "../styles/unityProject.css"
import Login from "./login";
import Popup from "./modals/Modal";


export const Testimonials = () => {
  const {token, setToken} = useToken();
const [openPopup, setOpenPopup] = useState(false);
  const handlePopup = () => setOpenPopup(!openPopup);

  const { unityProvider } = useUnityContext({
    loaderUrl: "./traverse_koutoubia/Build/WebGL.loader.js",
    dataUrl: "./traverse_koutoubia/Build/webgl.data",
    frameworkUrl: "./traverse_koutoubia/Build/build.framework.js",
    codeUrl: "./traverse_koutoubia/Build/build.wasm",
  });

  const handleLogin = () => {
    handlePopup()
      console.log("user calling login")
  }

  return (
    <>
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>Demo de notre visite KOUTOUBIA</h2>
          {!token &&(<p> Vous devez être connectez pour voir la visite </p>)}
                 {!token &&(<button onClick={handleLogin} className="" type="button" >se connecter</button>)}   

        </div>

   
        <div className={`w-1200 h-600 m-auto flex items-center border-10 border-gray-200 rounded-lg shadow-md `}>
          <div
            className="w-full h-full"
            style={{
            filter: token !== null && token !== undefined && token !== 0 ? 'none' : 'blur(5px)',            }}
          >
             <Unity unityProvider={unityProvider}
              style={{
              width: '100%',
              height: '100%',
              border: '10px solid #f1f1f1',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              background: 'black',
              marginLeft: '-50px',
            }} />
          </div>
        </div>
      </div>
    </div>
      {openPopup && <Popup onClose={handlePopup}>
    <Login onClose={handlePopup}/>
    </Popup>}
    </>
  );
};