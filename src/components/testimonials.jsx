import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import UserService from "../helpers/userService";
import "../styles/unityProject.css"


export const Testimonials = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(UserService.isLoggedIn());

  const { unityProvider } = useUnityContext({
    loaderUrl: "./traverse_koutoubia/Build/WebGL.loader.js",
    dataUrl: "./traverse_koutoubia/Build/webgl.data",
    frameworkUrl: "./traverse_koutoubia/Build/build.framework.js",
    codeUrl: "./traverse_koutoubia/Build/build.wasm",
  });

  const handleLogin = () => {
    UserService.login();
    console.log("user: ", UserService.getUser());
    setIsLoggedIn(true);
  }

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>Demo de notre visite KOUTOUBIA</h2>
          {!isLoggedIn &&(<p> Vous devez être connectez pour voir la visite </p>)}
                 {!isLoggedIn &&(<button onClick={handleLogin} className="" type="button" >se connecter</button>)}   

        </div>

   
        <div className={`w-1200 h-600 m-auto flex items-center border-10 border-gray-200 rounded-lg shadow-md `}>
          <div
            className="w-full h-full"
            style={{
              filter: isLoggedIn ? 'none' : 'blur(5px)',
            }}
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
  );
};