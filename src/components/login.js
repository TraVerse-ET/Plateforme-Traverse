import React, { useState } from "react";
import loginUser from "../api/loginUser";
import { getUsers } from "../data/allUsers";
import useToken from "../hooks/useToken";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { toast } from "react-toastify";

function Login({ onClose }) {
  const users = getUsers();
  const { token, setToken } = useToken();

  /** gestion du state formulaire */

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [region, setRegion] = useState("");

  const [gender, setGender] = useState("");

  const [isLogin, setIsLogin] = useState(true);
  const handleChoice = () => setIsLogin(!isLogin);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("calling login .......");
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    console.log("user login : ");
    if (user) {
      const myToken = await loginUser({
        email,
        password,
      });
      setToken(myToken);
      console.log("is logged : ", token);
      toast.success("successufully logged");
      onClose();
    } else {
      toast.warning("Identifiants invalides. ");
      console.log("not working : ");
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    console.log("calling registration ....");
    handleChoice();
  };
  const handleCountryChange = (country) => {
    console.log("country: ", country);
    setSelectedCountry(country);
  };

  const handleRegionChange = (region) => {
    console.log("region: ", region);
    setRegion(region);
  };
  return (
    <>
      <div className="flex flex-1 bg-white w-full items-center justify-center">
        <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 w-full text-center">
          <form
            onSubmit={isLogin ? handleLogin : handleRegistration}
            className="text-center"
          >
            <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
              {isLogin ? "Sign In" : "Sign Up"}
            </h1>
            {!isLogin && (
              <div className="py-2 text-left">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    console.log("fullNamle: ", e.target.value);
                    setFullName(e.target.value);
                  }}
                  className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                  placeholder="full-Name"
                />
              </div>
            )}
            <div className="py-2 text-left">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                placeholder="Email"
              />
            </div>

            <div className="py-2 text-left">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                placeholder="Password"
              />
            </div>

            {!isLogin && (
              <>
                <div className="py-2 text-left">
                  <CountryDropdown
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    showDefaultOption
                    classes="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                  />
                </div>
                <div className="py-2 text-left">
                  <RegionDropdown
                    country={selectedCountry}
                    value={region}
                    onChange={handleRegionChange}
                    showDefaultOption
                    classes="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                  />
                </div>
                <div className="py-2 text-left">
                  <select
                    value={gender}
                    onChange={(e) => {
                      console.log("gender : ", e.target.value);
                      setGender(e.target.value);
                    }}
                    className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </>
            )}

            <div className="py-2">
              <button
                type="submit"
                className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700"
              >
                Submit
              </button>
            </div>
          </form>

          {isLogin && (
            <>
              <div className="text-center">
                <a href="#" className="hover:underline">
                  Forgot password?
                </a>
              </div>
            </>
          )}
          <div className="text-center mt-12">
            <span>
              {isLogin
                ? "Don't have an account?"
                : " Already have an account?  "}
            </span>
            <a
              href="#"
              onClick={handleChoice}
              className="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800"
            >
              {isLogin ? "Create One" : "Sign In"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
