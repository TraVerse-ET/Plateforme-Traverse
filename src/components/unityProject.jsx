import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Fragment, useState } from "react";

const UnityProject = () => {
  const {
    unityProvider,
    unload,
    loadingProgression,
    isLoaded,
    requestFullscreen,
  } = useUnityContext({
    // loaderUrl: "./traverse_SiSaid/Build/WebGL.Builds.loader.js",
    // dataUrl: "./traverse_SiSaid/Build/webgl.data",
    // frameworkUrl: "./traverse_SiSaid/Build/build.framework.js",
    // codeUrl: "./traverse_SiSaid/Build/build.wasm",

    loaderUrl: "./traverse_koutoubia/Build/WebGL.loader.js",
    dataUrl: "./traverse_koutoubia/Build/webgl.data",
    frameworkUrl: "./traverse_koutoubia/Build/build.framework.js",
    codeUrl: "./traverse_koutoubia/Build/build.wasm",
  });

  const handleRequestFullScreen = () => requestFullscreen(true);
  const navigate = useNavigate();

  async function handleClick() {
    await unload();
    navigate("/#feedback");
  }

  return (
    <div className="flex flex-col m-auto p-auto h-screen">
      <div className="mb-12">
        <Navbar handleClickBack={handleClick} />
        <button
          style={{
            visibility: isLoaded ? "visible" : "hidden",
          }}
          onClick={handleRequestFullScreen}
          className="bg-transparent items-center hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Full Screen
        </button>
        <Fragment>
          {!isLoaded && (
            <p
              style={{
                textAlign: "center",
                marginTop: "120px",
                fontSize: "40px",
              }}
            >
              Loading Application... {Math.round(loadingProgression * 100)}%
            </p>
          )}
          <Unity
            unityProvider={unityProvider}
            style={{
              visibility: isLoaded ? "visible" : "hidden",
              margin: "auto",
              width: "1200px",
              height: "600px",
              border: "solid",
              borderRadius: "5px",
              position: "relative",
            }}
            tabIndex={1}
          />
        </Fragment>
      </div>
      <div className="m-auto">
        <button
          onClick={handleClick}
          className="bg-transparent mb-12 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Leave us a comment
        </button>
      </div>
    </div>
  );
};

export default UnityProject;
