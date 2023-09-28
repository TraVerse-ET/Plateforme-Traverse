import React from 'react';
import "../../styles/Popup.css"

const Popup = ({ children, onClose }) => {
  return (

    <div className="fixed inset-0 flex items-center justify-center z-50 mt-12 ">
      <div className="custom-popup bg-white rounded-xl shadow-lg p-3 ">
        <div className='relative'>
             <div className="mb-6 child">{children}</div>
          <div className="absolute top-2 right-14">
          <button
            type="button"
            onClick={onClose}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            X
          </button>
          </div>
        </div>
     
      </div>
    </div>

  );
};

export default Popup;