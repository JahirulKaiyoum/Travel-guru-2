import React from 'react';
import GoogleMap from '../Googlemap/GoogleMap';
import './hotel.css'
const Hotel = (props ) => {
console.log(props);

    let { name, phone, address, image } = props.hotel;
    
    return (
        
        <div className="row">
                        <div className='col-md-6'>
                            <img src={image} alt="" className='img-fluid' />
                        </div>
                        <div className='col-md-6 ' >
                            <h4>Hotel:{name}</h4>
                            <p>Address:{address}</p>
                            <p>Phone:{phone}</p>
                        </div>
                </div>
                   
    );
};

export default Hotel;


// <section className='hotels-section' >
// <div className="container">
// <div className="row ">
//     <div className="col-md-6 hotel-details">
//         <div className='row'>
//             <div className='col-md-6'>
//             <img src={image} alt="" className='img-fluid' />
//             </div>
//             <div className='col-md-6 ' >
//                 <h4>Hotel:{name}</h4>
//                 <p>Address:{address}</p>
//                 <p>Phone:{phone}</p>
//             </div>
//         </div>
//         </div>
//             <div className="col-md-6">
//                 <GoogleMap></GoogleMap>
//         </div>
// </div>
// </div>
    
// </section>