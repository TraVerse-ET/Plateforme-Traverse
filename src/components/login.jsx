import React, { useState } from "react";
import loginUser from "../api/loginUser";
import { getUsers } from "../data/allUsers";
import useToken from "../hooks/useToken";

const Login = ({onClose}) => {
  const users = getUsers()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {token, setToken} = useToken();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      const myToken = await loginUser({
        email,
        password,
      });
      setToken(myToken);
      console.log("is logged : ", token);
      
      onClose()
      // toast.success("Connexion reussi !");
    } else {
      // toast.warning("Identifiants invalides. ");
            console.log("not working : ");
    
    }
  };

  return <div>
     <section className="max-w-2xl p-6 m-auto bg-white w-screen h-fit rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
         Connectez-vous
        </h2>
        <form onSubmit={handleLogin}>
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div className="grid grid-cols-1 mb-6">
              <div className="mr-4">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="email"
                >
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mb-6">
              <div className="mr-4">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  for="password"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Connexion
            </button>
          </div>
        </div>
        </form>
        </section>
  </div>;
};

export default Login;
