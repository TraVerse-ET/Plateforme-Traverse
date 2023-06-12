import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";


export const Testimonials = (props) => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "./traverse_koutoubia/Build/WebGL.loader.js",
    dataUrl: "./traverse_koutoubia/Build/webgl.data",
    frameworkUrl: "./traverse_koutoubia/Build/build.framework.js",
    codeUrl: "./traverse_koutoubia/Build/build.wasm",
  });

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>Demo de notre visite KOUTOUBIA</h2>
        </div>
        {/* <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="testimonial">
                    <div className="testimonial-image">
                      {" "}
                      <img src={d.img} alt="" />{" "}
                    </div>
                    <div className="testimonial-content">
                      <p>"{d.text}"</p>
                      <div className="testimonial-meta"> - {d.name} </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div> */}
        <div>
        <Unity unityProvider={unityProvider} 
        style={{
          width : "1200px",
          height : "600px",
          border: "10px solid #f1f1f1",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          background: "black",
          marginLeft: "-50px"
          
        }} 
        />;
        </div>
      </div>
    </div>
  );
};
