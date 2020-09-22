import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import fakePlaces from "../../FakePlaces/fakePlaces";
import Places from "../Places/Places";
import './Home.css'

const Home = () => {
  const allPlaces = fakePlaces;


  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const selectPlace = allPlaces.map((place) => place);
    setPlaces(selectPlace);
    
  }, []);

  return (
    <section className="places-section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 place-description">
                      <h1>Sundarban</h1>
                      <p>The Sundarbans is a mangrove area in the delta formed by the confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay of Bengal.</p>
            <Button>Book Here</Button>
          </div>

          <div className="col-md-8 ">
            <div className="row">
                          {places.map(place => <Places place={place}></Places>
                
                
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
