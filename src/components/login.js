import React, { useState } from "react";
import loginUser from "../api/loginUser";
import { getUsers } from "../data/allUsers";
import axios from "axios"; // Import Axios for making HTTP requests

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { toast } from "react-toastify";
import { useTokenContext } from "../contexts/TokenContext";
import { validateFields } from "./utils/validForm";

function Login({ onClose }) {
  const [users, setUsers] = useState([]);
  const { token, setToken } = useTokenContext();

  axios
    .get("http://localhost:3000/api/users")
    .then((response) => {
      setUsers(response.data);
      console.log(response.data);
      // Utilisez les données des utilisateurs ici
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    });

  /** gestion du state formulaire */
  const initialState = {
    email: "",
    fullName: "",
    password: "",
    selectedCountry: "",
    region: "",
    gender: "",
  };
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");

  const [dataError, setDataError] = useState({
    email: "",
    fullName: "",
    password: "",
    selectedCountry: "",
    region: "",
    gender: "",
  });

  const [isLogin, setIsLogin] = useState(true);
  const handleChoice = () => setIsLogin(!isLogin);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("calling login .......");
    console.log("*******" + users);

    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    console.log("user login : ", user);
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

  const handleRegistration = (event) => {
    event.preventDefault();

    formData.email = email;
    formData.fullName = fullName;
    formData.gender = gender;
    formData.password = password;
    formData.region = region;
    formData.selectedCountry = selectedCountry;

    const fieldErrors = validateFields(formData);

    if (fieldErrors) {
      setDataError(fieldErrors);
    } else {
      const axiosConfig = {
        method: "post", // Méthode HTTP (POST)
        url: "http://localhost:3000/api/Register", // URL de l'action
        data: formData, // Données à envoyer (formData)
        headers: {
          "Content-Type": "application/json", // En-tête de contenu
        },
      };

      axios
        .request(axiosConfig)
        .then((response) => {
          console.log("la reponse est : ", response.data);
          toast.success("Form data submitted successfully!");
        })
        .catch((error) => {
          console.log("la reponse est : ", formData);

          console.error(error);
          alert("An error occurred while submitting the form data.");
        });

      onClose();
      setFormData(initialState);
      setDataError(initialState);
    }
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
                {dataError.fullName !== "" && (
                  <label className="grid-cols-1 mt-1 text-red-500 w-full">
                    {dataError.fullName}
                  </label>
                )}
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
              {dataError.email !== "" && (
                <label className="grid-cols-1 mt-1 text-red-500 w-full">
                  {dataError.email}
                </label>
              )}
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
              {dataError.password !== "" && (
                <label className="grid-cols-1 mt-1 text-red-500 w-full">
                  {dataError.password}
                </label>
              )}
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
                  {dataError.selectedCountry !== "" && (
                    <label className="grid-cols-1 mt-1 text-red-500 w-full">
                      {dataError.selectedCountry}
                    </label>
                  )}
                </div>
                <div className="py-2 text-left">
                  <RegionDropdown
                    country={selectedCountry}
                    value={region}
                    onChange={handleRegionChange}
                    showDefaultOption
                    classes="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                  />
                  {dataError.region !== "" && (
                    <label className="grid-cols-1 mt-1 text-red-500 w-full">
                      {dataError.region}
                    </label>
                  )}
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
                  {dataError.gender !== "" && (
                    <label className="grid-cols-1 mt-1 text-red-500 w-full">
                      {dataError.gender}
                    </label>
                  )}
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
