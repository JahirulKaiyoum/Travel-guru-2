import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import fakePlaces from "../../FakePlaces/fakePlaces";
import './SinglePlaceDetails.css'

const SinglePlaceDetails = () => {
  const { placeName } = useParams();

  const [place, setPlace] = useState({});
  
  const history = useHistory();

  useEffect(() => {
    const singlePlace = fakePlaces.find(selectedplace => selectedplace.name == placeName);
    setPlace(singlePlace);
  }, []);

  const handleSubmit = () => {
  history.push('/destination')
}

  return (
    <section className='places-section'>
      <div className="container">
        <div className="row">
          <div className="col-md-6 description-details">
            <h1>{place.name}</h1>
            <p>{place.description}</p>
            
          </div>
          <div className="col-md-6">
            <Form className="form-design" onSubmit={handleSubmit}  >
              <Form.Group >
                <Form.Label>Origin</Form.Label>
                <Form.Control type="text" required='true' />
              </Form.Group>

              <Form.Group >
                <Form.Label>Destination</Form.Label>
                <Form.Control type="password"  required='true' />
              </Form.Group>
              <Row>
                <Col>
                <Form.Group >
                <Form.Label>From</Form.Label>
                <Form.Control type="date" required='true' />
              </Form.Group>
                </Col>
                <Col>
                <Form.Group >
                <Form.Label>To</Form.Label>
                <Form.Control type="date" required='true' />
              </Form.Group>
                </Col>
              </Row>  
             
              <Button variant="primary" type="submit" className="bookingbtn"  >BookNow</Button>
              
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePlaceDetails;
