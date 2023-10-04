import React, { useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import Login from "./login";
import Popup from "./modals/Modal";

export const Navigation = () => {
  
  const {token, setToken} = useTokenContext();
  const [openPopup, setOpenPopup] = useState(false);
  const handlePopup = () => setOpenPopup(!openPopup);

  const handleLogin = () => {
    handlePopup();
    console.log("calling for login ");
  }
  const handleLogout = () => {
     sessionStorage.removeItem("token");
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
            <a href="#" className="page-scroll">
            { !token ? (<button type="button" onClick={handleLogin} className="page-scroll bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white border-none hover:border-transparent rounded">SIGN IN</button>
            ): (<button type="button" onClick={handleLogout} className="page-scroll bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border-none hover:border-transparent rounded">SIGN OUT</button>
            )}
            
              </a>
              
            </li>
          
      
            <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              {token && (<>
                 <Link className="page-scroll" to={"/vr-visit"}>
                  Virtual Visit
              </Link>
              </>)}
             
              {!token &&(<>
                <a href="#visits" className="page-scroll">
                  Virtual Visit
              </a>
              </>)}
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