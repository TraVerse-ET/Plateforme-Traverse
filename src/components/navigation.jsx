import React, { useState } from "react";
import useToken from "../hooks/useToken";
import Login from "./login";
import Popup from "./modals/Modal";

export const Navigation = () => {
  
  const {token, setToken} = useToken();
  const [openPopup, setOpenPopup] = useState(false);
  const handlePopup = () => setOpenPopup(!openPopup);

  const handleLogin = () => {
    handlePopup();
    console.log("calling for login ");
  }
  const handleLogout = () => {
    setToken(null);
    console.log("deconnected !! !")
  }
  return (
    <>
  
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            ExploTech 
            <img className="navbar-brand page-scroll" src="/img/Logo-e.png" alt="ExploTech Logo" style={{ width: '100px', height: '100px' ,marginTop:'-39px'}}></img>
          </a>{" "}
        </div>

        <div
          className=""
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="#login" className="page-scroll">
            { !token ? (<button type="button" onClick={handleLogin} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">CONNEXION</button>
            ): (<button type="button" onClick={handleLogout} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2">DECONNEXION</button>
            )}
            
              </a>
              
            </li>
          
      
            <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Visite virtuelle
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  {openPopup && <Popup onClose={handlePopup}>
    <Login onClose={handlePopup}/>
    </Popup>}
  </>
  );
};