import React, { useState } from 'react';
import '../styles/StarRating.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useTokenContext } from '../contexts/TokenContext';
// ... Rest of the code remains the same

const initialState = {
  idUser: '',
  appreciation: 0,
  commentaire: ''
};

export const Contact = (props) => {
  const [formData, setFormData] = useState(initialState);
  const [rating, setRating] = useState(1);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const {token, setToken} = useTokenContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
   // const jsonData = JSON.stringify(formData);

    console.log("tokenTo *envoyer : ", token)
    formData.idUser= token;

   // Mettez à jour formData avec la valeur de l'appréciation (rating)
  const updatedFormData = { ...formData, appreciation: rating };

    // Make a POST request to your Express server
    axios.post('http://localhost:3000/api/feedback', updatedFormData)
      .then((response) => {
        console.log("la reponse est : ",response.data); // Response from the server (optional)
        // Optional: Show a success message to the user
        alert('Form data submitted successfully!');
      })
      .catch((error) => {
        console.error(error); // Handle any error that occurred during the request
        // Optional: Show an error message to the user
        alert('An error occurred while submitting the form data.');
      });

    // Note: The actual URL used in axios.post('/api/feedback', formData)
    // should match the URL on your Express server where you are handling form submissions.
    // For example, if your Express server is running on localhost:5000,
    // you should use axios.post('http://localhost:5000/api/feedback', formData).
    // Replace 'http://localhost:5000' with the correct URL where your Express server is running.
    // You can also clear the form after successful submission by using:
     setFormData(initialState);
     setRating(1);
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div>
                <h2>Feedback</h2>
                <p>
                  Veuillez partager votre feedback sur l'endroit visité virtuellement. <br />Votre opinion est précieuse pour nous !
                </p>
              </div>
              <form name="sentMessage" onSubmit={handleSubmit}  method="POST" encType="application/json" action="http://localhost:3000/api/feedback">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <p >Degré d'appréciation de l'endroit :</p>
                      <div className="score" data-rating={rating}>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <span
                            key={value}
                            className={`star ${value <= rating ? 'filled' : ''}`}
                            data-value={value}
                            onClick={() => handleStarClick(value)}
                          ></span>
                        ))}
                      </div>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="commentaire"
                    id="commentaire"
                    className="form-control"
                    rows="4"
                    placeholder="Commentaire"
                    required
                    value={formData.commentaire}
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg" id="buttonSubmit">
                  Envoyer Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={"https://instagram.com/explotech_?igshid=MzRlODBiNWFlZA=="}>
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href={"https://www.linkedin.com/company/explo-tech/"}>
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href={"https://github.com/Explotech"}>
                      <i className="fa fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2023 IRISI FSTG. Design by{" "}
            <a href="https://www.linkedin.com/company/explo-tech/" rel="nofollow">
               Equipe ExploTech
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};