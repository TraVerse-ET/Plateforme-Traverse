import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
          Le Musée Dar Si Said, également connu sous le nom de Musée des Arts Berbères, est un musée situé à Marrakech, au Maroc. Il est installé dans le palais Dar Si Said, un bâtiment historique construit à la fin du XIXe siècle. Le musée abrite une collection d'artefacts et d'objets d'artisanat traditionnels marocains, mettant en valeur l'artisanat et l'histoire des différentes régions du pays.

          Le palais lui-même est une attraction en soi, avec son architecture et ses décorations magnifiques. Les visiteurs peuvent explorer les différentes pièces et cours du palais, qui présentent des éléments architecturaux traditionnels tels que des plafonds en bois sculpté, des mosaïques colorées et des fontaines.

          La collection du musée comprend des tapis, des bijoux, des armes, des costumes traditionnels, des poteries et d'autres objets qui illustrent l'artisanat et les traditions berbères du Maroc. C'est un endroit intéressant pour en apprendre davantage sur la culture et l'histoire de la région.
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
