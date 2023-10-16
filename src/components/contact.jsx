import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
// ... Rest of the code remains the same

const initialState = {
  name: '',
  appreciation: 0,
  commentaire: ''
};

export const Contact = (props) => {
  const [formData, setFormData] = useState(initialState);

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

    // Make a POST request to your Express server
    axios.post('http://localhost:3000/api/feedback', formData)
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
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Feedback</h2>
                <p>
                  Veuillez partager votre feedback sur l'endroit visité virtuellement. Votre opinion est précieuse pour nous !
                </p>
              </div>
              <form name="sentMessage" onSubmit={handleSubmit}  method="POST" encType="application/json" action="http://localhost:3000/api/feedback">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Nom"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="score">Degré d'appréciation de l'endroit :</label>
                      <input
                        type="range"
                        list="tickmarks"
                        id="score"
                        name="appreciation"
                        className="form-control"
                        value={formData.appreciation}
                        onChange={handleChange}
                      />
                      <datalist id="tickmarks">
                        <option value="0" label="0%"></option>
                        <option value="10">10%</option>
                        <option value="20"></option>
                        <option value="30">30%</option>
                        <option value="40">40%</option>
                        <option value="50" label="50%"></option>
                        <option value="60">60%</option>
                        <option value="70">70%</option>
                        <option value="80"></option>
                        <option value="90">90%</option>
                        <option value="100" label="100%">100%</option>
                      </datalist>
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