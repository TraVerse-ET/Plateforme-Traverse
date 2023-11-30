import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
            
The Dar Si Said Museum, also known as the Museum of Berber Arts, is located in Marrakech, Morocco. It is housed in the Dar Si Said Palace, a historic building constructed in the late 19th century. The museum showcases a collection of Moroccan traditional artifacts and crafts, highlighting the craftsmanship and history of different regions of the country. The palace itself is an attraction with its magnificent architecture and decorations. Visitors can explore various rooms and courtyards of the palace, featuring traditional architectural elements such as carved wooden ceilings, colorful mosaics, and fountains. The museum's collection includes carpets, jewelry, weapons, traditional costumes, pottery, and other items illustrating the Berber craftsmanship and traditions of Morocco. It is an interesting place to learn more about the culture and history of the region.
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={d.title}
                      largeImage={d.largeImage}
                      smallImage={d.smallImage}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
