import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { Testimonials } from "./testimonials";
import { useEffect } from "react";

const UnityProject = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/#contact")
    }
      useEffect(() => {
        // Assurez-vous de gérer la réinitialisation ou le démontage du composant Unity ici
        return () => {
            // Code de nettoyage ou de réinitialisation du composant Unity
        };
    }, []);
    return(
        <div className="flex flex-col m-auto p-auto">
            <div className="mb-12">
                 <Navbar />
                <Testimonials />
            </div>
        
            <button onClick={handleClick} class="bg-transparent m-auto  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Leave us a comment
            </button>
        </div>
    )
}

export default UnityProject;