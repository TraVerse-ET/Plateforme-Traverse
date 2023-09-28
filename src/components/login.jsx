import React, { useState } from "react";
import loginUser from "../api/loginUser";
import { getUsers } from "../data/allUsers";
import useToken from "../hooks/useToken";

const Login = ({onClose}) => {
  const users = getUsers()
  const {token, setToken} = useToken();

  /** gestion du state formulaire */

   const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [adresse, setAdresse] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);
  const handleChoice = () => setIsLogin(!isLogin)

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

  const handleRegistration = (e) => {
      e.preventDefault()
      console.log("registration : ")
  }

  return(
  <>
  <div className="h-full p-6 bg-gray-100 flex items-center justify-center">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">{isLogin ? "Log In " : "Register"}</h2>
      <p className="text-gray-500 mb-6">{isLogin ? "Log In to begin your visit" : "Register here to help us"}</p>

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid  text-sm ">
          <div className="text-gray-600">
            <p className="font-medium text-lg">{isLogin ? "Don't have account ?" : "Already have account ? "}</p>
            <p>{isLogin ? "Register" : "Log in"}</p> <button onClick={handleChoice} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">here</button>
          </div>

          <form onSubmit={handleLogin} className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

              {!isLogin && (
                  <div className="md:col-span-5">
                  <label for="full_name">Full Name</label>
                  <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
              </div>
              )}
                
              
              <div className="md:col-span-5">
                <label for="email">Email Address</label>
                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@domain.com" />
              </div>

              
              <div className="md:col-span-5">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="****" />
              </div>

              {!isLogin && (
                <>
                  <div className="md:col-span-3">
                    <label for="address">Address / Street</label>
                    <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                  </div>

                  <div className="md:col-span-2">
                    <label for="city">City</label>
                    <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                  </div>

                  <div className="md:col-span-2">
                    <label for="country">Country</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                      <button tabindex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                        <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <button tabindex="-1" for="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                        <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label for="zipcode">Zipcode</label>
                    <input type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
                  </div>
                  <div className="md:col-span-2">
                    <label for="soda">Age ?</label>
                    <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <button tabindex="-1" for="show_more" className="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                      <input name="soda" id="soda" placeholder="0" className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent" value="0" />
                      <button tabindex="-1" for="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}
      
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  </>
  )
};

export default Login;
