import React, { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Services } from "./services";
import { Gallery } from "./gallery";
import { Team } from "./Team";
import JsonData from "../data/data.json";
import { Contact } from "./contact";
import SmoothScroll from "smooth-scroll";
import "../App.css";
import { Visit } from "./visit";
import Footer from "./footer";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {

  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  useEffect(() => {
  const anchor = window.location.href.substring(
    window.location.href.lastIndexOf('#') + 1
  );

  if (anchor === 'feedback') {
    // Scroll to the element with id "feedback"
    const feedbackElement = document.getElementById('feedback');
    if (feedbackElement) {
      setTimeout(() => {
        scroll.animateScroll(feedbackElement, null, { offset: 50 });
      }, 0);
    }
  }
  
}, []);

  return (
    <>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Visit />
      <Team data={landingPageData.Team} />
      <div id="feedback">
      <Contact data={landingPageData.Contact} />

      </div>
      <Footer />
    </>
  );
};

export default Home;
