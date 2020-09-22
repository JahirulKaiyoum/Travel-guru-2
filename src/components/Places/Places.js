import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './places.css'

const Places = (props) => {
    const { placeName } = useParams();
    const { name, id,img } = props.place;
    let location = useLocation();
    return (
        
            
        <Link to={`/singlePlaceDetails/${name}`} className="col-md-4 place-box align-items-center"  > 
                <img src={img} alt="" className="img-fluid" />
                <h2>{name}</h2>
                
        </Link>
        
    );
};

export default Places;
