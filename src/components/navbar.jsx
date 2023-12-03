import { Link, useNavigate } from "react-router-dom";

const Navbar = ({handleClickBack}) => {
    const navigate = useNavigate();
    const handleBackHome =async () => {
        await handleClickBack();
        navigate("/");
    }
        const handleRate = async () => {
           await handleClickBack();
        navigate("/#contact");
    }
    return(
        <>
        <nav class="flex items-center mb-6 justify-between h-auto w-full flex-wrap bg-teal-500 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <img src="img/Logo-e.png" className="w-16 h-16" />
                <span class="font-semibold text-2xl tracking-tight">VR CATAGLOGUE</span>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="text-lg lg:flex-grow">
                <button onClick={handleBackHome} class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Back To Home Page
                </button>
                </div>
                <div>
                <button onClick={handleRate} class="inline-block text-lg px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Rate Our Visit</button>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;